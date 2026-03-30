const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const DB_FILE = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(DB_FILE);
const SECRET = 'uts_super_secret_jwt_key_123!'; 

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password_hash TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS site_data (id INTEGER PRIMARY KEY, json_content TEXT)");
});

app.get('/api/data', (req, res) => {
  db.get("SELECT json_content FROM site_data WHERE id = 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "No data found" });
    res.json(JSON.parse(row.json_content));
  });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/data', authenticateToken, (req, res) => {
  const data = JSON.stringify(req.body);
  db.run("INSERT OR REPLACE INTO site_data (id, json_content) VALUES (1, ?)", [data], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing credentials" });

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!result) return res.status(401).json({ error: "Invalid password" });

      const token = jwt.sign({ username }, SECRET, { expiresIn: '24h' });
      res.json({ token, username });
    });
  });
});

// DEV ONLY: Create admin. Works ONLY if users table is completely empty.
app.post('/api/init-admin', (req, res) => {
  db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row.count > 0) return res.status(403).json({ error: "Admin already initialized. Contact developer." });

    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Provide username and password" });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: err.message });
      db.run("INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, hash], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: "Admin created successfully." });
      });
    });
  });
});

// Serve frontend if built
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/(.*)/, (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
