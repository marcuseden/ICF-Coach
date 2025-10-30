import { NextResponse } from 'next/server';
import { generateImage, COACHING_IMAGE_PROMPTS, downloadImageAsBase64 } from '@/lib/dalle';

export async function POST(request: Request) {
  try {
    const { imageType } = await request.json();
    
    // Get the appropriate prompt
    const prompt = COACHING_IMAGE_PROMPTS[imageType as keyof typeof COACHING_IMAGE_PROMPTS];
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Invalid image type' },
        { status: 400 }
      );
    }

    // Generate image with DALL-E
    const image = await generateImage({
      prompt,
      size: imageType === 'hero' ? '1792x1024' : '1024x1024',
      quality: 'hd',
      style: 'natural'
    });

    // Download and convert to base64 for storage
    const base64Image = await downloadImageAsBase64(image.url);

    // TODO: Save to Supabase storage
    // const { data, error } = await supabase
    //   .from('generated_images')
    //   .insert({
    //     type: imageType,
    //     url: image.url,
    //     prompt: image.prompt,
    //     revised_prompt: image.revised_prompt,
    //     base64_data: base64Image
    //   });

    return NextResponse.json({
      success: true,
      image: {
        url: image.url,
        type: imageType,
        prompt: image.prompt,
        revised_prompt: image.revised_prompt,
        base64: base64Image
      }
    });

  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    );
  }
}

// Generate all images for the coaching page
export async function GET() {
  try {
    const imageTypes = ['hero', 'voiceCoach', 'videoSession', 'progress', 'commitment', 'success'];
    const results = [];

    for (const type of imageTypes) {
      try {
        const prompt = COACHING_IMAGE_PROMPTS[type as keyof typeof COACHING_IMAGE_PROMPTS];
        const image = await generateImage({
          prompt,
          size: type === 'hero' ? '1792x1024' : '1024x1024',
          quality: 'hd',
          style: 'natural'
        });

        results.push({
          type,
          url: image.url,
          prompt: image.prompt,
          revised_prompt: image.revised_prompt
        });

        // Wait 2 seconds between requests to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to generate ${type}:`, error);
        results.push({
          type,
          error: error instanceof Error ? error.message : 'Failed'
        });
      }
    }

    return NextResponse.json({
      success: true,
      images: results
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate images' },
      { status: 500 }
    );
  }
}

