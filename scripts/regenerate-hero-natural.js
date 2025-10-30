const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const HERO_IMAGE = {
  name: 'hero-coaching-natural',
  path: 'public/images/hero/coaching-hero.jpg',
  prompt: 'Professional corporate photography, wide landscape composition with Swedish female business coach positioned on the LEFT SIDE of frame, confident woman in her 40s with natural straight blonde hair in professional style, warm genuine smile, wearing elegant gray business blazer, sitting at modern clean desk with computer monitor, bright contemporary office with large windows showing natural daylight, clean minimalist Scandinavian office interior, right side of frame has empty space for text overlay, natural window lighting, professional corporate portrait, shot with Canon EOS 5D, f/2.8, corporate photography quality, realistic professional hairstyle'
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
  console.log('🎨 Regenerating hero image with natural professional hairstyle...');
  console.log('📐 Subject on LEFT, right side open for text\n');
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: HERO_IMAGE.prompt,
      n: 1,
      size: "1792x1024",
      quality: "hd",
      style: "natural"
    });

    const imageUrl = response.data[0].url;
    console.log('✅ Hero image generated successfully!');
    console.log(`🔗 URL: ${imageUrl}\n`);
    
    const filepath = path.join(__dirname, '..', HERO_IMAGE.path);
    await downloadImage(imageUrl, filepath);
    console.log(`💾 Saved to: ${HERO_IMAGE.path}`);
    console.log('\n🎉 Professional hero image ready!');
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

generateHeroImage();

