// server.js - Express proxy for Moolre API
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const BASE_URL = 'https://api.moolre.com/open';
const API_KEY_HEADER = 'X-API-USER'; // Moolre uses X-API-USER in many examples

// Proxy - Name Validation
app.post('/api/validate', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/transact/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: process.env.MOOLRE_API_KEY
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Validate error:', err);
    res.status(500).json({ error: 'Name validation failed', details: err.message });
  }
});

// Proxy - Disbursement / Transfer
app.post('/api/transfer', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/transact/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: process.env.MOOLRE_API_KEY
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Transfer error:', err);
    res.status(500).json({ error: 'Transfer failed', details: err.message });
  }
});

// Proxy - Send SMS
app.post('/api/send-sms', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/sms/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [API_KEY_HEADER]: process.env.MOOLRE_API_KEY
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('SMS error:', err);
    res.status(500).json({ error: 'SMS sending failed', details: err.message });
  }
});

// Fallback to index.html for SPA behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
