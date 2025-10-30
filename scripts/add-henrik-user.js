#!/usr/bin/env node

/**
 * Add Henrik Dannert as a user with Premium subscription
 * This script uses Supabase Admin API to create the complete user
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

const userDetails = {
  email: 'henrik.dannert@heartpace.com',
  password: 'coach2024',
  name: 'Henrik Dannert',
  role: 'client',
  packageId: 'premium'
};

async function addHenrikUser() {
  console.log('🚀 Adding Henrik Dannert to the system...\n');

  try {
    // Step 1: Create auth user
    console.log('📝 Creating auth user...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userDetails.email,
      password: userDetails.password,
      email_confirm: true,
      user_metadata: {
        name: userDetails.name
      }
    });

    let userId;
    
    if (authError) {
      // Check if user already exists
      if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
        console.log('ℹ️  User already exists in auth, fetching existing user...');
        
        const { data: users, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) throw listError;
        
        const existingUser = users.users.find(u => u.email === userDetails.email);
        if (!existingUser) {
          throw new Error('User exists but could not be found');
        }
        
        console.log(`✅ Found existing user: ${existingUser.id}`);
        userId = existingUser.id;
      } else {
        throw authError;
      }
    } else {
      console.log(`✅ Auth user created: ${authData.user.id}`);
      userId = authData.user.id;
    }


    // Step 2: Create/update profile
    console.log('\n📝 Creating user profile...');
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

    // Step 3: Create client record (check if exists first)
    console.log('\n📝 Creating client record...');
    
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
    console.log('✨ Henrik Dannert successfully added!');
    console.log('='.repeat(60));
    console.log('\n📋 User Details:');
    console.log(`   Name:         ${userDetails.name}`);
    console.log(`   Email:        ${userDetails.email}`);
    console.log(`   Password:     ${userDetails.password}`);
    console.log(`   Role:         ${userDetails.role}`);
    console.log(`   Package:      Premium (12 weeks)`);
    console.log(`   Full Access:  Yes`);
    console.log(`   User ID:      ${userId}`);
    console.log('\n🔗 Login URL: http://localhost:3000/login');
    console.log('\n✅ User can now log in with their credentials!');

  } catch (error) {
    console.error('\n❌ Error adding user:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
    process.exit(1);
  }
}

addHenrikUser().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

