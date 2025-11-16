# 🚀 Quick Start - Get Avatar Generation Working in 3 Steps

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Get Replicate API Token

1. Go to: **https://replicate.com/account/api-tokens**
2. Sign up (it's free!)
3. Copy your API token

## Step 3: Create `.env` File

Create a file named `.env` in the project root and paste:

```bash
REPLICATE_API_TOKEN=paste_your_token_here
```

---

## ▶️ Run the App

```bash
npm run dev:all
```

This starts BOTH:
- ✅ Frontend: http://localhost:3000
- ✅ Backend: http://localhost:3001

---

## 🎉 That's It!

Open http://localhost:3000 in your browser and upload a photo!

---

## 📖 Need More Help?

- Full setup guide: `SETUP-AVATAR-API.md`
- Backend explanation: `server/README.md`
- API options: `api-setup-guide.md`

---

## 🐛 Not Working?

1. **Check backend is running:**
   ```bash
   curl http://localhost:3001/api/health
   ```
   Should return: `{"status":"ok"}`

2. **Check `.env` file exists and has your token**

3. **Check both terminals are running** (frontend + backend)

---

## What Changed?

I updated this line in `src/components/UploadPhoto.tsx`:

**Before:**
```typescript
fetch('/api/generate-avatar', ...)  // ❌ Doesn't work
```

**After:**
```typescript
fetch('http://localhost:3001/api/generate-avatar', ...)  // ✅ Works!
```

This tells the frontend to send images to your local backend server, which then uses Replicate AI to generate the avatar.

