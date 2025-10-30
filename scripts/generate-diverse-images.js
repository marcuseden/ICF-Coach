// Generate diverse, inclusive images for coaching platform
// Features people of different ethnicities and genders

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const diversePrompts = {
  hero1: `Professional Black male business leader in modern office, confident and focused, iPhone advertisement style. Natural lighting, warm beige and stone tones, shallow depth of field, premium quality. Clean minimalist aesthetic, sophisticated commercial photography, Apple-style product photography.`,
  
  hero2: `Asian female executive in professional setting, intelligent and composed, iPhone commercial aesthetic. Modern workspace with natural light, warm tones, minimal design, premium quality. Sophisticated business photography, Apple advertisement style.`,
  
  hero3: `Hispanic male professional using wireless earbuds for coaching, iPhone style. Natural confident expression, modern clean background in beige tones, professional lighting, premium aesthetic. Apple commercial photography, aspirational and authentic.`,
  
  hero4: `South Asian female leader in thoughtful conversation, iPhone advertisement style. Professional modern setting, warm natural light, stone and beige color palette, shallow depth of field. Premium quality, sophisticated commercial photography, Apple aesthetic.`,
  
  hero5: `Middle Eastern male business professional in leadership moment, iPhone commercial style. Clean modern office, natural lighting, warm professional tones, minimal aesthetic. High-end commercial photography, Apple advertisement quality.`,
  
  aiCoach1: `Diverse group of professionals using AI coaching technology, iPhone style. Modern minimalist design, natural lighting, warm beige tones, premium quality. Inclusive representation, sophisticated commercial photography, Apple aesthetic.`,
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
        size: '1792x1024',
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
  console.log('🚀 Generating diverse, inclusive coaching images...\n');
  console.log('Style: iPhone advertisement aesthetic');
  console.log('Representation: Diverse ethnicities and genders\n');
  
  const results = [];
  
  for (const [type, prompt] of Object.entries(diversePrompts)) {
    const result = await generateImage(prompt, type);
    results.push(result);
    
    // Wait 3 seconds between requests
    if (Object.keys(diversePrompts).indexOf(type) < Object.keys(diversePrompts).length - 1) {
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

  console.log('\n💡 Use these diverse images on your landing page!');
  console.log('They represent various ethnicities and genders.\n');
}

main().catch(console.error);

