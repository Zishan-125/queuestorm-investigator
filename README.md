"# queuestorm-investigator" 
# QueueStorm Investigator Engine 🚀
> **Production-grade Automated Dispute Resolution & Fraud Detection Subsystem** > Engineered for the **SUST CSE Carnival 2026** Hackathon.

An intelligent, low-latency transaction dispute analyzer built with Node.js and Express. It parses unstructured customer ticket complaints, maps them safely against transaction history logs, detects security anomalies (phishing/social engineering), and streams back structured, deterministic payloads matching 100% of strict scoring schemas.

---

## 🛠️ Key Architectural Highlights

* **Idempotent Data Sanitization:** Safely rewrites absolute promises and strips confidential credential requests (PIN/OTP/Passwords) from customer-facing text automatically to avoid data leakages.
* **Deterministic Taxonomy Mapping:** Enforces explicit fallbacks (`phishing_or_social_engineering`, `other`) to prevent fracturing or unhandled `500 Internal Server Errors` during adversarial edge-case inputs.
* **Strict Outbound Schema Validation:** Guarantees proper data type conversions (forcing native boolean primitives for `human_review_required` and exact decimal boundaries for `confidence`).

---

## 📂 Project Structure

As deployed in the official repository:

```text
queuestorm-investigator/
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── src/
    ├── aiEngine.js       # Core artificial intelligence interface hooks
    ├── index.js          # Express app server and endpoint routing setup
    ├── investigator.js   # Main transaction mapping and analysis logic
    └── schemas.js        # Strict input validation and sanitization filters
