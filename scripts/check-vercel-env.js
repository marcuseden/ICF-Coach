#!/usr/bin/env node

/**
 * Check ElevenLabs Environment Variables in Vercel
 * 
 * This script helps diagnose why voice sessions aren't working on Vercel.
 * It checks if the required ElevenLabs environment variables are set.
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking ElevenLabs Configuration\n');
console.log('═══════════════════════════════════════════════════════════\n');

// Read local .env.local
const envPath = path.join(process.cwd(), '.env.local');
let localEnv = {};

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      localEnv[match[1].trim()] = match[2].trim();
    }
  });
} catch (error) {
  console.log('⚠️  Could not read .env.local file');
}

const requiredVars = [
  'NEXT_PUBLIC_ELEVENLABS_API_KEY',
  'NEXT_PUBLIC_ELEVENLABS_AGENT_ID',
  'ELEVENLABS_API_KEY',
  'ELEVENLABS_AGENT_ID'
];

console.log('📋 LOCAL ENVIRONMENT (.env.local):\n');

let allSet = true;
requiredVars.forEach(varName => {
  const value = localEnv[varName];
  if (value) {
    const masked = value.substring(0, 10) + '...' + value.substring(value.length - 4);
    console.log(`   ✅ ${varName}`);
    console.log(`      ${masked}\n`);
  } else {
    console.log(`   ❌ ${varName} - NOT SET\n`);
    allSet = false;
  }
});

console.log('═══════════════════════════════════════════════════════════\n');

if (!allSet) {
  console.log('❌ Some required environment variables are missing locally!\n');
} else {
  console.log('✅ All environment variables are set locally!\n');
}

console.log('📝 NEXT STEPS FOR VERCEL:\n');
console.log('1. Go to your Vercel project dashboard');
console.log('2. Navigate to Settings → Environment Variables');
console.log('3. Add these variables:\n');

requiredVars.forEach(varName => {
  if (localEnv[varName]) {
    console.log(`   ${varName}`);
    console.log(`   Value: ${localEnv[varName]}`);
    console.log('   Environment: Production, Preview, Development');
    console.log('');
  }
});

console.log('4. Redeploy your application\n');

console.log('═══════════════════════════════════════════════════════════\n');

console.log('🔗 Vercel Dashboard: https://vercel.com/dashboard');
console.log('🔗 ElevenLabs Dashboard: https://elevenlabs.io/app/conversational-ai\n');

