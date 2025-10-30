const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const MISSING_IMAGES = [
  {
    name: 'reading-2',
    path: 'public/images/reading/reading-2.jpg',
    prompt: 'Professional photorealistic image of a Swedish woman in her 35 reading a book at a modern minimalist desk, Nordic home office with white walls and light wood furniture, natural daylight, plants, comfortable and focused atmosphere, casual professional clothing, high quality photography, Canon EOS R5 style'
  },
  {
    name: 'apple-watch',
    path: 'public/images/wearables/apple-watch.jpg',
    prompt: 'Professional product photography of an Apple Watch on a Swedish person wrist showing heart rate data and activity rings, clean minimalist Scandinavian aesthetic, natural light, modern interior background softly blurred, professional product shot quality, high-end watch photography, Canon EOS R5 macro style'
  }
];

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

async function generateImage(imageConfig) {
  console.log(`\n🎨 Generating: ${imageConfig.name}...`);
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imageConfig.prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "natural"
    });

    const imageUrl = response.data[0].url;
    console.log(`✅ Image generated successfully`);
    
    const filepath = path.join(__dirname, '..', imageConfig.path);
    await downloadImage(imageUrl, filepath);
    console.log(`💾 Saved to: ${imageConfig.path}`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return { success: true, name: imageConfig.name };
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return { success: false, name: imageConfig.name, error: error.message };
  }
}

async function main() {
  console.log('🔄 Retrying failed images...\n');
  
  for (const imageConfig of MISSING_IMAGES) {
    await generateImage(imageConfig);
  }
  
  console.log('\n✅ Done!');
}

main().catch(console.error);

