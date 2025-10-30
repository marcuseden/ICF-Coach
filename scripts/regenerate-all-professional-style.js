const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Professional corporate style like the reference image
const IMAGES_TO_GENERATE = [
  // Hero Image - Professional corporate style
  {
    name: 'hero-coaching',
    path: 'public/images/hero/coaching-hero.jpg',
    prompt: 'Professional corporate photography of a confident Swedish female business coach in her 40s, long blonde hair, warm genuine smile, wearing elegant gray business suit blazer, standing in modern office building with orange/amber gradient wall on left side and bright white office building visible through window in background, natural window lighting, professional corporate portrait style, shot with Canon EOS 5D, f/2.8, corporate headshot quality, clean professional composition'
  },

  // Feature Images - Professional office settings
  {
    name: 'voice-coach',
    path: 'public/images/features/voice-coach.jpg',
    prompt: 'Professional corporate photography of a Swedish woman in her 30s with blonde hair, sitting at modern minimalist office desk, natural smile, speaking on smartphone during coaching call, bright office with large windows, natural daylight, business casual attire, clean professional environment, Canon EOS 5D style, f/2.8, corporate photography'
  },
  {
    name: 'video-session',
    path: 'public/images/features/video-session.jpg',
    prompt: 'Professional corporate photography of a Swedish man in his 40s with short brown hair, sitting at modern office desk during video conference on MacBook, engaging smile, bright modern office interior with windows, natural daylight, business casual shirt, professional corporate environment, Canon EOS 5D style, f/2.8'
  },
  {
    name: 'calendar',
    path: 'public/images/features/calendar.jpg',
    prompt: 'Professional corporate photography of a Swedish woman in her 35 with blonde hair in ponytail, sitting at clean modern desk, looking at iPad calendar, bright office with natural window light, business casual white blouse, organized professional workspace, natural daylight, Canon EOS 5D style, f/2.8, corporate photography'
  },
  {
    name: 'progress-tracking',
    path: 'public/images/features/progress-tracking.jpg',
    prompt: 'Professional corporate photography of a Swedish man in his 30s with styled blonde hair, sitting at modern desk reviewing data analytics on large monitor, bright contemporary office, natural window light, business casual attire with rolled sleeves, professional environment, satisfied expression, Canon EOS 5D style, f/2.8'
  },
  {
    name: 'growth-insights',
    path: 'public/images/features/growth-insights.jpg',
    prompt: 'Professional corporate photography of a Swedish woman in her 30s with long brown hair, standing in modern office reviewing data on tablet, confident posture, bright office with windows, natural daylight, elegant business casual attire, professional corporate setting, Canon EOS 5D style, f/2.8'
  },
  {
    name: 'icf-certified',
    path: 'public/images/features/icf-certified.jpg',
    prompt: 'Professional corporate photography of a Swedish man in his 45 with gray-blonde hair, sitting in modern professional office during coaching session, warm professional appearance, bright office with bookshelves, natural window light, business casual attire, trustworthy demeanor, Canon EOS 5D style, f/2.8'
  },

  // Coach Portraits - Professional headshots like reference image
  {
    name: 'coach-female-1',
    path: 'public/images/coaches/coach-female-1.jpg',
    prompt: 'Professional corporate headshot portrait of a Swedish woman in her 40s, warm friendly smile, long blonde hair, looking directly at camera, modern office background with warm orange gradient on one side and office building visible on other side, professional gray business blazer, confident and approachable expression, natural office lighting, Canon EOS 5D, f/2.8, corporate headshot quality'
  },
  {
    name: 'coach-male-1',
    path: 'public/images/coaches/coach-male-1.jpg',
    prompt: 'Professional corporate headshot portrait of a Swedish man in his 35, genuine smile, short light brown hair, looking directly at camera, modern office background with natural lighting, professional business casual blue shirt, approachable and confident expression, Canon EOS 5D, f/2.8, corporate headshot quality'
  },
  {
    name: 'coach-female-2',
    path: 'public/images/coaches/coach-female-2.jpg',
    prompt: 'Professional corporate headshot portrait of a Swedish woman in her 45, confident warm smile, shoulder-length brown hair, looking directly at camera, modern office background with natural lighting, elegant professional navy blazer, experienced and trustworthy appearance, Canon EOS 5D, f/2.8, corporate headshot quality'
  },
  {
    name: 'coach-male-2',
    path: 'public/images/coaches/coach-male-2.jpg',
    prompt: 'Professional corporate headshot portrait of a Swedish man in his 50, distinguished appearance, gray-blonde hair, warm friendly smile, looking directly at camera, modern office background with natural lighting, professional dark business suit, experienced and approachable expression, Canon EOS 5D, f/2.8, corporate headshot quality'
  },

  // Reading Material Images - Professional learning settings
  {
    name: 'reading-1',
    path: 'public/images/reading/reading-1.jpg',
    prompt: 'Professional corporate photography of a Swedish man in his 30s working on laptop in bright modern office co-working space, large windows with natural light, minimalist contemporary interior, focused expression, business casual attire, clean workspace with coffee, Canon EOS 5D style, f/2.8'
  },
  {
    name: 'reading-2',
    path: 'public/images/reading/reading-2.jpg',
    prompt: 'Professional corporate photography of a Swedish woman in her 35 reading a book at modern office desk, bright office with large windows, natural daylight, comfortable focused atmosphere, professional casual clothing, Canon EOS 5D style, f/2.8'
  },
  {
    name: 'reading-3',
    path: 'public/images/reading/reading-3.jpg',
    prompt: 'Professional corporate photography of a Swedish man in his 40s taking notes during virtual learning session on iPad, contemporary bright office interior, natural window lighting, professional casual attire, engaged expression, Canon EOS 5D style, f/2.8'
  },
  {
    name: 'reading-4',
    path: 'public/images/reading/reading-4.jpg',
    prompt: 'Professional corporate photography of a Swedish woman in her 30s with wireless headphones participating in online learning, modern bright office workspace, natural window light, focused and engaged expression, professional casual attire, clean desk, Canon EOS 5D style, f/2.8'
  },

  // Wearable Device Images - Professional product photography
  {
    name: 'apple-watch',
    path: 'public/images/wearables/apple-watch.jpg',
    prompt: 'Professional product photography of an Apple Watch on a Swedish business professional wrist showing heart rate data and activity rings, modern office environment with natural light, clean professional aesthetic, high-end product shot, Canon EOS 5D macro style, f/2.8'
  },
  {
    name: 'oura-ring',
    path: 'public/images/wearables/oura-ring.jpg',
    prompt: 'Professional product photography of an Oura Ring on a Swedish professional person finger, showing the sleek black design, modern office setting with natural lighting, professional aesthetic, high-end jewelry photography, Canon EOS 5D macro style, f/2.8'
  },
  {
    name: 'whoop-band',
    path: 'public/images/wearables/whoop-band.jpg',
    prompt: 'Professional product photography of a WHOOP fitness band on a Swedish professional person wrist during workout or office fitness break, modern clean environment, natural lighting, professional lifestyle photography, Canon EOS 5D style, f/2.8'
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
    const size = imageConfig.name === 'hero-coaching' ? '1792x1024' : '1024x1024';
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imageConfig.prompt,
      n: 1,
      size: size,
      quality: "hd",
      style: "natural"
    });

    const imageUrl = response.data[0].url;
    console.log(`✅ Generated successfully`);
    
    const filepath = path.join(__dirname, '..', imageConfig.path);
    await downloadImage(imageUrl, filepath);
    console.log(`💾 Saved to: ${imageConfig.path}`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return { success: true, name: imageConfig.name, path: imageConfig.path };
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return { success: false, name: imageConfig.name, error: error.message };
  }
}

async function generateAllImages() {
  console.log('🚀 Starting professional style image generation...');
  console.log(`📊 Total images to generate: ${IMAGES_TO_GENERATE.length}\n`);
  
  const results = [];
  
  for (const imageConfig of IMAGES_TO_GENERATE) {
    const result = await generateImage(imageConfig);
    results.push(result);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📈 GENERATION SUMMARY');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n✅ Successfully generated: ${successful.length}/${results.length}`);
  successful.forEach(r => console.log(`   ✓ ${r.name}`));
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed: ${failed.length}`);
    failed.forEach(r => console.log(`   ✗ ${r.name}: ${r.error}`));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Professional style images complete!');
  console.log('='.repeat(60) + '\n');
}

generateAllImages().catch(console.error);

