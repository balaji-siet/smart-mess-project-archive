# SRI Shakthi Smart Mess – Hostel Mess Management System

A comprehensive hostel mess management system aimed at reducing food waste and improving meal planning. It features time-restricted student reservations, live supervisor dashboards, automated cutoff notifications, and AI-powered attendance demand forecasting.

---

## 📂 Project Structure

```
smart-mess-project/
├── database/                   # Database files
│   ├── schema.sql              # Database table definitions
│   └── seeds.sql               # Base testing data seeds
├── backend/                    # Express REST API Server
│   ├── src/
│   │   ├── config/db.js        # Database connector (MySQL + SQLite fallback)
│   │   ├── middleware/auth.js  # JWT and Admin authorization
│   │   ├── controllers/        # Express handlers (Auth, Reservations, Metrics)
│   │   ├── services/           # Notifications cron scheduler (Nodemailer)
│   │   └── server.js           # Server startup script
│   ├── package.json
│   └── .env
├── frontend/                   # Expo React Native App (TypeScript)
│   ├── src/
│   │   ├── context/            # AuthContext (JWT & AsyncStorage config)
│   │   ├── navigation/         # AppNavigator (Role-based stacks)
│   │   └── screens/            # Login, Register, Home, Reservation, Supervisor Dashboard
│   ├── App.tsx                 # Root React entry (Web phone mockup wrapper)
│   ├── app.json
│   ├── tsconfig.json
│   └── package.json
└── ai/                         # AI Forecasting Module (Python)
    ├── requirements.txt        # PIP dependencies
    ├── generate_historical_data.py  # Populates 60 days of historical aggregates
    └── forecast.py             # Feature engineering & regression model training
```

---

## ⚡ Database Dual-Mode Design
To allow instant local review and testing:
- **MySQL Mode**: If `DB_HOST`, `DB_USER`, and `DB_NAME` are uncommented and filled in `backend/.env`, the system will connect using `mysql2`.
- **SQLite Mode (Fallback)**: If no MySQL credentials are found, the backend automatically initializes a local SQLite file in `database/smart_mess.db` and loads the schemas and base seeds automatically on start. **No database setup is required to run out of the box.**

---

## ⚙️ Quick Start Guide

Follow these steps in sequence to run and test the complete system:

### 1. Start the Backend Server
First, navigate to the `backend` folder, install the packages, and run the server:
```bash
cd backend
npm install
npm start
```
*The server will start at [http://localhost:5000](http://localhost:5000). On SQLite mode, it will generate the DB and base credentials.*

### 2. Prepare the AI Forecasting Module
Before running the AI forecasts, populate the DB with mock historical data and train the machine learning models.
1. Open a new terminal in the `ai` folder and install dependencies:
   ```bash
   cd ai
   python -m pip install -r requirements.txt
   ```
2. Seed the 60-day historical attendance aggregates:
   ```bash
   python generate_historical_data.py
   ```
3. Run the AI forecasting module to predict tomorrow's attendance and save it to the DB:
   ```bash
   python forecast.py
   ```
   *You should see predicted counts for Breakfast, Lunch, and Dinner printed in the console.*

### 3. Launch the Frontend Application
We have styled the React Native Expo app to compile and run directly in your web browser (Expo Web) for review, rendered inside a phone container mockup.
1. In a new terminal, navigate to the `frontend` folder:
   ```bash
   cd frontend
   npm install
   npm run web
   ```
2. Your browser will automatically open [http://localhost:8081](http://localhost:8081) (or similar port).

---

## 🔑 Demo Login Credentials
To simplify review, we have added **Quick Access Autofill** buttons on the Login Screen:
- **Student Profile**:
  - **Roll Number**: `RA1001`
  - **Password**: `Secret123`
- **Supervisor Profile**:
  - **Roll Number**: `admin`
  - **Password**: `shakthi_mess_supervisor_token_xyz`

---

## 🍳 Verification Features in UI

- **Developer Bypass Switch** (Meal Reservation Screen): Since reservation windows are time-locked, toggle this switch on the reservation screen to unlock all breakfasts, lunches, and dinners immediately for editing and submitting.
- **Cutoff Notification Simulator** (Supervisor Dashboard): Dials the backend `/api/debug/trigger-notification` route. Select any meal type and date, click the trigger button, and the system will compile counts, schedule emails, and output the generated email structure directly onto the dashboard screen (and print in the backend console).
