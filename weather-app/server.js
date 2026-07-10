require('dotenv').config();
const express = require('express');
const fetch = (...args) => import('node-fetch').then(m => m.default(...args));

const app = express();
const KEY = process.env.OPENWEATHER_KEY;

// Allow CORS so frontend on different port can call this proxy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ message: 'city required' });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${KEY}&units=metric`;
    const r = await fetch(url);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (err) {
    console.error('proxy error', err);
    res.status(500).json({ message: 'proxy error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy server listening on ${port}`));
