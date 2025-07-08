const express = require('express');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3001;
const SECRET = 'supersecretkey'; // Slaptas raktas JWT

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sukurkite MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // arba jūsų slaptažodis
  database: 'manta'
});

// --- Multer setup nuotraukoms ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// --- Duomenų failas ---
const DATA_FILE = path.join(__dirname, 'data.json');
function readData() {
  if (!fs.existsSync(DATA_FILE)) return {};
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// --- Auth middleware ---
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// --- API ---
// Prisijungimas
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.query('SELECT * FROM admin_users WHERE username = ?', [username]);
  if (!rows.length) return res.status(401).json({ message: 'Neteisingas slaptažodis' });
  const user = rows[0];
  if (!bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ message: 'Neteisingas slaptažodis' });
  }
  const token = jwt.sign({ admin: true }, SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// Gauti visus duomenis
app.get('/api/data', (req, res) => {
  res.json(readData());
});

// Atnaujinti duomenis (tik admin)
app.post('/api/data', authenticateToken, (req, res) => {
  writeData(req.body);
  res.json({ success: true });
});

// Įkelti nuotrauką (tik admin)
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  res.json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` });
});

// Admin registracija
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Trūksta duomenų' });
  // Patikrinam ar toks vartotojas jau yra
  const [rows] = await db.query('SELECT * FROM admin_users WHERE username = ?', [username]);
  if (rows.length) return res.status(409).json({ message: 'Toks vartotojas jau egzistuoja' });
  const hash = bcrypt.hashSync(password, 10);
  await db.query('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)', [username, hash]);
  res.json({ success: true });
});

// --- Gallery categories API ---
app.get('/api/gallery-categories', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM gallery_categories');
  res.json(rows);
});

app.post('/api/gallery-categories', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Trūksta pavadinimo' });
  await db.query('INSERT INTO gallery_categories (name) VALUES (?)', [name]);
  res.json({ success: true });
});

app.delete('/api/gallery-categories/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM gallery_categories WHERE id = ?', [id]);
  res.json({ success: true });
});

// --- Paleidimas ---
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
app.listen(PORT, () => {
  console.log(`Admin backend running on http://localhost:${PORT}`);
}); 