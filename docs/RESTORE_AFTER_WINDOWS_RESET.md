# SMART MESS — Complete Project Restoration Guide
## Restoration Procedure for Fresh Windows Installation

This document contains step-by-step instructions to restore and resume the entire **SMART MESS** ecosystem after resetting your Windows machine.

---

## 1. Project Root & Directory Structure

On your fresh Windows installation, create the base project folder:
```powershell
New-Item -ItemType Directory -Path "C:\Users\mkkni\OneDrive\Desktop\project" -Force
cd "C:\Users\mkkni\OneDrive\Desktop\project"
```

The recommended directory structure matches the pre-reset layout:
```text
C:\Users\mkkni\OneDrive\Desktop\project\
├── backend\                           # Express / MongoDB API server
├── frontend-old-ui-secure\            # Production / Current Old UI Frontend (React Native / Expo)
├── frontend\                          # Protected Hardened New UI Frontend
├── SMART-MESS-PROJECT-ARCHIVE\        # Operational docs, impact CSVs, release metadata, website
└── RESTORE_AFTER_WINDOWS_RESET.md     # This restore manual
```

---

## 2. GitHub Repositories & Required Branches

Clone the remote repositories from GitHub account `balaji-siet`:

### A. Backend API Repository
```powershell
cd "C:\Users\mkkni\OneDrive\Desktop\project"
git clone https://github.com/balaji-siet/BAVA-backend.git backend
cd backend
git checkout main
```
- **Repository URL**: `https://github.com/balaji-siet/BAVA-backend.git`
- **Active Branch**: `main`
- **Latest Safe Backup Commit**: `cedca8d01e683e277322ca39f74448de203f4256` (`backup: preserve SMART MESS backend before laptop reset`)
- **Secondary Branch**: `codex/official-release-hardening` (`8b7f46947b9f87a183392142e03dce9fa4958cc8`)

### B. Production Frontend (Old UI Secure)
```powershell
cd "C:\Users\mkkni\OneDrive\Desktop\project"
git clone https://github.com/balaji-siet/smart-mess-frontend-old-ui-secure.git frontend-old-ui-secure
cd frontend-old-ui-secure
git checkout feature/old-ui-fingerprint-reservation
```
- **Repository URL**: `https://github.com/balaji-siet/smart-mess-frontend-old-ui-secure.git`
- **Active Branch**: `feature/old-ui-fingerprint-reservation`
- **Latest Safe Backup Commit**: `c30e5bba24ea2181e9e8ae0836c62feaae7819d3` (`backup: preserve SMART MESS frontend before laptop reset`)
- **Other Branches Preserved on GitHub**:
  - `master`
  - `codex/official-release-hardening`
  - `restore/old-ui-clean`
  - `codex/fingerprint-source-restoration`
  - `codex/full-kinetic-zero-ui`
  - `codex/stitch-ui-redesign`
  - `release/kinetic-zero-official-rc`
  - `release/kinetic-zero-official-rc-hardened`

### C. Protected New UI Frontend
```powershell
cd "C:\Users\mkkni\OneDrive\Desktop\project"
git clone https://github.com/balaji-siet/smart-mess-frontend-new-ui.git frontend
cd frontend
git checkout codex/official-release-hardening
```
- **Repository URL**: `https://github.com/balaji-siet/smart-mess-frontend-new-ui.git`
- **Protected Branch**: `codex/official-release-hardening`
- **Protected HEAD Commit**: `36ae74c6655a79878dc6df3b7a14adae713d4ef1` (`chore(android): configure official release signing`)

### D. Project Documentation, Impact Data & Metadata Archive
```powershell
cd "C:\Users\mkkni\OneDrive\Desktop\project"
git clone https://github.com/balaji-siet/smart-mess-project-archive.git SMART-MESS-PROJECT-ARCHIVE
```
- **Repository URL**: `https://github.com/balaji-siet/smart-mess-project-archive.git`
- **Branch**: `main`
- **Contents**: Full docs (`Jury QA`, `Supervisor Guide`, `Student Support`), `SMART_MESS_IMPACT_DATA.csv`, all release checklists, SHA256 checksums, and old UI website export.

---

## 3. Toolchain & Environment Requirements

### Required Runtimes:
1. **Node.js**:
   - Recommended: Node.js 20 LTS or Node.js 24 LTS (`node --version`)
   - Package manager: npm (`npm --version`)
2. **Java Development Kit (JDK)**:
   - Required: **OpenJDK Temurin 17 (17.0.x)**
   - Set environment variable: `JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.x.x-hotspot`
   - Add `%JAVA_HOME%\bin` to system `PATH`
3. **Android Studio & SDK**:
   - Install Android Studio Ladybug / Koala
   - Install Android SDK Platform 34 & 35
   - Install Android SDK Build-Tools `34.0.0`
   - Install Android SDK Command-line Tools (`cmdline-tools;latest`)
   - Install Android SDK Platform-Tools (`adb`)
   - Set environment variables:
     - `ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk`
     - Add `%ANDROID_HOME%\platform-tools` to `PATH`
     - Add `%ANDROID_HOME%\cmdline-tools\latest\bin` to `PATH`
4. **Git for Windows**:
   - Ensure Git credential manager is enabled (`git-credential-manager`)

---

## 4. Keystore & Signing Material Restoration

> [!CRITICAL]
> The official Android release keystore was NOT uploaded to public Git to protect app identity and update security.
> Restore `smartmess-official-release.jks` and `smartmess-release-signing.properties` from your **secure offline backup** (encrypted USB drive or password vault).

1. Re-create the user signing directory:
   ```powershell
   New-Item -ItemType Directory -Path "$HOME\.smartmess\signing" -Force
   ```
2. Copy `smartmess-official-release.jks` into:
   `C:\Users\<YourUser>\.smartmess\signing\smartmess-official-release.jks`
   - **Expected Keystore SHA-256**: `298273D85CD20F8F71DC14B150D4908DF99ACFB81D28CE917F5CCFCE68B2BC68`
3. Copy `smartmess-release-signing.properties` into:
   `C:\Users\<YourUser>\.smartmess\signing\smartmess-release-signing.properties`
   Structure of this file:
   ```properties
   SMARTMESS_STORE_FILE=C\:/Users/<YourUser>/.smartmess/signing/smartmess-official-release.jks
   SMARTMESS_STORE_PASSWORD=<restore from secure secret backup>
   SMARTMESS_KEY_ALIAS=<restore from secure secret backup>
   SMARTMESS_KEY_PASSWORD=<restore from secure secret backup>
   ```

---

## 5. Backend Restoration & Startup

### Step 1: Install Dependencies
```powershell
cd "C:\Users\mkkni\OneDrive\Desktop\project\backend"
npm install
```

### Step 2: Configure Environment (`.env`)
Create `.env` file in `C:\Users\mkkni\OneDrive\Desktop\project\backend\.env`:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=<restore from secure secret backup (MongoDB Atlas Connection URI)>
JWT_SECRET=<restore from secure secret backup>
UV_THREADPOOL_SIZE=16
MONGO_MAX_POOL_SIZE=50
```

> [!NOTE]
> The production backend is continuously deployed on **Render**:
> - **Production API**: `https://bava-backend.onrender.com/api`
> - **Health Check**: `https://bava-backend.onrender.com/api/health`
> - Secrets are already stored securely in Render service environment settings.

### Step 3: Run Backend Locally
```powershell
# Development mode:
npm run dev

# Production / Cluster mode with PM2:
npx pm2 start ecosystem.config.js
```

---

## 6. Frontend Restoration & Startup

### Step 1: Install Dependencies
```powershell
cd "C:\Users\mkkni\OneDrive\Desktop\project\frontend-old-ui-secure"
npm install
```

### Step 2: Configure Frontend Environment
If testing against local backend, configure `.env.local` or environment variable:
```env
EXPO_PUBLIC_API_URL=https://bava-backend.onrender.com/api
```
*(Default fallback in code automatically points to `https://bava-backend.onrender.com/api`)*

### Step 3: Start Expo Development Server
```powershell
# Start Metro bundler:
npx expo start --clear

# Start Web preview:
npm run web
```

### Step 4: Build Official Release APK
```powershell
cd "C:\Users\mkkni\OneDrive\Desktop\project\frontend-old-ui-secure\android"
.\gradlew assembleRelease
```
- **Output APK**: `android\app\build\outputs\apk\release\app-release.apk`
- **Application ID / Package**: `com.shakthimess.smartmessv9`

---

## 7. Verification Checklist After Setup

1. **Verify Backend Health**:
   ```powershell
   Invoke-RestMethod -Uri "https://bava-backend.onrender.com/api/health"
   ```
2. **Verify Frontend Bundle**:
   ```powershell
   npx expo export:embed --platform android --dev false
   ```
3. **Verify Git Remotes**:
   ```powershell
   git status
   git remote -v
   ```
4. **Verify Release Hashes**:
   Compare newly built APK against official historical releases in `SMART-MESS-PROJECT-ARCHIVE\release-metadata\`.
