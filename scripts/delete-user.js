// Delete a specific user from Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅' : '❌');
  console.log('\n⚠️  NOTE: You need SUPABASE_SERVICE_ROLE_KEY (not anon key) to delete users');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function deleteUser(email) {
  console.log('\n🗑️  Deleting user:', email);
  console.log('━'.repeat(60));

  try {
    // Step 1: Find the user
    console.log('\n1️⃣  Finding user in auth.users...');
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Error listing users:', listError.message);
      return;
    }

    const user = users.find(u => u.email === email);
    
    if (!user) {
      console.log('⚠️  User not found in auth.users');
      console.log('   Email:', email);
      return;
    }

    console.log('✅ Found user');
    console.log('   ID:', user.id);
    console.log('   Email:', user.email);
    console.log('   Created:', user.created_at);

    const userId = user.id;

    // Step 2: Delete from profiles table
    console.log('\n2️⃣  Deleting from profiles table...');
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (profileError) {
      console.log('⚠️  Profile delete error:', profileError.message);
    } else {
      console.log('✅ Profile deleted');
    }

    // Step 3: Delete from clients table (if exists)
    console.log('\n3️⃣  Deleting from clients table...');
    const { error: clientError } = await supabase
      .from('clients')
      .delete()
      .eq('user_id', userId);

    if (clientError && clientError.code !== 'PGRST116') {
      console.log('⚠️  Client delete error:', clientError.message);
    } else {
      console.log('✅ Client record deleted (if existed)');
    }

    // Step 4: Delete from auth.users
    console.log('\n4️⃣  Deleting from auth.users...');
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error('❌ Auth delete error:', deleteError.message);
    } else {
      console.log('✅ User deleted from auth.users');
    }

    // Step 5: Verify deletion
    console.log('\n5️⃣  Verifying deletion...');
    const { data: { users: verifyUsers } } = await supabase.auth.admin.listUsers();
    const stillExists = verifyUsers.find(u => u.email === email);

    if (stillExists) {
      console.log('❌ User still exists!');
    } else {
      console.log('✅ User successfully deleted');
    }

    console.log('\n' + '━'.repeat(60));
    console.log('✅ Deletion complete for:', email);
    console.log('\n');

  } catch (error) {
    console.error('\n❌ Unexpected error:', error);
  }
}

// Get email from command line or use default
const emailToDelete = process.argv[2] || 'm_lowegren@example.com';

console.log('\n⚠️  WARNING: This will permanently delete the user!');
console.log('Email to delete:', emailToDelete);

// Run the deletion
deleteUser(emailToDelete);

