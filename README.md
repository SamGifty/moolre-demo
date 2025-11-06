# moolre-disbursement-demo

Polished demo that integrates with Moolre (Disbursement + SMS) using a secure backend proxy.

## What is included
- `server.js` - Node.js + Express proxy that forwards requests to Moolre (keeps your API key secret)
- `public/index.html` - Polished frontend (Moolre-themed)
- `public/style.css` - Stylesheet
- `.env.example` - Example environment file (add your real API key here)
- `package.json` - Node dependencies and start script

## Setup (local)

1. Clone or unzip the project and open a terminal in the project folder.
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the project root (or copy `.env.example`) and add your API key:
```
MOOLRE_API_KEY=your_real_moolre_api_key_here
```
4. Start the app:
```bash
node server.js
```
5. Open your browser to: `http://localhost:3000`

## Notes & Troubleshooting
- **Do NOT** commit your real `.env` file to source control.
- This demo proxies requests to Moolre endpoints:
  - Name validation => `POST https://api.moolre.com/open/transact/validate`
  - Disbursement => `POST https://api.moolre.com/open/transact/transfer`
  - SMS => `POST https://api.moolre.com/open/sms/send`
- If you get CORS or network errors, make sure your machine has internet access and the `.env` key is correct.
- If you want to deploy, keep the `.env` value secret in your hosting environment variables.

## File structure
```
moolre-disbursement-demo/
├─ server.js
├─ package.json
├─ .env.example
└─ public/
   ├─ index.html
   └─ style.css
```

---
If you want, I can also: generate a Postman collection or deploy this to Render/Vercel with step-by-step instructions.
