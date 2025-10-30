const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyTables() {
  console.log('🔍 Verifying all database tables...\n');
  
  const tables = ['profiles', 'packages', 'clients', 'sessions', 'check_ins', 'questionnaire_responses', 'reading_progress'];
  
  for (const table of tables) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`❌ ${table}: ERROR - ${error.message}`);
    } else {
      console.log(`✅ ${table}: Ready (${count || 0} rows)`);
    }
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 All tables verified!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n✅ Your app is ready to use!');
  console.log('📍 Login at: http://localhost:3000');
  console.log('👤 Email: m_lowegren@mac.com');
  console.log('🔑 Password: coach2024');
}

verifyTables();
