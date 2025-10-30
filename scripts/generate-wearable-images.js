// Generate product photography of wearable devices
// iPhone advertisement style

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const wearablePrompts = {
  appleWatch: `Professional product photography of Apple Watch on wrist showing fitness data, iPhone advertisement style. Clean minimalist aesthetic, warm natural lighting, shallow depth of field. Watch face displays heart rate and activity rings. Premium quality, sophisticated commercial photography, Apple product shoot aesthetic. Beige and stone color palette, professional hand model.`,
  
  ouraRing: `Premium product photography of Oura Ring on finger, iPhone commercial style. Sleek black or silver ring with subtle LED glow, minimal aesthetic, warm natural lighting. Clean background in beige tones, shallow depth of field. Sophisticated jewelry photography, Apple advertisement quality, aspirational and premium.`,
  
  whoop: `Professional product shot of WHOOP fitness band on athletic wrist, iPhone style. Modern sports technology aesthetic, clean design, natural lighting. Band shows strain metrics, warm tones, shallow depth of field. Premium quality commercial photography, Apple advertisement aesthetic, sophisticated and athletic.`
};

async function generateImage(prompt, type) {
  console.log(`\n🎨 Generating ${type}...`);
  
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

    console.log(`✅ ${type} generated!`);
    console.log(`📸 ${imageUrl}\n`);

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
  console.log('🚀 Generating wearable device product photography...\n');
  console.log('Devices: Apple Watch, Oura Ring, WHOOP');
  console.log('Style: iPhone advertisement aesthetic\n');
  
  const results = [];
  
  for (const [type, prompt] of Object.entries(wearablePrompts)) {
    const result = await generateImage(prompt, type);
    results.push(result);
    
    // Wait 3 seconds between requests
    if (Object.keys(wearablePrompts).indexOf(type) < Object.keys(wearablePrompts).length - 1) {
      console.log('⏳ Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log('\n\n📊 GENERATION COMPLETE');
  console.log('========================\n');
  
  const successful = results.filter(r => !r.error);
  const failed = results.filter(r => r.error);

  console.log(`✅ Successfully generated: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}\n`);
  
  successful.forEach(result => {
    console.log(`✅ ${result.type}:`);
    console.log(`   ${result.url}\n`);
  });

  if (failed.length > 0) {
    console.log('\n❌ Failed images:');
    failed.forEach(result => {
      console.log(`   ${result.type}: ${result.error}`);
    });
  }

  console.log('\n💡 Add these wearable images to your features page!');
  console.log('Replace the SVG icons with actual product photos.\n');
}

main().catch(console.error);

