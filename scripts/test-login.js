// Test login functionality for m_lowegren@mac.com
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
  const email = 'm_lowegren@mac.com';
  const password = 'coach2024';

  console.log('\n🧪 Testing Login for:', email);
  console.log('━'.repeat(60));

  try {
    // Step 1: Check if user exists in auth.users
    console.log('\n1️⃣  Checking auth.users...');
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.log('⚠️  Could not list users (using anon key?)');
    } else {
      const authUser = users.find(u => u.email === email);
      if (authUser) {
        console.log('✅ User exists in auth.users');
        console.log('   ID:', authUser.id);
        console.log('   Email:', authUser.email);
        console.log('   Created:', authUser.created_at);
      } else {
        console.log('❌ User NOT found in auth.users');
        console.log('   You need to create this user first!');
        return;
      }
    }

    // Step 2: Check profile
    console.log('\n2️⃣  Checking profiles table...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (profileError) {
      console.log('❌ Profile error:', profileError.message);
    } else if (profile) {
      console.log('✅ Profile exists');
      console.log('   Name:', profile.name);
      console.log('   Role:', profile.role);
      console.log('   Full Access:', profile.has_full_access);
    } else {
      console.log('⚠️  Profile not found (will be created on first login)');
    }

    // Step 3: Attempt login
    console.log('\n3️⃣  Testing login with password...');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (loginError) {
      console.log('❌ Login failed:', loginError.message);
      console.log('   Error code:', loginError.status);
      
      if (loginError.message.includes('Invalid login credentials')) {
        console.log('\n💡 Solution: Reset the password in Supabase Dashboard:');
        console.log('   1. Go to Authentication → Users');
        console.log('   2. Find', email);
        console.log('   3. Click "..." → Reset Password');
        console.log('   4. Set password to: coach2024');
      }
    } else {
      console.log('✅ Login successful!');
      console.log('   User ID:', loginData.user.id);
      console.log('   Email:', loginData.user.email);
      console.log('   Session:', loginData.session ? '✅ Active' : '❌ None');
      
      // Sign out
      await supabase.auth.signOut();
      console.log('   Signed out');
    }

    // Step 4: Check client record (if applicable)
    console.log('\n4️⃣  Checking clients table...');
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('email', email)
      .single();

    if (clientError && clientError.code !== 'PGRST116') {
      console.log('⚠️  Client query error:', clientError.message);
    } else if (client) {
      console.log('✅ Client record exists');
      console.log('   Name:', client.name);
      console.log('   Package:', client.package_id);
    } else {
      console.log('ℹ️  No client record (admin users may not have one)');
    }

  } catch (error) {
    console.error('\n❌ Unexpected error:', error);
  }

  console.log('\n' + '━'.repeat(60));
  console.log('\n📋 Test Summary:');
  console.log('   Email:', email);
  console.log('   Password:', password);
  console.log('   Login URL: http://localhost:3000/login');
  console.log('\n');
}

// Run the test
testLogin();

