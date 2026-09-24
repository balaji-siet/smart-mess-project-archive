# SMART MESS — LIVE DEMONSTRATION CHECKLIST

Use this step-by-step checklist to execute a flawless live demonstration of SMART MESS.

---

## Pre-Demo Setup

1. **Start MongoDB:** Ensure MongoDB service/daemon is running locally.
2. **Start Node Backend:** Run backend server (`npm start` or Node process in `backend/`).
3. **Check Health Endpoint:** Verify `http://localhost:5000/health` returns `{"status":"ok","db":"connected"}`.
4. **Open SMART MESS:** Launch the release APK on Android emulator or physical device.

---

## Demonstration Sequence

- [ ] **Step 1:** On the login screen, enter Student credentials and perform manual Student login.
- [ ] **Step 2:** Display the **Student Dashboard** with points, user greeting, and meal summary.
- [ ] **Step 3:** Navigate to **Today's Menu** and showcase daily meal timings and menu items.
- [ ] **Step 4:** Create a meal reservation for an upcoming meal slot.
- [ ] **Step 5:** Navigate to **Reservation History** to show the newly booked reservation confirmed.
- [ ] **Step 6:** Enable **Remember Account** & **Fingerprint Login** for Student in Settings/Profile.
- [ ] **Step 7:** Tap **Logout** and verify the login screen displays the remembered Student account.
- [ ] **Step 8:** Tap **🔒 Login with Fingerprint** and authenticate to demonstrate instant biometric unlock into Student Dashboard.
- [ ] **Step 9:** Tap **Logout** to return to the Login screen.
- [ ] **Step 10:** Enter Supervisor credentials and perform manual Supervisor login.
- [ ] **Step 11:** Display the **Supervisor Dashboard** (highlight that 0 redirects to Student Dashboard occur).
- [ ] **Step 12:** Navigate to **Menu Management** and show how dishes and categories are managed.
- [ ] **Step 13:** Navigate to **Attendance Tracking** to show dining room check-in logs.
- [ ] **Step 14:** Open **Reports & Analytics** to demonstrate food wastage metrics and cost graphs.
- [ ] **Step 15:** Tap **Logout** to return to the login screen.

---

## Offline-First Demonstration

- [ ] **Step 16:** **Simulate Outage:** Stop the Node backend server (or disconnect network).
- [ ] **Step 17:** Open SMART MESS (or refresh dashboard) — show that the **Offline Banner** appears and cached menu/profile data is loaded from local SQLite cache.
- [ ] **Step 18:** As a Student, book an upcoming meal while offline.
- [ ] **Step 19:** Point out the **PENDING SYNC** indicator confirming the reservation is stored in local SQLite storage.
- [ ] **Step 20:** **Restore Backend:** Restart the Node backend server.
- [ ] **Step 21:** Observe the client automatically detect network restoration, transition status to **SYNCING**, and complete server confirmation (**SYNCED**).
- [ ] **Step 22:** Refresh reservation list to show live server confirmation with zero duplicates.
- [ ] **Step 23:** *(Optional)* As a Supervisor offline, show that the dashboard is readable from cache but configuration mutations are blocked with `"This action requires connection to the SMART MESS server."`

---

## Demo Complete
- All core features, biometric flows, offline resilience, and automatic synchronization successfully demonstrated.
