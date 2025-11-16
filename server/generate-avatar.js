// Simple Express server for AI avatar generation
// Run with: node server/generate-avatar.js

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const Replicate = require('replicate');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS for your frontend
app.use(cors());
app.use(express.json());

if (!process.env.REPLICATE_API_TOKEN) {
  console.warn('⚠️  REPLICATE_API_TOKEN is not set. Avatar generation will fail until you add it to .env');
}

// Initialize Replicate with your API token
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, // Set this in .env file
});

const MODEL =
  'fofr/face-to-many:cd3f925f7ab21afaef7d45224790eedbb837eeac40d22e8fefe015489ab644aa';

const extractAvatarUrl = (output) => {
  if (!output) return null;

  if (typeof output === 'string') {
    return output;
  }

  if (Array.isArray(output)) {
    for (const item of output) {
      if (!item) continue;
      if (typeof item === 'string') {
        return item;
      }
      if (item.image) {
        return item.image;
      }
      if (item.output && Array.isArray(item.output)) {
        const nested = extractAvatarUrl(item.output);
        if (nested) return nested;
      }
    }
  }

  if (typeof output === 'object') {
    if (output.image) return output.image;
    if (output.images && Array.isArray(output.images)) {
      const nested = extractAvatarUrl(output.images);
      if (nested) return nested;
    }
    if (output.output) {
      return extractAvatarUrl(output.output);
    }
  }

  return null;
};

// Avatar generation endpoint
app.post('/api/generate-avatar', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    console.log('🖼️  Uploading source photo to Replicate…');
    const uploadedImage = await replicate.files.upload(req.file.buffer, {
      filename: req.file.originalname || 'upload.png',
      contentType: req.file.mimetype,
    });

    console.log('✨ Generating avatar with Replicate model…');

    const input = {
      image: uploadedImage,
      prompt: req.body.prompt || 'professional avatar, cartoon style, friendly, colorful lighting',
      style: req.body.style || '3d rendered avatar',
      creativity: 0.35,
      guidance: 8,
      negative_prompt: 'blurry, low quality, distorted, disfigured',
    };

    const output = await replicate.run(MODEL, { input });
    console.log('✅ Replicate output received');
    console.debug('Replicate raw output (truncated):', JSON.stringify(output)?.slice(0, 500) + '...');

    const avatarUrl = extractAvatarUrl(output);

    if (!avatarUrl) {
      console.error('Could not parse avatar URL from Replicate response');
      return res.status(502).json({
        error: 'Could not parse avatar response',
        details: output,
      });
    }

    return res.json({ avatarUrl });
  } catch (error) {
    console.error('Avatar generation error:', error);
    return res.status(500).json({
      error: 'Failed to generate avatar',
      details: error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Avatar generation API is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Avatar generation server running on http://localhost:${PORT}`);
  console.log(`📸 POST requests to http://localhost:${PORT}/api/generate-avatar`);
});

