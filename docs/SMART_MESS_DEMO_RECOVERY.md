# SMART MESS — EMERGENCY DEMONSTRATION RECOVERY GUIDE

Keep this guide ready during live presentations for quick troubleshooting.

> **CRITICAL RULE:** Do NOT modify application source code, rebuild APK, or upgrade packages during demo recovery.

---

## 1. If Backend Does Not Start
1. Check if port 5000 is occupied: `netstat -ano | findstr 5000`
2. Verify MongoDB service is active.
3. Start backend: `node server.js` (inside `backend/` directory).
4. Verify health endpoint: `curl http://localhost:5000/health` (must return HTTP 200).

---

## 2. If Android Emulator Does Not Start
1. Run `adb devices` to check current daemon status.
2. Launch emulator:
   ```bash
   emulator -avd SmartMessEmulator -no-boot-anim -gpu swiftshader_indirect
   ```
3. Wait for boot completion: `adb wait-for-device shell "getprop sys.boot_completed"`
4. Launch SMART MESS:
   ```bash
   adb shell am start -n com.shakthimess.smartmessv9/.MainActivity
   ```

---

## 3. If App Cannot Reach Laptop Backend
- **On Android Emulator:** Use `http://10.0.2.2:5000` (Android default alias to host loopback).
- **On Physical Android Phone:**
  - Connect laptop and phone to the same Wi-Fi or mobile hotspot.
  - Determine laptop LAN IP: `ipconfig` (e.g. `192.168.1.50`).
  - Use `http://<LAPTOP_LAN_IP>:5000`.
  - **Never** use `10.0.2.2` or `localhost` on a physical phone.

---

## 4. If Public Internet Fails
- SMART MESS operates in full capability over local Wi-Fi / LAN without public internet connection (`LOCAL_NETWORK` mode).
- Public internet is **not** required when the laptop backend is reachable over the local network.

---

## 5. If Backend Becomes Temporarily Unavailable
- SMART MESS automatically switches to **Offline Cached Mode**.
- Previously synced menus and profile data remain visible from local SQLite cache.
- Student reservations/cancellations can continue to be queued locally with status **PENDING SYNC**.
- Once the backend is restarted, automatic synchronization pushes all queued actions to the server.
