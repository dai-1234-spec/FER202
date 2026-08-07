const express = require('express');
const server = express();
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const getDb = () => {
  const dbPath = path.join(__dirname, 'database.json');
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

const saveDb = (data) => {
  const dbPath = path.join(__dirname, 'database.json');
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

server.use(express.json());

// CORS headers
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ====== CENTERS ======
// GET /api/centers
server.get('/api/centers', (req, res) => {
  res.json(getDb().centers);
});

// GET /api/centers/:id
server.get('/api/centers/:id', (req, res) => {
  const center = getDb().centers.find(c => String(c.id) === String(req.params.id));
  if (!center) return res.status(404).json({ error: 'Không tìm thấy trung tâm' });
  res.json(center);
});

// ====== USERS ======
// GET /api/users
server.get('/api/users', (req, res) => {
  res.json(getDb().users);
});

// POST /api/users (đăng ký)
server.post('/api/users', (req, res) => {
  const data = getDb();
  const newUser = { ...req.body, id: Date.now().toString() };
  if (!data.users) data.users = [];
  data.users.push(newUser);
  saveDb(data);
  res.status(201).json(newUser);
});

// ====== REVIEWS ======
// GET /api/reviews
server.get('/api/reviews', (req, res) => {
  res.json(getDb().reviews || []);
});

// POST /api/reviews
server.post('/api/reviews', (req, res) => {
  const data = getDb();
  const newReview = { ...req.body, id: Date.now().toString() };
  if (!data.reviews) data.reviews = [];
  data.reviews.push(newReview);
  saveDb(data);
  res.status(201).json(newReview);
});

// ====== REGISTRATIONS ======
// GET /api/registrations
server.get('/api/registrations', (req, res) => {
  res.json(getDb().registrations || []);
});

// POST /api/registrations
server.post('/api/registrations', (req, res) => {
  const data = getDb();
  const newReg = { ...req.body, id: Date.now().toString() };
  if (!data.registrations) data.registrations = [];
  data.registrations.push(newReg);
  saveDb(data);
  res.status(201).json(newReg);
});

// ====== CHATBOT ======
const chatHandler = require('./chat');
server.post('/api/chat', (req, res) => chatHandler(req, res));

module.exports = server;

// Chạy server tại port 3001 nếu chạy trực tiếp (local)
if (process.env.NODE_ENV !== 'production') {
  const port = 3001;
  server.listen(port, () => {
    console.log(`API Server is running at http://localhost:${port}`);
  });
}

