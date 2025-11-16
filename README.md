
  # AgentMe MVP Screens Design

  This is a code bundle for AgentMe MVP Screens Design. The original project is available at https://www.figma.com/design/GX3iufYzHADp2FqOFQ28qr/AgentMe-MVP-Screens-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Building native shells with Capacitor

1. Install the native tooling you need (Android Studio for Android, Xcode for iOS/macOS).
2. Install project dependencies: `npm install`.
3. Build the web bundle and sync to native projects:
   - **Recommended:** `npm run cap:build` (builds and syncs in one command, works on all platforms)
   - Or separately: `npm run build` then `npm run cap:sync`
   - Note: On Windows PowerShell, use `;` instead of `&&` if running commands separately, or just use `npm run cap:build`
4. Add the platforms once per machine:
   - `npx cap add android`
   - `npx cap add ios`
5. Keep the native projects updated whenever web code changes:
   - `npm run cap:build` (builds and syncs)
   - `npm run cap:sync` (only syncs, assumes build already done)
   - `npm run cap:copy` (only copies fresh build output if a full sync isn't needed)
6. Open the native IDEs from scripts:
   - Android Studio: `npm run cap:open:android`
   - Xcode: `npm run cap:open:ios`
7. Build and run from the respective IDE or via CLI (`npx cap run android`, etc.). Use Android Studio/Xcode simulators or connected devices to test.

**Tip:** during development you can keep `npm run dev` running and use Capacitor's live reload: `npx cap run android --livereload --external --target <device>`.

## Getting the App on Your Phone (Android)

Since you're on Windows, you can build for Android. Here's how to get it on your phone:

### Prerequisites
1. **Install Android Studio** from https://developer.android.com/studio
2. **Enable USB Debugging** on your Android phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times to enable Developer Options
   - Go to Settings → Developer Options → Enable "USB Debugging"

### Steps to Get App on Phone

1. **Add Android platform** (one-time setup):
   ```bash
   npx cap add android
   ```

2. **Build and sync your app**:
   ```bash
   npm run cap:build
   ```

3. **Open Android Studio**:
   ```bash
   npm run cap:open:android
   ```

4. **In Android Studio**:
   - Wait for Gradle sync to finish (first time may take a few minutes)
   - Connect your phone via USB (make sure USB debugging is enabled)
   - Your phone should appear in the device dropdown at the top
   - Click the green "Run" button (▶️) or press `Shift+F10`
   - The app will build and install on your phone automatically

### Alternative: Build APK to Transfer

If you prefer to build an APK file you can transfer manually:

1. In Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Wait for build to complete
3. Click "locate" in the notification to find the APK file
4. Transfer the APK to your phone and install it (you may need to enable "Install from Unknown Sources" in your phone settings)

### Quick Development with Live Reload

For faster development, you can use live reload:
1. Keep `npm run dev` running in one terminal
2. In another terminal: `npx cap run android --livereload --external`
3. This will open Android Studio and allow you to see changes instantly

## Getting the App on Your iPhone (iOS)

**⚠️ Important:** iOS development requires **macOS and Xcode**, which cannot run on Windows. You'll need access to a Mac to build for iOS.

### Options if you're on Windows:
1. **Use a Mac** (physical Mac, MacBook, or Mac Mini)
2. **Cloud Mac services** (MacStadium, AWS EC2 Mac instances, GitHub Actions with macOS runners)
3. **Borrow/use a friend's Mac** temporarily

### Sharing the Project with a Friend (Mac User)

**For you (on Windows):** Share the project folder with your friend. You can:
- **Option 1: Git** (recommended): Push to GitHub/GitLab and have them clone it
- **Option 2: Zip file**: Create a zip of the project folder (exclude `node_modules` and `build` folders to keep it small)
- **Option 3: Cloud storage**: Upload to Google Drive, Dropbox, etc.

**Files to include:**
- All source files (`src/`, `index.html`, `package.json`, `vite.config.ts`, `capacitor.config.ts`, etc.)
- `README.md` (this file)

**Files to exclude** (they'll be regenerated):
- `node_modules/` (will be installed with `npm install`)
- `build/` (will be generated with `npm run build`)
- `android/` (if it exists, not needed for iOS)
- `.git/` (if using Git, this is fine)

**For your friend (on Mac):** Once they have the project:

1. **Navigate to the project folder** in Terminal:
   ```bash
   cd /path/to/project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Follow the iOS steps below** starting from "Add iOS platform"

### Prerequisites (on macOS)
1. **Install Xcode** from the Mac App Store (free, but large download ~10GB+)
2. **Install Xcode Command Line Tools**: Open Terminal and run `xcode-select --install`
3. **CocoaPods** (usually auto-installed with Xcode, but if needed: `sudo gem install cocoapods`)

### Steps to Get App on iPhone

1. **Add iOS platform** (one-time setup, run on Mac):
   ```bash
   npx cap add ios
   ```

2. **Build and sync your app**:
   ```bash
   npm run cap:build
   ```

3. **Open Xcode**:
   ```bash
   npm run cap:open:ios
   ```

4. **In Xcode**:
   - Wait for the project to load (first time may take a minute)
   - Select your iPhone from the device dropdown (top toolbar, next to the scheme selector)
   - **Sign the app** (required for physical devices):
     - Click on the project name in the left sidebar
     - Select the "Signing & Capabilities" tab
     - Check "Automatically manage signing"
     - Select your Apple ID team (or create a free Apple Developer account)
   - Click the "Play" button (▶️) or press `Cmd+R`
   - The app will build and install on your iPhone

### For iOS Simulator (Testing without Physical Device)

1. Open Xcode: `npm run cap:open:ios`
2. Select an iOS Simulator from the device dropdown (e.g., "iPhone 15 Pro")
3. Click Run (▶️) - no signing needed for simulator

### Quick Development with Live Reload

For faster development:
1. Keep `npm run dev` running in one terminal
2. In another terminal: `npx cap run ios --livereload --external`
3. This will open Xcode and allow you to see changes instantly

### Troubleshooting iOS

- **"No signing certificate"**: You need to sign in with an Apple ID in Xcode (Settings → Accounts)
- **"Device not trusted"**: On your iPhone, go to Settings → General → VPN & Device Management → Trust your developer certificate
- **Build errors**: Make sure CocoaPods dependencies are installed: `cd ios && pod install`

  