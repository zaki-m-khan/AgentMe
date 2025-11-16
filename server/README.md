# Backend Server for AI Avatar Generation

## What This Does

```
User Upload Photo → Frontend → Backend Server → Replicate AI → Avatar Generated → Display
                    (Port 3000)  (Port 3001)      (Cloud)
```

## File Structure

```
server/
└── generate-avatar.js    ← This is the backend server
```

## Code Explanation

```javascript
// 1. User uploads photo in frontend
// 2. Frontend sends POST request with image file
app.post('/api/generate-avatar', upload.single('image'), async (req, res) => {
  
  // 3. Convert image to base64 format
  const base64Image = req.file.buffer.toString('base64');
  
  // 4. Send to Replicate AI
  const output = await replicate.run("fofr/face-to-many", {
    input: {
      image: base64Image,
      prompt: "professional avatar, cartoon style"
    }
  });
  
  // 5. Return generated avatar URL to frontend
  return res.json({ avatarUrl: output });
});
```

## The `/api/generate-avatar` Endpoint

**This is what you needed to update!**

### Before (in UploadPhoto.tsx):
```typescript
const response = await fetch('/api/generate-avatar', {  // ← This wouldn't work
  method: 'POST',
  body: formData,
});
```

### After (updated):
```typescript
const response = await fetch('http://localhost:3001/api/generate-avatar', {  // ← Now points to backend
  method: 'POST',
  body: formData,
});
```

## Why `http://localhost:3001/api/generate-avatar`?

- `http://localhost` - Your local computer
- `3001` - The port the backend runs on
- `/api/generate-avatar` - The endpoint we created

## Environment Variable

The backend needs `REPLICATE_API_TOKEN` to work:

**.env file:**
```bash
REPLICATE_API_TOKEN=r8_abc123xyz...  ← Your actual token from Replicate
```

Without this, the AI won't work!

## Running It

```bash
# Option 1: Just backend
node server/generate-avatar.js

# Option 2: Backend via npm
npm run server

# Option 3: Both frontend + backend
npm run dev:all
```

## Expected Output When Running

```
🚀 Avatar generation server running on http://localhost:3001
📸 POST requests to http://localhost:3001/api/generate-avatar
```

## Testing

```bash
# Test if it's running
curl http://localhost:3001/api/health

# Expected response:
{"status":"ok","message":"Avatar generation API is running"}
```

## When User Uploads Photo

**Console will show:**
```
Generating avatar...
Avatar generated successfully!
```

**Response to frontend:**
```json
{
  "avatarUrl": "https://replicate.delivery/pbxt/abc123.png"
}
```

## Common Issues

### Port 3001 already in use
```bash
# Change in .env
PORT=3002

# Then update frontend to:
http://localhost:3002/api/generate-avatar
```

### Missing API Token
```
Error: REPLICATE_API_TOKEN is required
```
**Fix:** Create `.env` file with your token

### CORS Error
```
Access to fetch at 'http://localhost:3001' has been blocked by CORS
```
**Fix:** Make sure `cors` package is installed and backend is running

## Summary

The line you needed to update was:
```typescript
// FROM THIS:
'/api/generate-avatar'

// TO THIS:
'http://localhost:3001/api/generate-avatar'
```

This tells your frontend where to send the image for AI processing!

