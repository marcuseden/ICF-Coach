#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Retry failed images with safer prompts
const imagesToGenerate = [
  {
    name: 'coaching-hero',
    category: 'hero',
    size: '1792x1024',
    prompt: 'Minimalist modern office with natural daylight through large windows. Warm beige and white color palette, clean professional environment. Sophisticated business setting with plants and modern furniture. Cinematic wide angle, professional photography, aspirational and premium aesthetic.'
  },
  {
    name: 'calendar',
    category: 'features',
    size: '1024x1024',
    prompt: 'Modern digital calendar app interface on tablet or phone. Clean minimalist design with beige and white colors. Professional scheduling tool in elegant setting with natural light. Product photography style, premium aesthetic.'
  },
  {
    name: 'tracking',
    category: 'features',
    size: '1024x1024',
    prompt: 'Progress dashboard and analytics charts on modern device screen. Minimalist interface design, beige and white color scheme. Professional data visualization in clean setting. Premium product photography, Apple aesthetic.'
  },
  {
    name: 'whoop-band',
    category: 'wearables',
    size: '1024x1024',
    prompt: 'Fitness tracking wristband on professional wrist. Modern minimalist design, beige and white tones, natural lighting. Wellness technology in elegant setting. Premium product photography, sophisticated aesthetic.'
  }
];

async function generateImage(prompt, size) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: size,
      quality: 'hd',
      style: 'natural'
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.data[0].url;
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

async function main() {
  console.log('🔄 Retrying failed images...\n');
  
  for (let i = 0; i < imagesToGenerate.length; i++) {
    const image = imagesToGenerate[i];
    const filename = `${image.name}.png`;
    const filepath = path.join(imagesDir, image.category, filename);
    
    console.log(`[${i + 1}/${imagesToGenerate.length}] ${image.name}`);
    
    try {
      process.stdout.write('   🎨 Generating... ');
      const imageUrl = await generateImage(image.prompt, image.size);
      console.log('✅');
      
      process.stdout.write('   💾 Saving... ');
      await downloadImage(imageUrl, filepath);
      console.log('✅\n');
      
      if (i < imagesToGenerate.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.log(`❌ ${error.message}\n`);
    }
  }
  
  console.log('✅ Done! Check public/images/ folder\n');
}

main().catch(console.error);

