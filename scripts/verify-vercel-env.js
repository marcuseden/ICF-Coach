#!/usr/bin/env node

/**
 * Verify Environment Variables for Vercel Deployment
 * 
 * This script checks if all required environment variables are properly configured
 * for a production deployment on Vercel.
 * 
 * Usage:
 *   node scripts/verify-vercel-env.js
 * 
 * Run this locally to verify your .env.local before deploying.
 * The same variables must be configured in Vercel Dashboard.
 */

console.log('\n🔍 Verifying Environment Variables for Vercel Deployment\n');
console.log('━'.repeat(70));

const requiredVars = {
  // Required for authentication
  'NEXT_PUBLIC_SUPABASE_URL': {
    description: 'Supabase project URL',
    required: true,
    clientSide: true,
    example: 'https://xxxxx.supabase.co'
  },
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': {
    description: 'Supabase anonymous/public key',
    required: true,
    clientSide: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  },
  'SUPABASE_SERVICE_ROLE_KEY': {
    description: 'Supabase service role key (server-side only)',
    required: true,
    clientSide: false,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  },
  
  // Optional but recommended for voice features
  'NEXT_PUBLIC_ELEVENLABS_API_KEY': {
    description: 'ElevenLabs API key for voice sessions',
    required: false,
    clientSide: true,
    example: 'sk_...'
  },
  'NEXT_PUBLIC_ELEVENLABS_AGENT_ID': {
    description: 'ElevenLabs agent ID for voice sessions',
    required: false,
    clientSide: true,
    example: 'agent_...'
  },
  
  // Optional for DALL-E image generation
  'OPENAI_API_KEY': {
    description: 'OpenAI API key for DALL-E image generation',
    required: false,
    clientSide: false,
    example: 'sk-proj-...'
  }
};

let hasErrors = false;
let hasWarnings = false;

// Check each variable
for (const [varName, config] of Object.entries(requiredVars)) {
  const value = process.env[varName];
  const isSet = value && value.length > 0;
  
  if (config.required) {
    if (isSet) {
      console.log(`✅ ${varName}`);
      console.log(`   ${config.description}`);
      console.log(`   Value: ${value.substring(0, 30)}...`);
      console.log(`   ${config.clientSide ? '🌐 Client-side (NEXT_PUBLIC_)' : '🔒 Server-side only'}`);
    } else {
      console.log(`❌ ${varName} - MISSING`);
      console.log(`   ${config.description}`);
      console.log(`   Example: ${config.example}`);
      console.log(`   ${config.clientSide ? '⚠️  Must have NEXT_PUBLIC_ prefix for client access' : ''}`);
      hasErrors = true;
    }
  } else {
    if (isSet) {
      console.log(`✅ ${varName} (optional)`);
      console.log(`   ${config.description}`);
      console.log(`   Value: ${value.substring(0, 30)}...`);
    } else {
      console.log(`⚠️  ${varName} - NOT SET (optional)`);
      console.log(`   ${config.description}`);
      console.log(`   This is optional but recommended for full functionality`);
      hasWarnings = true;
    }
  }
  console.log('');
}

console.log('━'.repeat(70));

// Summary
if (!hasErrors && !hasWarnings) {
  console.log('\n✅ ALL ENVIRONMENT VARIABLES CONFIGURED!');
  console.log('\n🚀 Ready for Vercel deployment.');
  console.log('\n📋 Next steps:');
  console.log('   1. Add these same variables to Vercel Dashboard');
  console.log('   2. Go to: https://vercel.com/dashboard');
  console.log('   3. Select your project → Settings → Environment Variables');
  console.log('   4. Add each variable for Production, Preview, and Development');
  console.log('   5. Redeploy your project');
} else if (!hasErrors && hasWarnings) {
  console.log('\n⚠️  REQUIRED VARIABLES OK, SOME OPTIONAL ONES MISSING');
  console.log('\n🚀 Ready for basic deployment (auth will work).');
  console.log('   Voice features and image generation may not work without optional variables.');
  console.log('\n📋 To enable all features:');
  console.log('   1. Add the optional variables shown above');
  console.log('   2. Configure them in Vercel Dashboard');
  console.log('   3. Redeploy');
} else {
  console.log('\n❌ MISSING REQUIRED ENVIRONMENT VARIABLES!');
  console.log('\n🔧 How to fix:');
  console.log('\n   Local Development:');
  console.log('   1. Create or edit .env.local in your project root');
  console.log('   2. Add the missing variables (see examples above)');
  console.log('   3. Restart your dev server: npm run dev');
  console.log('\n   Vercel Production:');
  console.log('   1. Go to: https://vercel.com/dashboard');
  console.log('   2. Select your project → Settings → Environment Variables');
  console.log('   3. Add each missing variable');
  console.log('   4. Select all environments: Production, Preview, Development');
  console.log('   5. Save and redeploy your project');
  console.log('\n📚 For Supabase keys:');
  console.log('   1. Go to: https://supabase.com/dashboard');
  console.log('   2. Select your project');
  console.log('   3. Go to: Settings → API');
  console.log('   4. Copy Project URL and Keys');
  console.log('\n📚 For ElevenLabs keys:');
  console.log('   1. Go to: https://elevenlabs.io/app/settings');
  console.log('   2. Get your API key');
  console.log('   3. Create an agent and get the agent ID');
  
  process.exit(1);
}

console.log('\n━'.repeat(70));

// Additional checks
console.log('\n🔍 Additional Vercel Deployment Checks:\n');

// Check NEXT_PUBLIC_ prefix
const clientVars = Object.keys(requiredVars).filter(key => requiredVars[key].clientSide);
console.log('✅ Client-side variables (must have NEXT_PUBLIC_ prefix):');
clientVars.forEach(key => {
  console.log(`   - ${key}`);
});

console.log('\n✅ Server-side variables (no NEXT_PUBLIC_ prefix needed):');
const serverVars = Object.keys(requiredVars).filter(key => !requiredVars[key].clientSide);
serverVars.forEach(key => {
  console.log(`   - ${key}`);
});

console.log('\n💡 Important Notes:');
console.log('   • Client-side variables (NEXT_PUBLIC_*) are embedded in the browser bundle');
console.log('   • Server-side variables are only available in API routes and server components');
console.log('   • Never expose sensitive keys (like service role keys) to the client');
console.log('   • Vercel automatically loads environment variables at build time');
console.log('   • Changes to env vars require a redeploy to take effect');

console.log('\n━'.repeat(70));
console.log('\n✨ Done! Check the results above.\n');

