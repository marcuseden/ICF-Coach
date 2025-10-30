#!/usr/bin/env node

/**
 * Environment Variables Verification Script
 * Checks if all required environment variables are properly set
 */

const fs = require('fs');
const path = require('path');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'ELEVENLABS_API_KEY',
  'ELEVENLABS_AGENT_ID',
];

const optionalVars = [
  'NEXT_PUBLIC_APP_URL',
  'OPENAI_API_KEY',
];

console.log('\n🔍 Checking environment variables...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.error('❌ .env.local file not found!');
  console.log('\n📝 Create it by running:');
  console.log('   cp .env.example .env.local');
  console.log('   Then edit .env.local with your actual keys\n');
  process.exit(1);
}

// Load environment variables from .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=:#]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

let hasErrors = false;
let hasWarnings = false;

// Check required variables
console.log('📋 Required Variables:');
requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.includes('your-') || value.includes('xxx')) {
    console.error(`   ❌ ${varName}: Missing or placeholder value`);
    hasErrors = true;
  } else {
    const displayValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
    console.log(`   ✅ ${varName}: ${displayValue}`);
  }
});

// Check optional variables
console.log('\n📋 Optional Variables:');
optionalVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.includes('your-')) {
    console.warn(`   ⚠️  ${varName}: Not set (optional)`);
    hasWarnings = true;
  } else {
    const displayValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
    console.log(`   ✅ ${varName}: ${displayValue}`);
  }
});

// Final summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('\n❌ Configuration has errors. Please fix the missing variables.');
  console.log('\n📚 See SETUP_GUIDE.md for detailed instructions.\n');
  process.exit(1);
} else if (hasWarnings) {
  console.log('\n✅ Required configuration is complete!');
  console.warn('⚠️  Some optional variables are not set.\n');
  process.exit(0);
} else {
  console.log('\n✅ All environment variables are properly configured!\n');
  process.exit(0);
}

