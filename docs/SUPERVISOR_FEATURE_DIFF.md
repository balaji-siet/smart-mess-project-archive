# SMART MESS — SUPERVISOR FEATURE DIFFERENCE & RESTORATION PLAN

| Feature | Previous App | Current App | Action |
|---------|--------------|-------------|--------|
| **Supervisor Dashboard Base** | Included Mess Score, Bookings, History | Working | KEEP |
| **Quick Action Navigation Grid** | All tools accessible from Dashboard | Missing in Dashboard JSX | RESTORE UI |
| **Menu Management** | Add, Edit, Delete, Publish daily menu | Screen exists, Not in Navigator | RESTORE ROUTE |
| **Meal Timing & Cutoff Management** | Breakfast/Lunch/Dinner open/close, toggle, SMS logs | Screen exists, Not in Navigator | RESTORE ROUTE |
| **NFC Live Attendance Dashboard** | Real-time WebSocket scan feed | Screen exists, route not linked from Dashboard | RESTORE UI & ROUTE |
| **No-Show / Non-Attending Students** | Absentee filtering by meal/date | Screen exists, route not linked from Dashboard | RESTORE UI & ROUTE |
| **Attendance Reports & Export** | Daily/Weekly/Monthly reports & CSV | Screen exists, route not linked from Dashboard | RESTORE UI & ROUTE |
| **Food Waste Analytics** | Radar efficiency map, waste percentage | Screen exists, route not linked from Dashboard | RESTORE UI & ROUTE |
| **Student Directory** | Searchable student list with XP | Screen missing in current frontend | RESTORE SCREEN & ROUTE |
| **Hostel XP Leaderboard** | Top students leaderboard | Screen missing in current frontend | RESTORE SCREEN & ROUTE |
| **Cutoff Notification Simulator** | Dispatches SMS & logs count | Missing in Dashboard JSX | RESTORE UI & RECONNECT API |
| **Backend NFC Routes** | `/api/nfc/*` endpoints | Missing in `api.js` router | RECONNECT API |
| **Backend Attendance History** | `/api/attendance/history` | Missing in `api.js` router | RECONNECT API |
| **Backend Notification Trigger** | `/api/debug/trigger-notification` | Missing in `api.js` router | RECONNECT API |
| **Diagnostics Screen** | Server health, MongoDB Atlas status | Working in Navigator | NO CHANGE |
| **Secure Remember Login** | Expo SecureStore, One-Tap Login | Working | KEEP |
| **Role Routing Guard** | Strict role normalization | Working | KEEP |
| **Student Dashboard & Reservation** | Full student flow | Working | KEEP |
