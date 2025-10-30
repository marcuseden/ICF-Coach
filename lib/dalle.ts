// DALL-E Image Generation for Coaching Page

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

export interface ImageGenerationRequest {
  prompt: string;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  revised_prompt?: string;
  created_at: string;
}

export async function generateImage(request: ImageGenerationRequest): Promise<GeneratedImage> {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: request.prompt,
      n: 1,
      size: request.size || '1792x1024',
      quality: request.quality || 'hd',
      style: request.style || 'natural'
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`DALL-E API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  
  return {
    url: data.data[0].url,
    prompt: request.prompt,
    revised_prompt: data.data[0].revised_prompt,
    created_at: new Date().toISOString()
  };
}

// Pre-defined prompts for coaching page images
export const COACHING_IMAGE_PROMPTS = {
  hero: `Professional minimalist coaching scene, iPhone advertisement style, clean modern aesthetic. A confident business professional in natural light, warm tones, shallow depth of field. Sophisticated, aspirational, premium feeling. Clean background with subtle gradient from warm beige to soft white. Professional photography, high-end commercial look, Apple advertisement aesthetic.`,
  
  voiceCoach: `iPhone style product photography showing AI voice coaching concept. Modern minimalist design, person using AirPods in professional setting, warm natural lighting, clean beige and white tones, premium aesthetic, sophisticated commercial photography.`,
  
  videoSession: `Professional video call coaching session, iPhone advertisement style. Split screen showing coach and client in natural light, modern minimalist office spaces, warm tones, premium quality, sophisticated business aesthetic, Apple-like commercial photography.`,
  
  progress: `Minimalist data visualization for personal growth tracking, iPhone interface style. Clean charts and progress indicators in stone and beige tones, modern design, premium aesthetic, simple and elegant, professional business graphics.`,
  
  commitment: `Business professional writing goals, iPhone commercial style. Clean modern workspace, natural lighting, warm tones, minimalist aesthetic, shallow depth of field, premium photography, aspirational and professional mood.`,
  
  success: `Confident business leader celebrating achievement, iPhone advertisement aesthetic. Natural professional setting, warm natural light, genuine smile, modern minimalist background in beige tones, premium commercial photography, aspirational and authentic.`
};

// Download image from URL and convert to base64
export async function downloadImageAsBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

