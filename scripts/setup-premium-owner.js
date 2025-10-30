// Script to setup m_lowegrenmac.com as Premium Package Owner
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupPremiumOwner() {
  console.log('🎯 Setting up Premium Package Owner\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  const email = 'm_lowegrenmac.com';
  const password = 'premium2024'; // Strong password for premium account
  const name = 'Mac Lowegren';
  
  try {
    // Step 1: Create auth user
    console.log('👤 Creating user account...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: {
        name: name,
        package: 'premium'
      }
    });
    
    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('⚠️  User already exists, updating...');
        
        // Get existing user
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
          // Update password
          await supabase.auth.admin.updateUserById(
            existingUser.id,
            { 
              password: password,
              email_confirm: true,
              user_metadata: {
                name: name,
                package: 'premium'
              }
            }
          );
          authData.user = existingUser;
          console.log('✅ User updated successfully!');
        }
      } else {
        throw authError;
      }
    } else {
      console.log('✅ User created successfully!');
    }

    const userId = authData.user.id;
    console.log('🆔 User ID:', userId);

    // Step 2: Create profile with client role and full access
    console.log('\n📝 Creating user profile...');
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email: email,
        name: name,
        role: 'client',
        has_full_access: true, // Premium owner has full access
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      })
      .select();

    if (profileError) {
      console.error('❌ Error creating profile:', profileError.message);
      throw profileError;
    }
    console.log('✅ Profile created!');

    // Step 3: Create client record with Premium package
    console.log('\n💎 Assigning Premium package...');
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .upsert({
        user_id: userId,
        name: name,
        email: email,
        package_id: 'premium', // Premium package
        start_date: new Date().toISOString(),
        current_session: 1,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select();

    if (clientError) {
      console.error('❌ Error creating client record:', clientError.message);
      throw clientError;
    }
    console.log('✅ Premium package assigned!');

    // Step 4: Verify complete setup
    console.log('\n🔍 Verifying complete setup...\n');
    
    const { data: verifyProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    const { data: verifyClient } = await supabase
      .from('clients')
      .select(`
        *,
        packages:package_id (
          name,
          duration,
          sessions,
          price
        )
      `)
      .eq('email', email)
      .single();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ PREMIUM OWNER SETUP COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n👤 USER DETAILS:');
    console.log('   📧 Email:', verifyProfile.email);
    console.log('   🏷️  Name:', verifyProfile.name);
    console.log('   🎭 Role:', verifyProfile.role);
    console.log('   🔓 Full Access:', verifyProfile.has_full_access);
    
    console.log('\n💎 PREMIUM PACKAGE DETAILS:');
    console.log('   📦 Package:', verifyClient.packages.name);
    console.log('   ⏱️  Duration:', verifyClient.packages.duration);
    console.log('   📊 Sessions:', verifyClient.packages.sessions);
    console.log('   💰 Value:', verifyClient.packages.price);
    console.log('   📅 Start Date:', new Date(verifyClient.start_date).toLocaleDateString());
    console.log('   🎯 Current Session:', verifyClient.current_session);
    
    console.log('\n🎉 LOGIN CREDENTIALS:');
    console.log('   📧 Email: m_lowegrenmac.com');
    console.log('   🔑 Password: premium2024');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    console.log('\n💎 PREMIUM PACKAGE INCLUDES:');
    console.log('   ✅ 12 coaching sessions (60 min each)');
    console.log('   ✅ Weekly mobile check-ins');
    console.log('   ✅ All questionnaires (intake/midpoint/exit)');
    console.log('   ✅ Comprehensive reading library');
    console.log('   ✅ Priority support');
    console.log('   ✅ Detailed progress reports');
    console.log('   ✅ Voice coaching with ElevenLabs');
    console.log('   ✅ Full access to all features');
    console.log('\n🚀 Ready to login at: http://localhost:3000\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.error('Full error:', error);
  }
}

setupPremiumOwner();

