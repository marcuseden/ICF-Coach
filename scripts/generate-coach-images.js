#!/usr/bin/env node

/**
 * Generate Coach Face Shot Images using DALL-E 3
 * Creates professional headshot images for video call UI
 */

import 'dotenv/config';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY not found in environment variables');
  process.exit(1);
}

const coaches = [
  {
    name: 'Sarah Martinez',
    prompt: `Professional headshot portrait of a confident female ICF-certified coach in her 40s, warm smile, professional attire, natural lighting, clean beige gradient background, shot on iPhone Pro, Apple commercial photography style, approachable and trustworthy, shallow depth of field, premium quality, vertical portrait orientation 1024x1792`
  },
  {
    name: 'Michael Chen',
    prompt: `Professional headshot portrait of a confident male ICF-certified business coach in his late 30s, genuine smile, modern professional attire, natural lighting, clean beige gradient background, shot on iPhone Pro, Apple commercial photography style, approachable leadership presence, shallow depth of field, premium quality, vertical portrait orientation 1024x1792`
  },
  {
    name: 'Emma Johansson',
    prompt: `Professional headshot portrait of a confident female executive coach in her early 40s, Scandinavian features, warm professional smile, elegant business attire, natural lighting, clean beige gradient background, shot on iPhone Pro, Apple commercial photography style, trustworthy and knowledgeable, shallow depth of field, premium quality, vertical portrait orientation 1024x1792`
  },
  {
    name: 'David Thompson',
    prompt: `Professional headshot portrait of an experienced male leadership coach in his 50s, confident smile, salt and pepper hair, professional business attire, natural lighting, clean beige gradient background, shot on iPhone Pro, Apple commercial photography style, wise and approachable, shallow depth of field, premium quality, vertical portrait orientation 1024x1792`
  }
];

async function generateCoachImage(coach) {
  console.log(`\n🎨 Generating image for ${coach.name}...`);
  
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: coach.prompt,
        n: 1,
        size: '1024x1792',
        quality: 'hd',
        style: 'natural'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`DALL-E API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;
    const revisedPrompt = data.data[0].revised_prompt;

    console.log(`✅ Generated image for ${coach.name}`);
    console.log(`   URL: ${imageUrl}`);
    console.log(`   Revised prompt: ${revisedPrompt.substring(0, 100)}...`);

    return {
      name: coach.name,
      url: imageUrl,
      prompt: coach.prompt,
      revised_prompt: revisedPrompt,
      generated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error(`❌ Failed to generate image for ${coach.name}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting coach face shot image generation...\n');
  console.log(`Generating ${coaches.length} coach images...\n`);

  const results = [];

  for (const coach of coaches) {
    const result = await generateCoachImage(coach);
    if (result) {
      results.push(result);
    }
    // Wait 2 seconds between requests to avoid rate limiting
    if (coaches.indexOf(coach) < coaches.length - 1) {
      console.log('⏳ Waiting 2 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Save results to JSON file
  const outputPath = join(process.cwd(), 'public', 'coach-images.json');
  await writeFile(outputPath, JSON.stringify(results, null, 2));

  console.log(`\n✅ Generated ${results.length} coach images`);
  console.log(`📝 Results saved to: ${outputPath}`);
  
  console.log('\n📋 Coach Image URLs:');
  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.name}:`);
    console.log(`   ${result.url}`);
  });

  console.log('\n✨ Done!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

