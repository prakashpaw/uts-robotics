const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(DB_FILE);

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password_hash TEXT)");

  const username = process.argv[2] || 'admin';
  const password = process.argv[3] || 'admin123';

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Hashing error", err);
      process.exit(1);
    }
    db.run("INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, hash], function(err) {
      if (err) {
        console.error("Error creating admin (already exists?):", err.message);
      } else {
        console.log(`✅ Admin perfectly created!`);
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
      }
    });
  });
});
