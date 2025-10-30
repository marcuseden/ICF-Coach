const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const IMAGES_TO_GENERATE = [
  // Feature Images - Swedish/Nordic style, photorealistic, both genders
  {
    name: 'voice-coach',
    path: 'public/images/features/voice-coach.jpg',
    prompt: 'Professional photorealistic image of a young Swedish woman in her 30s with blonde hair, sitting in a modern minimalist Scandinavian home office with light wood furniture and white walls, holding a smartphone and speaking naturally into it during a coaching session, natural daylight from large window, warm and inviting atmosphere, professional business casual attire, genuine smile, high quality photography, Canon EOS R5 style'
  },
  {
    name: 'video-session',
    path: 'public/images/features/video-session.jpg',
    prompt: 'Professional photorealistic image of a Swedish man in his 40s with short brown hair, sitting at a clean minimalist desk in a bright Scandinavian interior, having a video call on a MacBook, genuine engaging expression, modern Nordic design aesthetic, natural daylight, light gray walls, green plants in background, professional business casual shirt, warm and approachable atmosphere, high quality photography, Canon EOS R5 style'
  },
  {
    name: 'calendar',
    path: 'public/images/features/calendar.jpg',
    prompt: 'Professional photorealistic image of a Swedish woman in her 35 with natural blonde hair in a ponytail, sitting at a minimalist white desk, looking at a digital calendar on an iPad, planning her schedule, modern Scandinavian office with light wood accents, plants, natural morning light, focused but relaxed expression, white sweater, clean organized workspace, high quality photography, Canon EOS R5 style'
  },
  {
    name: 'progress-tracking',
    path: 'public/images/features/progress-tracking.jpg',
    prompt: 'Professional photorealistic image of a young Swedish man in his 30s with styled blonde hair, sitting at a modern standing desk, looking at growth charts and analytics on a large monitor, contemporary Scandinavian office interior, light gray walls, wooden accents, satisfied smile, rolled-up sleeves, natural daylight, professional yet casual atmosphere, high quality photography, Canon EOS R5 style'
  },
  {
    name: 'growth-insights',
    path: 'public/images/features/growth-insights.jpg',
    prompt: 'Professional photorealistic image of a Swedish woman in her 30s with long brown hair, standing at a minimalist workspace reviewing data visualizations on a tablet, modern Nordic office with white walls and light wood floors, natural daylight, confident posture, elegant casual business attire, plants in background, clean and organized space, high quality photography, Canon EOS R5 style'
  },
  {
    name: 'icf-certified',
    path: 'public/images/features/icf-certified.jpg',
    prompt: 'Professional photorealistic image of a Swedish man in his 45 with gray-blonde hair, sitting in a modern minimalist coaching session environment, professional and trustworthy appearance, contemporary Scandinavian interior with light wood and white tones, natural window light, business casual attire, warm and professional atmosphere, bookshelves with professional books, high quality photography, Canon EOS R5 style'
  },

  // Coach Portraits - Professional headshots, Swedish/Nordic appearance
  {
    name: 'coach-female-1',
    path: 'public/images/coaches/coach-female-1.jpg',
    prompt: 'Professional headshot portrait of a Swedish woman in her 40s, warm friendly smile, blonde hair styled professionally, looking directly at camera, light gray background, professional business attire, confident and approachable expression, natural makeup, high quality professional photography, studio lighting, Canon EOS R5 style, corporate headshot quality'
  },
  {
    name: 'coach-male-1',
    path: 'public/images/coaches/coach-male-1.jpg',
    prompt: 'Professional headshot portrait of a Swedish man in his 35, genuine smile, short light brown hair, looking directly at camera, light gray background, professional business casual shirt, approachable and confident expression, clean-shaven, high quality professional photography, studio lighting, Canon EOS R5 style, corporate headshot quality'
  },
  {
    name: 'coach-female-2',
    path: 'public/images/coaches/coach-female-2.jpg',
    prompt: 'Professional headshot portrait of a Swedish woman in her 45, confident warm smile, shoulder-length brown hair, looking directly at camera, light gray background, elegant professional blazer, experienced and trustworthy appearance, natural makeup, high quality professional photography, studio lighting, Canon EOS R5 style, corporate headshot quality'
  },
  {
    name: 'coach-male-2',
    path: 'public/images/coaches/coach-male-2.jpg',
    prompt: 'Professional headshot portrait of a Swedish man in his 50, distinguished appearance, gray-blonde hair, warm friendly smile, looking directly at camera, light gray background, professional business suit, experienced and approachable expression, high quality professional photography, studio lighting, Canon EOS R5 style, corporate headshot quality'
  },

  // Reading Material Images - Study/learning contexts
  {
    name: 'reading-1',
    path: 'public/images/reading/reading-1.jpg',
    prompt: 'Professional photorealistic image of a Swedish man in his 30s working on laptop in a bright modern Scandinavian co-working space, natural light from large windows, minimalist Nordic interior design, focused expression, business casual attire, clean workspace with coffee cup, high quality photography, Canon EOS R5 style'
  },
  {
    name: 'reading-2',
    path: 'public/images/reading/reading-2.jpg',
    prompt: 'Professional photorealistic image of a Swedish woman in her 35 reading a book at a modern minimalist desk, Nordic home office with white walls and light wood furniture, natural daylight, plants, comfortable and focused atmosphere, casual professional clothing, high quality photography, Canon EOS R5 style'
  },
  {
    name: 'reading-3',
    path: 'public/images/reading/reading-3.jpg',
    prompt: 'Professional photorealistic image of a Swedish man in his 40s taking notes during a virtual learning session on iPad, contemporary Scandinavian interior, natural lighting, comfortable home office setting, professional casual attire, engaged expression, high quality photography, Canon EOS R5 style'
  },
  {
    name: 'reading-4',
    path: 'public/images/reading/reading-4.jpg',
    prompt: 'Professional photorealistic image of a Swedish woman in her 30s with headphones participating in online learning, modern minimalist workspace, bright Nordic interior, natural window light, focused and engaged expression, professional casual attire, clean organized desk, high quality photography, Canon EOS R5 style'
  },

  // Wearable Device Images - Product photography style
  {
    name: 'apple-watch',
    path: 'public/images/wearables/apple-watch.jpg',
    prompt: 'Professional product photography of an Apple Watch on a Swedish person wrist showing heart rate data and activity rings, clean minimalist Scandinavian aesthetic, natural light, modern interior background softly blurred, professional product shot quality, high-end watch photography, Canon EOS R5 macro style'
  },
  {
    name: 'oura-ring',
    path: 'public/images/wearables/oura-ring.jpg',
    prompt: 'Professional product photography of an Oura Ring on a Swedish person finger, showing the sleek design, clean minimalist background, natural Scandinavian light, modern aesthetic, professional jewelry photography quality, high-end product shot, Canon EOS R5 macro style'
  },
  {
    name: 'whoop-band',
    path: 'public/images/wearables/whoop-band.jpg',
    prompt: 'Professional product photography of a WHOOP fitness band on a Swedish person wrist during a workout, modern gym or home fitness environment, clean minimalist Scandinavian aesthetic, natural light, professional product shot quality, athletic lifestyle photography, Canon EOS R5 style'
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
  console.log(`📝 Prompt: ${imageConfig.prompt.substring(0, 100)}...`);
  
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
    console.log(`✅ Image generated: ${imageUrl}`);
    
    // Download and save the image
    const filepath = path.join(__dirname, '..', imageConfig.path);
    await downloadImage(imageUrl, filepath);
    console.log(`💾 Saved to: ${imageConfig.path}`);
    
    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return { success: true, name: imageConfig.name, path: imageConfig.path };
  } catch (error) {
    console.error(`❌ Error generating ${imageConfig.name}:`, error.message);
    return { success: false, name: imageConfig.name, error: error.message };
  }
}

async function generateAllImages() {
  console.log('🚀 Starting image generation process...');
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
  console.log('🎉 Image generation process complete!');
  console.log('='.repeat(60) + '\n');
}

// Run the generation
generateAllImages().catch(console.error);

