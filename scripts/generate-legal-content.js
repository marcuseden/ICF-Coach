// Generate real legal content for Terms, Privacy, and Contact pages using GPT-4

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateLegalContent(type) {
  console.log(`\n📝 Generating ${type} content with GPT-4...\n`);
  
  const prompts = {
    terms: `Generate comprehensive Terms of Service for "YourCoachAgent" - a professional coaching platform that provides:
    - AI-powered voice coaching using ElevenLabs
    - Human ICF-certified coaching sessions (video and phone)
    - Progress tracking and commitment management
    - Subscription packages (Basic $400, Standard $750, Premium $1,200)
    
    Include sections on: User Agreement, Service Description, Payment Terms, Cancellation Policy, Intellectual Property, Limitation of Liability, Dispute Resolution, Governing Law.
    
    Make it professional, legally sound, and user-friendly. Use clear headings and numbered sections. Format in Markdown.`,
    
    privacy: `Generate a comprehensive Privacy Policy for "YourCoachAgent" - a coaching platform that collects:
    - User account information (name, email, phone)
    - Session data (coaching conversations, commitments, notes)
    - Voice recordings (AI coaching sessions)
    - Video session metadata
    - Progress and analytics data
    - Payment information via third-party processors
    
    We use: Supabase (database), ElevenLabs (AI voice), Jitsi Meet (video), OpenAI (content generation).
    
    Include sections on: Information Collection, How We Use Data, Data Sharing, Security Measures, User Rights, GDPR Compliance, California Privacy Rights, Cookies, Data Retention.
    
    Make it transparent, comprehensive, and GDPR-compliant. Format in Markdown.`,
    
    contact: `Generate informative Contact page content for "YourCoachAgent" coaching platform.
    
    Include:
    - Welcome message explaining how to reach support
    - Different contact methods (email, phone, chat)
    - Response time expectations
    - FAQ section with 8-10 common questions about coaching, billing, technical issues
    - Support hours
    - Emergency contact info
    
    Make it friendly, helpful, and professional. Format in Markdown with clear sections.`
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',  // Latest GPT-4 model
        messages: [
          {
            role: 'system',
            content: 'You are a legal expert specializing in technology and coaching services. Generate clear, comprehensive, legally sound content.'
          },
          {
            role: 'user',
            content: prompts[type]
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    console.log(`✅ ${type} content generated!`);
    console.log(`📄 Length: ${content.length} characters\n`);

    return {
      type,
      content,
      wordCount: content.split(/\s+/).length
    };
  } catch (error) {
    console.error(`❌ Failed to generate ${type}:`, error.message);
    return { type, error: error.message };
  }
}

async function saveToFile(type, content) {
  const fs = require('fs');
  const path = require('path');
  
  const filename = path.join(__dirname, `../content/${type}.md`);
  
  // Create content directory if it doesn't exist
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filename, content, 'utf-8');
  console.log(`💾 Saved to: content/${type}.md`);
}

async function main() {
  console.log('🚀 Generating legal content with GPT-4...\n');
  console.log('Pages: Terms of Service, Privacy Policy, Contact\n');
  
  const types = ['terms', 'privacy', 'contact'];
  const results = [];
  
  for (const type of types) {
    const result = await generateLegalContent(type);
    results.push(result);
    
    if (!result.error && result.content) {
      await saveToFile(type, result.content);
    }
    
    // Wait 2 seconds between requests
    if (types.indexOf(type) < types.length - 1) {
      console.log('⏳ Waiting 2 seconds...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n\n📊 GENERATION COMPLETE');
  console.log('========================\n');
  
  results.forEach(result => {
    if (result.error) {
      console.log(`❌ ${result.type}: FAILED - ${result.error}`);
    } else {
      console.log(`✅ ${result.type}: ${result.wordCount} words`);
    }
  });

  console.log('\n💡 Content saved to /content folder');
  console.log('Use this content in your Terms, Privacy, and Contact pages!\n');
}

main().catch(console.error);

