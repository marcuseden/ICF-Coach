// Generate feature section images for landing page
// Apple-style product photography

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const featurePrompts = {
  aiVoice: `Clean minimalist product shot of person using wireless earbuds for AI coaching, iPhone advertisement style. Professional setting with natural light, warm beige and stone tones, shallow depth of field. Person appears calm and focused, modern aesthetic, premium quality, Apple commercial photography style. Clean white or beige background, sophisticated and aspirational.`,
  
  humanCoaching: `Professional one-on-one coaching video call scene, iPhone style. Two people in split-screen video conference, warm natural lighting, modern minimalist office backgrounds, genuine connection and engagement. Clean aesthetic with beige and stone tones, premium quality, sophisticated business photography, Apple advertisement style.`,
  
  progress: `Minimalist visualization of personal growth and achievement, iPhone interface style. Clean modern design showing progress tracking, charts, and goals in warm stone and beige color palette. Simple, elegant, aspirational mood, premium quality, Apple product photography aesthetic. Light background with subtle depth.`
};

async function generateImage(prompt, type) {
  console.log(`\n🎨 Generating ${type} image...`);
  
  try {
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
        size: '1024x1024',
        quality: 'hd',
        style: 'natural'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    console.log(`✅ ${type} generated successfully!`);
    console.log(`📸 URL: ${imageUrl}\n`);

    return {
      type,
      url: imageUrl
    };
  } catch (error) {
    console.error(`❌ Failed to generate ${type}:`, error.message);
    return { type, error: error.message };
  }
}

async function main() {
  console.log('🚀 Generating feature section images...\n');
  console.log('Style: iPhone advertisement aesthetic');
  console.log('Quality: HD (1024x1024)\n');
  
  const results = [];
  
  for (const [type, prompt] of Object.entries(featurePrompts)) {
    const result = await generateImage(prompt, type);
    results.push(result);
    
    // Wait 3 seconds between requests
    if (Object.keys(featurePrompts).indexOf(type) < Object.keys(featurePrompts).length - 1) {
      console.log('⏳ Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log('\n\n📊 GENERATION COMPLETE');
  console.log('========================\n');
  
  results.forEach(result => {
    if (result.error) {
      console.log(`❌ ${result.type}: FAILED - ${result.error}`);
    } else {
      console.log(`✅ ${result.type}:`);
      console.log(`   ${result.url}\n`);
    }
  });

  console.log('\n💡 Update your landing page with these URLs!');
  console.log('Add them to the feature sections for Apple-style look.\n');
}

main().catch(console.error);

