# AI Avatar Generation Setup Guide

I've set up the backend for you! Here's how to get it running:

## 📋 What I Changed

1. **Created backend server** in `server/generate-avatar.js`
2. **Updated package.json** with necessary dependencies
3. **Updated frontend** to point to `http://localhost:3001/api/generate-avatar`
4. **Added npm scripts** for easy development

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Backend Dependencies

```bash
npm install
```

This installs:
- `express` - Web server
- `multer` - File upload handling
- `cors` - Allow frontend to talk to backend
- `replicate` - AI image generation
- `concurrently` - Run both servers at once

### Step 2: Get Your Replicate API Token

1. Go to https://replicate.com
2. Sign up for a free account (no credit card required)
3. Go to https://replicate.com/account/api-tokens
4. Copy your API token

### Step 3: Create `.env` File

Create a file called `.env` in the root folder (same level as `package.json`):

```bash
REPLICATE_API_TOKEN=your_token_here
```

Replace `your_token_here` with the token you copied.

---

## ▶️ Running the App

### Option 1: Run Both Servers Together (Recommended)

```bash
npm run dev:all
```

This starts:
- Frontend on http://localhost:3000
- Backend on http://localhost:3001

### Option 2: Run Separately (For Debugging)

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

---

## 🎨 How It Works

1. User uploads a photo
2. Frontend sends image to `http://localhost:3001/api/generate-avatar`
3. Backend uses Replicate's AI to generate an avatar
4. Backend returns the avatar URL
5. Frontend displays the generated avatar

---

## 🧪 Testing the Backend

You can test if the backend is working:

```bash
# In a terminal, run:
curl http://localhost:3001/api/health

# Should return:
# {"status":"ok","message":"Avatar generation API is running"}
```

---

## 🎭 AI Model Used

**Model:** `fofr/face-to-many`
- Converts photos into various avatar styles
- Supports: 3D, cartoon, anime, professional, etc.
- Processing time: ~10-30 seconds

---

## ⚙️ Configuration Options

You can customize the avatar generation in `server/generate-avatar.js`:

```javascript
const output = await replicate.run(
  "fofr/face-to-many:cd3f925f7ab21afaef7d45224790eedbb837eeac40d22e8fefe015489ab644aa",
  {
    input: {
      image: imageDataUrl,
      prompt: "professional avatar, cartoon style, friendly, colorful",
      style: "3d rendered avatar", // Change this!
      negative_prompt: "blurry, low quality, distorted"
    }
  }
);
```

**Style options:**
- `"3d rendered avatar"`
- `"cartoon style"`
- `"anime style"`
- `"professional headshot"`
- `"pixel art"`

---

## 🐛 Troubleshooting

### "Failed to generate avatar"
- Check if backend is running (`npm run server`)
- Check if `.env` file exists with valid token
- Check console for errors

### "CORS error"
- Make sure backend is running on port 3001
- Check that `cors` is installed (`npm install`)

### "Network error"
- Frontend expects backend on `http://localhost:3001`
- Make sure both servers are running

### Backend port already in use
Change the port in `env` file:
```bash
PORT=3002
```

Then update frontend URL in `src/components/UploadPhoto.tsx`:
```typescript
const response = await fetch('http://localhost:3002/api/generate-avatar', {
```

---

## 💰 Cost

Replicate charges per API call:
- First ~$5 of usage is usually free
- After that, face-to-many costs ~$0.10 per generation
- Monitor usage at https://replicate.com/account/billing

---

## 🚢 Deploying to Production

When ready to deploy:

1. **Backend:** Deploy to Railway, Render, or Vercel
2. **Update frontend URL** from `http://localhost:3001` to your deployed URL
3. **Set environment variable** on your hosting platform

Example for deployed backend:
```typescript
const response = await fetch('https://your-backend.railway.app/api/generate-avatar', {
```

---

## 📝 Summary

**To start developing:**
```bash
# 1. Install dependencies
npm install

# 2. Create .env file with your Replicate token
echo "REPLICATE_API_TOKEN=your_token_here" > .env

# 3. Run both servers
npm run dev:all
```

Now upload a photo and watch the magic happen! 🎉

