# QueueStorm Investigator Subsystem - Assignment 3

![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Thunder_Client](https://img.shields.io/badge/Thunder__Client-v2.x-732FDE?style=for-the-badge&logo=thunderclient&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

This project is a production-grade automated dispute resolution and fraud detection rule engine built with Node.js and Express. It parses unstructured customer ticket complaints, reconciles them safely against ledger historical logs, catches adversarial prompt injections, and enforces schema compliance. Developed as part of the SUST CSE Carnival 2026 Hackathon.

## 🚀 Features
* **Strict Structural Sanitization**: Automatic stripping of credential targets (PIN/OTP) to prevent critical information leakage.
* **Deterministic Taxonomy Mapping**: Ensures strict enum fallback strategies to protect runtime pipelines against `500 Internal Server Error` crashes.
* **Outbound Data Casting**: Guaranteed standard conversions for precision-bound floats (`confidence`) and native boolean parameters.

## 🔄 System Execution Flow

The engine handles incoming requests deterministically through the following lifecycle:

```text
  [ Incoming HTTP Request ] 
             │
             ▼
     ┌───────────────┐
     │   index.js    │ ──► Express HTTP Router handles routing and request entry
     └───────────────┘
             │
             ▼
     ┌───────────────┐
     │  schemas.js   │ ──► Validates request payload structure & sanitizes malicious inputs
     └───────────────┘
             │
             ▼
     ┌───────────────┐
     │investigator.js│ ──► Core engine matching engine cross-checks ledger history logs
     └───────────────┘
             │
             ▼
     ┌───────────────┐
     │  aiEngine.js  │ ──► AI evaluation interfaces with language layer models 
     └───────────────┘
             │
             ▼
  [ 200 OK Structured JSON Payload Response Passed ]
```

1. Routing Layer (src/index.js): 
   Captures inbound POST requests at /analyze-ticket and parses the JSON body middleware.

2. Sanitization Filter (src/schemas.js): 
   Scans text for security vulnerabilities, scrubs password/PIN requests, and enforces default fallbacks to prevent 500 server crashes.

3. Core Rules Logic (src/investigator.js): 
   Cross-references tracking logs with transaction history elements to match individual ids and evaluate ticket validity.

4. AI Parsing Gateway (src/aiEngine.js): 
   Evaluates unstructured context values into rigorous data parameters (severity, confidence) matching outbound specifications.

## 📡 API Endpoints
* **GET** `/health` - Service operational availability check.
* **POST** `/analyze-ticket` - Evaluates inbound complaints, matches transaction history, and issues standardized replies.

## 📸 Thunder Client Testing Results

| Action / Endpoint | Verification Scope | Verification Screenshot |
| :--- | :--- | :--- |
| **GET** `/health` | Core Subsystem Live Check | ![Health Check](assets/result_1.png) |
| **POST** `/analyze-ticket` | Ledger Reconciliation & History Match | ![Ledger Matching](assets/result_2+.png) |
| **POST** `/analyze-ticket` | Adversarial Injection Block & Interception | ![Security Sanity Check](assets/result_3+.png) |

## 🛠️ Tech Stack
* **Backend**: Node.js, Express.js
* **Tools**: VS Code, Thunder Client
* **Version Control**: Git / GitHub

## 🏃‍♂️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Zishan-125/queuestorm-investigator.git](https://github.com/Zishan-125/queuestorm-investigator.git)
   cd queuestorm-investigator
   ```

Install dependencies:

```bash
npm install
Start the subsystem server:
```
```bash
npm start
Access the API Core:
Test your active local runtime loops via: http://localhost:8000/analyze-ticket
```
