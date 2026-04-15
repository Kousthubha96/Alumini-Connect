const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const ROOT_DIR = path.join(__dirname, '..');

// Serve all static files from project root
app.use(express.static(ROOT_DIR));

// Minimal API routes (PR-friendly, low risk)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/version', (req, res) => {
  res.status(200).json({
    success: true,
    version: '1.0.0'
  });
});

// Optional: route root to index.html explicitly
app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

// 404 fallback for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
