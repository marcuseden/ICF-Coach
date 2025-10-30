// Generate all landing page images using DALL-E
// Run with: node scripts/generate-landing-images.js

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const prompts = {
  hero: `Professional minimalist coaching scene, iPhone advertisement style, clean modern aesthetic. A confident business professional in natural light, warm tones, shallow depth of field. Sophisticated, aspirational, premium feeling. Clean background with subtle gradient from warm beige to soft white. Professional photography, high-end commercial look, Apple advertisement aesthetic. Ultra-wide landscape format.`,
  
  voiceCoach: `iPhone style product photography showing AI voice coaching concept. Modern minimalist design, person using AirPods in professional setting, warm natural lighting, clean beige and white tones, premium aesthetic, sophisticated commercial photography.`,
  
  videoSession: `Professional video call coaching session, iPhone advertisement style. Modern minimalist office space with natural light, warm tones, premium quality, sophisticated business aesthetic, Apple-like commercial photography. Clean and professional.`,
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
        size: type === 'hero' ? '1792x1024' : '1024x1024',
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
    const revisedPrompt = data.data[0].revised_prompt;

    console.log(`✅ ${type} generated successfully!`);
    console.log(`📸 URL: ${imageUrl}`);
    console.log(`📝 Revised prompt: ${revisedPrompt.substring(0, 100)}...`);

    return {
      type,
      url: imageUrl,
      prompt,
      revised_prompt: revisedPrompt
    };
  } catch (error) {
    console.error(`❌ Failed to generate ${type}:`, error.message);
    return { type, error: error.message };
  }
}

async function main() {
  console.log('🚀 Starting DALL-E image generation for landing page...\n');
  
  const results = [];
  
  for (const [type, prompt] of Object.entries(prompts)) {
    const result = await generateImage(prompt, type);
    results.push(result);
    
    // Wait 3 seconds between requests to avoid rate limits
    if (Object.keys(prompts).indexOf(type) < Object.keys(prompts).length - 1) {
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

  console.log('\n💡 Copy these URLs and update your landing page!');
  console.log('Replace the Unsplash placeholder with the hero image URL.\n');
}

main().catch(console.error);

