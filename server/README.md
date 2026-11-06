# Zippy Loan Connector – Backend REST API Service

Enterprise REST API and Database Engine for **Zippy ICICI Loan Connector** (`zippyloanconnector2@gmail.com` | `+91 63026 90251`).

---

## Quick Start (Local Setup)

### 1. Prerequisites
- Node.js `v20.0.0+` (tested and verified on Node `v24.x`)
- npm `v10+`

### 2. Installation
From the root project directory:
```bash
cd server
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default configuration uses zero-config SQLite (`./data/zippy_loans.db`), requiring no external database installation.

### 4. Run Development Server
```bash
npm run dev
```
The API server starts on `http://localhost:5000`.

### 5. Run Automated Tests
```bash
npm test
# Or: node test/api.test.js
```

### 6. Build for Production
```bash
npm run build
npm start
```

---

## Folder Structure

```
server/
├── data/                             # SQLite database storage (auto-created)
├── migrations/
│   └── 001_create_loan_enquiries.sql # Standard SQL DDL migration schema
├── src/
│   ├── controllers/
│   │   ├── enquiryController.ts      # Validates & processes loan enquiries
│   │   └── healthController.ts       # Health check & database metrics
│   ├── middleware/
│   │   ├── errorHandler.ts           # Centralized HTTP error handler
│   │   ├── rateLimiter.ts            # Protects against DoS / brute force
│   │   └── requestLogger.ts          # Privacy-conscious logging (masks PII)
│   ├── routes/
│   │   ├── enquiryRoutes.ts          # Routes for /api/v1/loan-enquiries
│   │   └── healthRoutes.ts           # Routes for /api/v1/health
│   ├── utils/
│   │   ├── referenceGenerator.ts     # Generates ZIP-YYYYMMDD-XXXX
│   │   └── sanitize.ts               # Input sanitization & cleaning
│   ├── app.ts                        # Express application configuration
│   ├── database.ts                   # Database connection & parameterized queries
│   └── server.ts                     # Server entrypoint with graceful shutdown
├── test/
│   └── api.test.js                   # Automated integration test suite
├── .env.example                      # Configuration template (placeholders only)
├── API_DOCUMENTATION.md              # Detailed API specification & curl examples
├── package.json
└── tsconfig.json
```
