const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

const heroVariations = [
  {
    name: 'coaching-hero-professional.jpg',
    prompt: 'A professional Swedish female coach in her 30s with natural, professional hairstyle, wearing elegant business casual attire, positioned on the LEFT side of the image against a clean, modern office background with natural light. Leave substantial empty space on the RIGHT side for text overlay. High-quality, photorealistic, professional corporate photography style with natural soft lighting. Composition: subject on left third, empty space on right two-thirds.',
    description: 'Professional coach - left aligned'
  },
  {
    name: 'coaching-hero-confident.jpg',
    prompt: 'A confident Swedish female executive coach in her early 30s with sleek, professional bob haircut, wearing a sophisticated navy blazer, positioned on the LEFT side against a minimalist Scandinavian office setting with wooden accents and plants. Leave ample empty space on the RIGHT for text. Professional photography, natural window lighting, shallow depth of field. Swedish modern aesthetic.',
    description: 'Confident coach - Scandinavian style'
  },
  {
    name: 'coaching-hero-warm.jpg',
    prompt: 'A warm, approachable Swedish female coach in her 30s with natural shoulder-length hair, wearing a comfortable yet professional sweater and blazer combination, positioned on the LEFT side of the frame in a bright, modern coworking space with soft natural lighting. Significant empty space on the RIGHT side for text overlay. Authentic, warm corporate photography style with natural colors.',
    description: 'Warm and approachable coach'
  },
  {
    name: 'coaching-hero-dynamic.jpg',
    prompt: 'A dynamic Swedish female coach in her early 30s with professional long hair in a subtle ponytail, wearing modern business attire, captured in a bright contemporary office with floor-to-ceiling windows. Subject positioned on LEFT with plenty of negative space on RIGHT for text. High-end corporate photography, natural daylight, professional yet energetic mood.',
    description: 'Dynamic and energetic coach'
  }
];

async function generateHeroVariations() {
  console.log('🎨 Starting hero image variations generation...\n');
  
  const heroDir = path.join(process.cwd(), 'public', 'images', 'hero');
  
  if (!fs.existsSync(heroDir)) {
    fs.mkdirSync(heroDir, { recursive: true });
  }

  for (const variation of heroVariations) {
    try {
      console.log(`📸 Generating ${variation.name}...`);
      console.log(`   Description: ${variation.description}`);
      
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: variation.prompt,
        n: 1,
        size: "1792x1024",
        quality: "hd",
        style: "natural"
      });

      const imageUrl = response.data[0].url;
      const filepath = path.join(heroDir, variation.name);
      
      await downloadImage(imageUrl, filepath);
      console.log(`✅ Saved: ${variation.name}\n`);
      
      // Add delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Error generating ${variation.name}:`, error.message);
    }
  }
  
  console.log('✨ All hero variations generated!');
}

generateHeroVariations();

