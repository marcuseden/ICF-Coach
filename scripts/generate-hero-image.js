const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const HERO_IMAGE = {
  name: 'hero-coach',
  path: 'public/images/hero/coaching-hero.jpg',
  prompt: 'Apple advertisement style professional portrait photograph of a confident Swedish female coach in her early 40s with natural blonde hair, warm genuine smile, wearing elegant minimalist beige blazer, shot in ultra-clean bright white studio with soft professional lighting, crisp sharp focus on face, clean white background with subtle gradient, extremely high-end commercial photography quality, shot on Hasselblad H6D-400c, f/2.8, professional corporate advertising style, cinematic lighting, pristine white backdrop, Apple keynote aesthetic, premium luxury brand photography'
};

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function generateHeroImage() {
  console.log('🎨 Generating Apple-style hero image...');
  console.log('📸 Female coach portrait for homepage\n');
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: HERO_IMAGE.prompt,
      n: 1,
      size: "1792x1024", // Wide format for hero
      quality: "hd",
      style: "natural"
    });

    const imageUrl = response.data[0].url;
    console.log('✅ Hero image generated successfully!');
    console.log(`🔗 URL: ${imageUrl}\n`);
    
    const filepath = path.join(__dirname, '..', HERO_IMAGE.path);
    await downloadImage(imageUrl, filepath);
    console.log(`💾 Saved to: ${HERO_IMAGE.path}`);
    console.log('\n🎉 Hero image ready!');
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

generateHeroImage();

