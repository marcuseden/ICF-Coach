// Generate comprehensive FAQ content using GPT-4

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateFAQ() {
  console.log('\n📝 Generating comprehensive FAQ with GPT-4...\n');
  
  const prompt = `Generate a comprehensive FAQ (Frequently Asked Questions) for YourCoachAgent - a professional coaching platform.

CONTEXT:
- Platform offers AI voice coaching (24/7) + human ICF-certified coaches (video/phone)
- Three packages: Basic ($400/4 weeks), Standard ($750/8 weeks), Premium ($1,200/12 weeks)
- Features: Voice AI (ElevenLabs), Video calls (Jitsi Meet), Progress tracking, Wearables integration (Apple Watch, Oura Ring, WHOOP)
- ICF-certified coaching approach
- Session structure: 7-step ICF framework
- Commitment tracking with confidence scoring

Generate 15-20 FAQs covering:
1. Getting Started (3-4 questions)
2. Coaching Sessions (4-5 questions)
3. AI Voice Coach (2-3 questions)
4. Human Coaching (2-3 questions)
5. Pricing & Billing (3-4 questions)
6. Technical Support (2-3 questions)
7. Wearables Integration (2 questions)
8. Privacy & Security (2 questions)

Make answers detailed, helpful, and friendly. Include specific details about features and processes.

Format as JSON array:
[
  {
    "category": "Getting Started",
    "question": "...",
    "answer": "..."
  }
]`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful customer support expert creating FAQ content for a coaching platform. Generate clear, comprehensive, friendly answers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Extract JSON from markdown code blocks if present
    let faqData = content;
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      faqData = jsonMatch[1];
    }

    const faqs = JSON.parse(faqData);

    console.log(`✅ Generated ${faqs.length} FAQ items!\n`);

    // Save to file
    const fs = require('fs');
    const path = require('path');
    
    const contentDir = path.join(__dirname, '../content');
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(contentDir, 'faq.json'),
      JSON.stringify(faqs, null, 2),
      'utf-8'
    );

    console.log('💾 Saved to: content/faq.json\n');

    // Display categories
    const categories = [...new Set(faqs.map(f => f.category))];
    console.log('📂 Categories:');
    categories.forEach(cat => {
      const count = faqs.filter(f => f.category === cat).length;
      console.log(`   - ${cat}: ${count} questions`);
    });

    console.log('\n💡 Use this FAQ content in your Contact page!\n');

    return faqs;
  } catch (error) {
    console.error('❌ Failed to generate FAQ:', error.message);
    throw error;
  }
}

generateFAQ().catch(console.error);

