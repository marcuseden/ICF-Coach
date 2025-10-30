// Script to setup admin user in Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupAdminUser() {
  console.log('🔍 Checking for existing user...\n');
  
  const userId = '626e8820-a702-4f1a-bdc4-7a16b06e2bf0';
  const email = 'm_lowegren@mac.com';
  
  try {
    // Update user password
    console.log('🔐 Updating user password to: coach2024');
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
      userId,
      { 
        password: 'coach2024',
        email_confirm: true
      }
    );
    
    if (updateError) {
      console.error('❌ Error updating password:', updateError.message);
    } else {
      console.log('✅ Password updated successfully!');
    }

    // Create or update profile with admin access
    console.log('\n👤 Setting up admin profile...');
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email: email,
        name: 'Mac Lowegren',
        role: 'admin',
        has_full_access: true,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      })
      .select();

    if (profileError) {
      console.error('❌ Error updating profile:', profileError.message);
    } else {
      console.log('✅ Admin profile created/updated!');
    }

    // Verify the setup
    console.log('\n🔍 Verifying user setup...');
    const { data: profile, error: verifyError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (verifyError) {
      console.error('❌ Error verifying:', verifyError.message);
    } else {
      console.log('\n✅ User verified successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:', profile.email);
      console.log('👤 Name:', profile.name);
      console.log('🎭 Role:', profile.role);
      console.log('🔓 Full Access:', profile.has_full_access);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n🎉 You can now login with:');
      console.log('   Email: m_lowegren@mac.com');
      console.log('   Password: coach2024');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

setupAdminUser();

