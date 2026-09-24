# SMART MESS 9.2.0 — Official Feature & Security Matrix

## 1. Release Identity
- **Version**: 9.2.0
- **VersionCode**: 602
- **Package**: `com.shakthimess.smartmessv9`
- **Official APK**: `SMART_MESS_9.2.0_OFFICIAL.apk`
- **SHA-256**: `6B9A3FC07CF780BAF663E22A932C40C60BEEC598DAD838627E11B78B7F2E5824`
- **Signer #1 Certificate Digest**: `fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c`

---

## 2. Authentication & Biometric Matrix
| Action | Hardware Enrolled | Hardware Not Enrolled | Hardware Unsupported |
|---|---|---|---|
| **One-Tap Login** | Fingerprint prompt (`Authorize One-Tap Login`) | Blocked (enrollment prompt) | 4-Digit PIN fallback modal |
| **Create Account** | Fingerprint prompt (`Authorize Account Creation`) | Blocked (enrollment prompt) | 4-Digit PIN fallback modal |
| **Forgot Password** | Fingerprint prompt (`Authorize Password Recovery`) | Blocked (enrollment prompt) | 4-Digit PIN fallback modal |
| **Change Password** | Fingerprint prompt (`Authorize Password Change`) | Blocked (enrollment prompt) | 4-Digit PIN fallback modal |
| **Meal Reservation** | Device binding / fingerprint verified | Blocked | 4-Digit PIN fallback |

---

## 3. UI Layout & Login Cards
- **Saved Account Card**: Cleanly presents account identifier, masked password (`••••••••••••`), and single unified `⚡ One-Tap Login` button. Unwanted duplicate/redundant "Sign in with Fingerprint" button above One-Tap Login has been removed.
- **Manual Login Form**: Student & Supervisor tabs, Roll number / Employee ID inputs, password field, Remember Account toggle, and full-width action buttons (Forgot Password, Change Password, Create Account).
- **Settings & Diagnostics**: Configurable backend URL with live ping latency, DB status, and API health testing.

---

## 4. Security Guarantees
1. **Plaintext Passwords**: Zero stored in SQLite, Async Storage, or logs.
2. **Biometric Data**: Zero templates stored by application (hardware-isolated via Android KeyStore / BiometricPrompt).
3. **Offline Biometric Bypass**: Strictly blocked (requires network connectivity or authenticated session).
4. **Role Isolation**: Strict role routing without cross-dashboard leaks.
