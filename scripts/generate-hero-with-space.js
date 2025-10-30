const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const HERO_IMAGE = {
  name: 'hero-coaching-with-space',
  path: 'public/images/hero/coaching-hero.jpg',
  prompt: 'Professional corporate photography, wide composition with Swedish female business coach positioned on the RIGHT SIDE of frame, confident woman in her 40s with long blonde hair, warm genuine smile, wearing elegant gray business blazer, standing in modern office with orange/amber gradient wall visible on left side creating empty space for text, office building visible through windows on right, natural window lighting from right side, professional corporate portrait, shot with Canon EOS 5D, f/2.8, wide landscape composition with subject on right third of frame leaving left two-thirds open for text overlay, corporate headshot quality'
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
  console.log('🎨 Generating hero image with space for text...');
  console.log('📐 Subject positioned on RIGHT side, left side open for text\n');
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: HERO_IMAGE.prompt,
      n: 1,
      size: "1792x1024", // Wide format
      quality: "hd",
      style: "natural"
    });

    const imageUrl = response.data[0].url;
    console.log('✅ Hero image generated successfully!');
    console.log(`🔗 URL: ${imageUrl}\n`);
    
    const filepath = path.join(__dirname, '..', HERO_IMAGE.path);
    await downloadImage(imageUrl, filepath);
    console.log(`💾 Saved to: ${HERO_IMAGE.path}`);
    console.log('\n🎉 Hero image with text space ready!');
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

generateHeroImage();

