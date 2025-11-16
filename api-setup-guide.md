# AI Avatar Generation API Setup Guide

The app is now configured to generate AI avatars from uploaded photos. You need to set up a backend API endpoint to handle the image generation.

## Option 1: Replicate API (Recommended - Easy to use)

### Setup:
1. Sign up at https://replicate.com
2. Get your API token
3. Create a backend endpoint (Node.js example):

```javascript
// api/generate-avatar.js (or your backend framework)
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body; // base64 or URL
    
    const output = await replicate.run(
      "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
      {
        input: {
          img: image,
          version: "v1.4",
          scale: 2
        }
      }
    );
    
    // Or use avatar generation model
    // "fofr/face-to-many:cd3f925f7ab21afaef7d45224790eedbb837eeac40d22e8fefe015489ab644aa"
    
    return res.status(200).json({ avatarUrl: output });
  } catch (error) {
    console.error('Avatar generation error:', error);
    return res.status(500).json({ error: 'Failed to generate avatar' });
  }
}
```

## Option 2: Stability AI (High Quality)

```javascript
import fetch from 'node-fetch';

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

export default async function handler(req, res) {
  const formData = new FormData();
  formData.append('init_image', req.files.image);
  formData.append('init_image_mode', 'IMAGE_STRENGTH');
  formData.append('image_strength', 0.35);
  formData.append('text_prompts[0][text]', 'professional avatar, cartoon style, friendly');
  formData.append('cfg_scale', 7);
  formData.append('samples', 1);
  formData.append('steps', 30);

  const response = await fetch(
    'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STABILITY_API_KEY}`,
      },
      body: formData,
    }
  );

  const data = await response.json();
  const imageBase64 = data.artifacts[0].base64;
  
  return res.json({ avatarUrl: `data:image/png;base64,${imageBase64}` });
}
```

## Option 3: OpenAI DALL-E (Easiest)

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    // First, upload the image
    const imageFile = req.files.image;
    
    // Generate variation (or use edit endpoint with mask)
    const response = await openai.images.createVariation({
      image: imageFile,
      n: 1,
      size: "512x512",
    });

    return res.json({ avatarUrl: response.data[0].url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

## Option 4: Hugging Face (Free)

```javascript
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export default async function handler(req, res) {
  try {
    const imageBuffer = req.files.image.buffer;
    
    const blob = await hf.imageToImage({
      model: 'timbrooks/instruct-pix2pix',
      inputs: imageBuffer,
      parameters: {
        prompt: 'professional avatar, cartoon style, friendly, colorful',
      }
    });

    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    
    return res.json({ avatarUrl: `data:image/png;base64,${base64}` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

## Frontend Configuration

Update the API endpoint in `src/components/UploadPhoto.tsx`:

```typescript
const response = await fetch('YOUR_API_ENDPOINT_HERE/api/generate-avatar', {
  method: 'POST',
  body: formData,
});
```

## Environment Variables

Create a `.env` file:

```bash
# Choose one based on your provider
REPLICATE_API_TOKEN=your_token_here
STABILITY_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
HUGGINGFACE_API_KEY=your_key_here
```

## Testing Without API (Development)

For testing, the current code will fallback to showing the original uploaded image if the API fails.

## Recommended Quick Start

1. Use **Replicate** for fastest setup (no credit card required for testing)
2. Use the "face-to-many" model for avatar generation
3. Deploy backend to Vercel/Netlify/Railway for free

## Models to Try on Replicate

- `fofr/face-to-many` - Multiple avatar styles
- `tencentarc/gfpgan` - Face enhancement
- `sczhou/codeformer` - Face restoration
- `batouresearch/magic-avatar-generator` - Avatar generation

