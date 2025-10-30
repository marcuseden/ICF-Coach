#!/usr/bin/env node

/**
 * Add or reset a user account
 * This script can create new users or reset passwords for existing ones
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Get user details from command line or use default
const email = process.argv[2] || 'm_lowegren@example.com';
const password = process.argv[3] || 'coach2024';
const name = process.argv[4] || 'M Lowegren';
const packageId = process.argv[5] || 'premium';

const userDetails = {
  email,
  password,
  name,
  role: 'client',
  packageId
};

async function addOrResetUser() {
  console.log('🚀 Setting up user account...\n');
  console.log(`📧 Email: ${userDetails.email}`);
  console.log(`👤 Name: ${userDetails.name}`);
  console.log(`🔑 Password: ${userDetails.password}\n`);

  try {
    // Step 1: Check if user exists
    console.log('🔍 Checking if user exists...');
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;
    
    let existingUser = users.users.find(u => u.email === userDetails.email);
    let userId;

    if (existingUser) {
      console.log(`✅ Found existing user: ${existingUser.id}`);
      console.log('🔄 Updating password...');
      
      // Update the user's password
      const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { 
          password: userDetails.password,
          email_confirm: true
        }
      );

      if (updateError) throw updateError;
      console.log('✅ Password updated successfully');
      userId = existingUser.id;
    } else {
      console.log('📝 Creating new auth user...');
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userDetails.email,
        password: userDetails.password,
        email_confirm: true,
        user_metadata: {
          name: userDetails.name
        }
      });

      if (authError) throw authError;
      console.log(`✅ Auth user created: ${authData.user.id}`);
      userId = authData.user.id;
    }

    // Step 2: Create/update profile
    console.log('\n📝 Creating/updating user profile...');
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email: userDetails.email,
        name: userDetails.name,
        role: userDetails.role,
        has_full_access: true,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error('❌ Profile error:', profileError);
      throw profileError;
    }
    console.log('✅ Profile created/updated');

    // Step 3: Create/update client record
    console.log('\n📝 Creating/updating client record...');
    
    // Check if client already exists
    const { data: existingClient } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingClient) {
      console.log('ℹ️  Client record already exists, updating...');
      const { error: updateError } = await supabase
        .from('clients')
        .update({
          name: userDetails.name,
          email: userDetails.email,
          package_id: userDetails.packageId,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (updateError) {
        console.error('❌ Client update error:', updateError);
        throw updateError;
      }
      console.log('✅ Client record updated');
    } else {
      // Create new client
      const { error: clientError } = await supabase
        .from('clients')
        .insert({
          user_id: userId,
          name: userDetails.name,
          email: userDetails.email,
          package_id: userDetails.packageId,
          start_date: new Date().toISOString(),
          current_session: 1
        });

      if (clientError) {
        console.error('❌ Client error:', clientError);
        throw clientError;
      }
      console.log('✅ Client record created');
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✨ User account ready!');
    console.log('='.repeat(60));
    console.log('\n📋 User Details:');
    console.log(`   Name:         ${userDetails.name}`);
    console.log(`   Email:        ${userDetails.email}`);
    console.log(`   Password:     ${userDetails.password}`);
    console.log(`   Role:         ${userDetails.role}`);
    console.log(`   Package:      ${userDetails.packageId === 'premium' ? 'Premium (12 weeks)' : userDetails.packageId}`);
    console.log(`   Full Access:  Yes`);
    console.log(`   User ID:      ${userId}`);
    console.log('\n🔗 Login URL: http://localhost:3000/login');
    console.log('\n✅ User can now log in with their credentials!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
    process.exit(1);
  }
}

addOrResetUser().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

