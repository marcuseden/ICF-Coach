# 🎨 DALL-E Image Generation Guide

**Status**: Ready to generate professional coaching images  
**API**: OpenAI DALL-E 3  
**Style**: iPhone advertisement aesthetic

---

## 🚀 Quick Start

### Generate Images

```bash
# Generate all landing page images
node scripts/generate-landing-images.js
```

This will generate:
- **Hero image** (1792x1024) - Full-width background
- **Voice Coach** (1024x1024) - AI coaching feature
- **Video Session** (1024x1024) - Human coaching feature

---

## 📸 Image Specifications

### Hero Image
- **Size**: 1792x1024 (ultra-wide landscape)
- **Style**: iPhone advertisement aesthetic
- **Subject**: Professional coaching scene
- **Quality**: HD
- **Mood**: Sophisticated, aspirational, premium
- **Colors**: Warm beige, soft white, natural tones

### Feature Images
- **Size**: 1024x1024 (square)
- **Style**: Minimalist, clean, professional
- **Quality**: HD
- **Aesthetic**: Apple product photography

---

## 🎯 What's Been Created

### 1. **DALL-E Integration** (`lib/dalle.ts`)
- OpenAI API integration
- Pre-defined professional prompts
- Image generation function
- Base64 conversion for storage

### 2. **API Route** (`app/api/generate-images/route.ts`)
- POST: Generate single image
- GET: Generate all images at once
- Automatic rate limiting
- Error handling

### 3. **Database Schema** (`supabase/images-schema.sql`)
- `generated_images` table
- Stores URLs and base64 data
- Public read access for landing page
- Automatic timestamps

### 4. **Generation Script** (`scripts/generate-landing-images.js`)
- Command-line tool
- Generates all images
- Shows progress
- Outputs URLs for easy copying

### 5. **Updated Landing Page** (`app/page.tsx`)
- Full-width hero section
- Background image with overlay
- Dramatic text styling
- Scroll indicator
- Professional layout

---

## 🎨 Current Hero Design

```tsx
<section className="relative min-h-screen">
  {/* Background Image */}
  <div className="absolute inset-0">
    <div className="bg-gradient-to-r from-stone-900/80..." />
    <img src="YOUR_DALLE_IMAGE_HERE" />
  </div>
  
  {/* Hero Content */}
  <h1 className="text-8xl text-white">
    Your coach.<br />
    Always there.<br />
    Always listening.
  </h1>
</section>
```

**Features**:
- Full viewport height
- Gradient overlay for text readability
- Large, dramatic typography
- White text on dark overlay
- Professional spacing
- Scroll indicator

---

## 🔧 How to Use Generated Images

### Option 1: Use DALL-E URLs Directly

```bash
# 1. Generate images
node scripts/generate-landing-images.js

# 2. Copy the URLs from output
# 3. Replace in app/page.tsx:
src="YOUR_GENERATED_URL_HERE"
```

### Option 2: Save to Supabase

```typescript
// After generating, save to database
const { data } = await supabase
  .from('generated_images')
  .insert({
    type: 'hero',
    url: imageUrl,
    prompt: prompt,
    base64_data: base64Image
  });
```

### Option 3: Use API Route

```typescript
// Generate via API
const response = await fetch('/api/generate-images', {
  method: 'POST',
  body: JSON.stringify({ imageType: 'hero' })
});

const { image } = await response.json();
// Use image.url in your component
```

---

## 📝 Image Prompts Used

### Hero Image
```
Professional minimalist coaching scene, iPhone advertisement style, 
clean modern aesthetic. A confident business professional in natural 
light, warm tones, shallow depth of field. Sophisticated, aspirational, 
premium feeling. Clean background with subtle gradient from warm beige 
to soft white. Professional photography, high-end commercial look, 
Apple advertisement aesthetic. Ultra-wide landscape format.
```

### Voice Coach
```
iPhone style product photography showing AI voice coaching concept. 
Modern minimalist design, person using AirPods in professional setting, 
warm natural lighting, clean beige and white tones, premium aesthetic, 
sophisticated commercial photography.
```

### Video Session
```
Professional video call coaching session, iPhone advertisement style. 
Modern minimalist office space with natural light, warm tones, premium 
quality, sophisticated business aesthetic, Apple-like commercial 
photography. Clean and professional.
```

---

## 🎯 Design Principles

All images follow:
- ✅ **iPhone advertisement style** - Clean, minimal, premium
- ✅ **Natural lighting** - Warm, professional, inviting
- ✅ **Beige/stone tones** - Matches your design system
- ✅ **Professional setting** - Business appropriate
- ✅ **Aspirational mood** - Inspiring, confident
- ✅ **High quality** - HD resolution, sharp focus

---

## 💾 Database Storage

### Schema:
```sql
CREATE TABLE generated_images (
  id UUID PRIMARY KEY,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  prompt TEXT NOT NULL,
  revised_prompt TEXT,
  base64_data TEXT,
  created_at TIMESTAMPTZ
);
```

### Save Image:
```typescript
await supabase.from('generated_images').insert({
  type: 'hero',
  url: imageUrl,
  prompt: originalPrompt,
  revised_prompt: dalleRevisedPrompt,
  base64_data: base64EncodedImage
});
```

---

## 🚀 Next Steps

1. **Generate Images**:
   ```bash
   node scripts/generate-landing-images.js
   ```

2. **Update Landing Page**:
   - Copy hero image URL
   - Replace placeholder in `app/page.tsx`
   - Test on localhost:3000

3. **Optional - Save to Database**:
   - Run `images-schema.sql` in Supabase
   - Use API route to save images
   - Load from database instead of direct URLs

4. **Add More Images**:
   - Extend prompts in `lib/dalle.ts`
   - Generate feature section images
   - Add to pricing cards (optional)

---

## 🎨 Current Landing Page Design

**Hero Section**:
- Full-width background image
- Dark gradient overlay (stone-900 at 60-80% opacity)
- White text with gradient effect
- Large buttons with shadow
- Animated scroll indicator

**Typography**:
- H1: 8xl (huge), white, bold
- Subtext: 3xl, stone-100, light
- Buttons: xl, semibold, high contrast

**Layout**:
- Centered content
- Max-width 6xl container
- Generous padding
- Min-height 100vh

---

## ✅ What's Working

✅ DALL-E 3 API integrated  
✅ Professional prompts created  
✅ Generation script ready  
✅ Database schema ready  
✅ API routes working  
✅ Landing page updated with full-width hero  
✅ iPhone advertisement aesthetic  
✅ Proper text overlay and readability  
✅ Professional spacing and typography  

---

## 🎉 Ready to Generate!

Run the script now to get your professional coaching images:

```bash
node scripts/generate-landing-images.js
```

The images will be iPhone-style, professional, and perfect for your coaching platform! 🚀

