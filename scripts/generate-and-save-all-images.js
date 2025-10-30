#!/usr/bin/env node

/**
 * Generate and Save All Images for ICF Coach
 * 
 * This script:
 * 1. Generates professional coaching images using DALL-E 3
 * 2. Downloads and saves them to public/images/
 * 3. Creates a manifest file
 * 4. Outputs ready-to-use paths
 */

require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY not found in .env.local');
  process.exit(1);
}

// Create images directory structure
const imagesDir = path.join(__dirname, '..', 'public', 'images');
const subdirs = ['hero', 'features', 'wearables'];

console.log('🎨 ICF Coach - Image Generation & Storage');
console.log('==========================================\n');

// Setup directories
subdirs.forEach(subdir => {
  const dir = path.join(imagesDir, subdir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: public/images/${subdir}/`);
  }
});

console.log('');

// Image specifications
const imagesToGenerate = [
  {
    name: 'coaching-hero',
    category: 'hero',
    size: '1792x1024',
    prompt: 'Professional minimalist coaching scene, modern office environment with natural lighting. A confident business professional in a thoughtful moment, warm natural tones, shallow depth of field. Sophisticated, aspirational, premium feeling. Clean background with subtle gradient from warm beige to soft white. High-end commercial photography, Apple advertisement aesthetic. Ultra-wide landscape format, cinematic composition.'
  },
  {
    name: 'voice-coach',
    category: 'features',
    size: '1024x1024',
    prompt: 'Modern minimalist illustration of AI voice coaching concept. Person using wireless earbuds in professional setting, warm natural lighting, clean beige and white tones, premium aesthetic. iPhone advertisement style, clean composition, professional photography.'
  },
  {
    name: 'video-session',
    category: 'features',
    size: '1024x1024',
    prompt: 'Professional video coaching session, modern minimalist aesthetic. Two people in video call, warm lighting, clean professional environment. Beige and white color palette, high-end commercial photography style, Apple advertisement aesthetic.'
  },
  {
    name: 'calendar',
    category: 'features',
    size: '1024x1024',
    prompt: 'Modern calendar and scheduling interface, minimalist design. Clean beige and white aesthetic, professional business setting. iPhone style product photography, warm natural lighting, premium commercial look.'
  },
  {
    name: 'tracking',
    category: 'features',
    size: '1024x1024',
    prompt: 'Progress tracking and analytics visualization, modern minimalist design. Professional dashboard interface, warm beige tones, clean composition. High-end product photography, Apple advertisement style, sophisticated and premium.'
  },
  {
    name: 'icf-certified',
    category: 'features',
    size: '1024x1024',
    prompt: 'Professional ICF certification and coaching standards concept. Modern minimalist design, professional business environment, warm beige and white palette. Certificate or badge in elegant setting, commercial photography style.'
  },
  {
    name: 'apple-watch',
    category: 'wearables',
    size: '1024x1024',
    prompt: 'Apple Watch on professional wrist in modern office environment. Clean minimalist composition, warm natural lighting, beige and white tones. iPhone advertisement style, premium product photography, sophisticated aesthetic. Show health tracking features.'
  },
  {
    name: 'oura-ring',
    category: 'wearables',
    size: '1024x1024',
    prompt: 'Oura Ring on hand in professional setting, minimalist aesthetic. Clean modern composition, warm beige tones, natural lighting. Premium product photography, Apple advertisement style, sophisticated and elegant. Show wellness tracking concept.'
  },
  {
    name: 'whoop-band',
    category: 'wearables',
    size: '1024x1024',
    prompt: 'WHOOP fitness band on athletic professional wrist, modern minimalist setting. Clean composition, warm natural lighting, beige and white palette. Premium product photography, iPhone advertisement style, sophisticated and aspirational.'
  }
];

// Generate image with DALL-E 3
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
    throw new Error(`DALL-E API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.data[0].url;
}

// Download image
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

// Main execution
async function main() {
  console.log('🎨 Generating images with DALL-E 3...\n');
  
  const manifest = [];
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < imagesToGenerate.length; i++) {
    const image = imagesToGenerate[i];
    const filename = `${image.name}.png`;
    const filepath = path.join(imagesDir, image.category, filename);
    const publicPath = `/images/${image.category}/${filename}`;
    
    console.log(`[${i + 1}/${imagesToGenerate.length}] ${image.name}`);
    console.log(`   Category: ${image.category} | Size: ${image.size}`);
    
    try {
      // Generate with DALL-E
      process.stdout.write('   🎨 Generating... ');
      const imageUrl = await generateImage(image.prompt, image.size);
      console.log('✅');
      
      // Download and save
      process.stdout.write('   💾 Saving... ');
      await downloadImage(imageUrl, filepath);
      console.log('✅');
      
      manifest.push({
        name: image.name,
        category: image.category,
        path: publicPath,
        filename: filename,
        size: image.size,
        prompt: image.prompt
      });
      
      successCount++;
      console.log(`   ✅ Saved to: ${publicPath}\n`);
      
      // Rate limiting - wait 1 second between generations
      if (i < imagesToGenerate.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
      failCount++;
    }
  }
  
  // Save manifest
  const manifestPath = path.join(imagesDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log('='.repeat(70));
  console.log(`✅ Successfully generated and saved: ${successCount} images`);
  console.log(`❌ Failed: ${failCount} images`);
  console.log(`📄 Manifest saved to: public/images/manifest.json`);
  console.log('='.repeat(70));
  
  if (successCount > 0) {
    console.log('\n📝 Image Paths for Your Code:\n');
    manifest.forEach(img => {
      console.log(`   ${img.name}:`);
      console.log(`   src="${img.path}"\n`);
    });
    
    console.log('🎯 Next Steps:');
    console.log('1. Update image references in your components');
    console.log('2. Commit to git: git add public/images/');
    console.log('3. Push and deploy to Vercel');
    console.log('4. Images will be permanently stored in your repo!\n');
  }
}

// Run with error handling
main().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});

