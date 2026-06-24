import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import multer from 'multer';
import fs from 'node:fs/promises';
import { defaultContent, defaultReferences, defaultSolutions } from './defaults.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const db = new Database(path.join(rootDir, 'millsrocket.sqlite'));
const app = express();
const port = Number(process.env.PORT || 4174);
const jwtSecret = process.env.JWT_SECRET || 'local-dev-secret-change-me';
const adminEmail = process.env.ADMIN_EMAIL || 'admin@millsrocket.com';
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '$2b$12$rPGl9oohM1us6l.97MG/W.4862mnGlyePMagMhLD0sqv/zEZi.Sna';
const referenceUploadDir = path.join(rootDir, 'public', 'uploads', 'references');
const allowedImageTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
]);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase().replace('.', '');
    const validExtension = ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
    if (!allowedImageTypes.has(file.mimetype) || !validExtension) {
      return cb(new Error('Format non autorisé. Utilisez jpg, jpeg, png ou webp.'));
    }
    return cb(null, true);
  },
});

app.use(cors());
app.use(express.json({ limit: '1mb' }));
await fs.mkdir(referenceUploadDir, { recursive: true });

db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    data TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS project_references (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT NOT NULL DEFAULT '',
    skills TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'en développement',
    image TEXT NOT NULL DEFAULT '',
    project_link TEXT NOT NULL DEFAULT '',
    display_order INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS solutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT NOT NULL DEFAULT '',
    icon TEXT NOT NULL DEFAULT 'Rocket',
    display_order INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contact_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    project_type TEXT NOT NULL DEFAULT '',
    estimated_budget TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'nouveau',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    projectType TEXT NOT NULL DEFAULT '',
    budget TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Nouveau',
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const leadStatuses = ['Nouveau', 'Contacté', 'Devis envoyé', 'Gagné', 'Perdu'];

function migrateContactRequestsToLeads() {
  const leadCount = db.prepare('SELECT COUNT(*) AS count FROM leads').get().count;
  const oldCount = db.prepare('SELECT COUNT(*) AS count FROM contact_requests').get().count;
  if (leadCount > 0 || oldCount === 0) return;

  const rows = db.prepare('SELECT * FROM contact_requests ORDER BY id ASC').all();
  const insert = db.prepare(`INSERT INTO leads
    (name, email, phone, projectType, budget, message, status, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const tx = db.transaction((items) => {
    items.forEach((row) => {
      const status = row.status === 'traité' ? 'Contacté' : 'Nouveau';
      insert.run(row.name, row.email, row.phone, row.project_type, row.estimated_budget, row.message, status, row.created_at, row.created_at);
    });
  });
  tx(rows);
}

migrateContactRequestsToLeads();

function seedDefaults() {
  const contentCount = db.prepare('SELECT COUNT(*) AS count FROM content').get().count;
  if (contentCount === 0) {
    db.prepare('INSERT INTO content (id, data) VALUES (1, ?)').run(JSON.stringify(defaultContent));
  }

  const solutionCount = db.prepare('SELECT COUNT(*) AS count FROM solutions').get().count;
  if (solutionCount === 0) {
    const insert = db.prepare('INSERT INTO solutions (title, short_description, detailed_description, icon, display_order) VALUES (?, ?, ?, ?, ?)');
    const tx = db.transaction((items) => items.forEach((item) => insert.run(...item)));
    tx(defaultSolutions);
  }

  const referenceCount = db.prepare('SELECT COUNT(*) AS count FROM project_references').get().count;
  if (referenceCount === 0) {
    const insert = db.prepare(`INSERT INTO project_references
      (name, type, short_description, detailed_description, skills, status, image, project_link, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const tx = db.transaction((items) => items.forEach((item) => insert.run(...item)));
    tx(defaultReferences);
  }
}

seedDefaults();

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) {
    return res.status(401).json({ error: 'Authentification requise.' });
  }

  try {
    req.admin = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ error: 'Session invalide.' });
  }
}

function parseSkills(skills) {
  if (Array.isArray(skills)) return skills.join(', ');
  return String(skills || '');
}

function referenceRow(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    shortDescription: row.short_description,
    detailedDescription: row.detailed_description,
    skills: row.skills ? row.skills.split(',').map((skill) => skill.trim()).filter(Boolean) : [],
    status: row.status,
    image: row.image,
    projectLink: row.project_link,
    order: row.display_order,
    active: Boolean(row.active),
    createdAt: row.created_at,
  };
}

function solutionRow(row) {
  return {
    id: row.id,
    title: row.title,
    shortDescription: row.short_description,
    detailedDescription: row.detailed_description,
    icon: row.icon,
    order: row.display_order,
    active: Boolean(row.active),
  };
}

function leadRow(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    projectType: row.projectType,
    budget: row.budget,
    message: row.message,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function leadStats(rows) {
  return {
    total: rows.length,
    new: rows.filter((lead) => lead.status === 'Nouveau').length,
    contacted: rows.filter((lead) => lead.status === 'Contacté').length,
    won: rows.filter((lead) => lead.status === 'Gagné').length,
    lost: rows.filter((lead) => lead.status === 'Perdu').length,
  };
}

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body || {};
  const validEmail = String(email || '').toLowerCase() === adminEmail.toLowerCase();
  const validPassword = password ? await bcrypt.compare(password, adminPasswordHash) : false;

  if (!validEmail || !validPassword) {
    return res.status(401).json({ error: 'Identifiants invalides.' });
  }

  const token = jwt.sign({ email: adminEmail }, jwtSecret, { expiresIn: '7d' });
  return res.json({ token, email: adminEmail });
});

app.get('/api/content', (req, res) => {
  const row = db.prepare('SELECT data FROM content WHERE id = 1').get();
  res.json(row ? JSON.parse(row.data) : defaultContent);
});

app.put('/api/content', requireAuth, (req, res) => {
  const data = { ...defaultContent, ...(req.body || {}) };
  db.prepare('INSERT INTO content (id, data, updated_at) VALUES (1, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP').run(JSON.stringify(data));
  res.json(data);
});

app.get('/api/references', (req, res) => {
  const includeInactive = req.query.all === '1';
  const rows = db.prepare(`SELECT * FROM project_references ${includeInactive ? '' : 'WHERE active = 1'} ORDER BY display_order ASC, id ASC`).all();
  res.json(rows.map(referenceRow));
});

app.post('/api/references', requireAuth, (req, res) => {
  const item = req.body || {};
  const result = db.prepare(`INSERT INTO project_references
    (name, type, short_description, detailed_description, skills, status, image, project_link, display_order, active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
      item.name || 'Nouveau projet',
      item.type || '',
      item.shortDescription || '',
      item.detailedDescription || '',
      parseSkills(item.skills),
      item.status || 'en développement',
      item.image || '',
      item.projectLink || '',
      Number(item.order || 0),
      item.active === false ? 0 : 1,
    );
  res.status(201).json(referenceRow(db.prepare('SELECT * FROM project_references WHERE id = ?').get(result.lastInsertRowid)));
});

app.put('/api/references/:id', requireAuth, (req, res) => {
  const item = req.body || {};
  db.prepare(`UPDATE project_references SET
    name = ?, type = ?, short_description = ?, detailed_description = ?, skills = ?, status = ?,
    image = ?, project_link = ?, display_order = ?, active = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`).run(
      item.name || '',
      item.type || '',
      item.shortDescription || '',
      item.detailedDescription || '',
      parseSkills(item.skills),
      item.status || 'en développement',
      item.image || '',
      item.projectLink || '',
      Number(item.order || 0),
      item.active ? 1 : 0,
      req.params.id,
    );
  const row = db.prepare('SELECT * FROM project_references WHERE id = ?').get(req.params.id);
  res.json(referenceRow(row));
});

app.delete('/api/references/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM project_references WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

app.get('/api/solutions', (req, res) => {
  const includeInactive = req.query.all === '1';
  const rows = db.prepare(`SELECT * FROM solutions ${includeInactive ? '' : 'WHERE active = 1'} ORDER BY display_order ASC, id ASC`).all();
  res.json(rows.map(solutionRow));
});

app.post('/api/solutions', requireAuth, (req, res) => {
  const item = req.body || {};
  const result = db.prepare(`INSERT INTO solutions
    (title, short_description, detailed_description, icon, display_order, active)
    VALUES (?, ?, ?, ?, ?, ?)`).run(
      item.title || 'Nouvelle solution',
      item.shortDescription || '',
      item.detailedDescription || '',
      item.icon || 'Rocket',
      Number(item.order || 0),
      item.active === false ? 0 : 1,
    );
  res.status(201).json(solutionRow(db.prepare('SELECT * FROM solutions WHERE id = ?').get(result.lastInsertRowid)));
});

app.put('/api/solutions/:id', requireAuth, (req, res) => {
  const item = req.body || {};
  db.prepare(`UPDATE solutions SET
    title = ?, short_description = ?, detailed_description = ?, icon = ?, display_order = ?, active = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`).run(
      item.title || '',
      item.shortDescription || '',
      item.detailedDescription || '',
      item.icon || 'Rocket',
      Number(item.order || 0),
      item.active ? 1 : 0,
      req.params.id,
    );
  const row = db.prepare('SELECT * FROM solutions WHERE id = ?').get(req.params.id);
  res.json(solutionRow(row));
});

app.delete('/api/solutions/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM solutions WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

app.post('/api/admin/uploads/reference-image', requireAuth, (req, res) => {
  upload.single('image')(req, res, async (error) => {
    if (error) {
      const message = error.code === 'LIMIT_FILE_SIZE' ? 'Image trop lourde. Taille maximale : 5 Mo.' : error.message;
      return res.status(400).json({ success: false, error: message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Aucun fichier reçu.' });
    }

    const extension = allowedImageTypes.get(req.file.mimetype);
    if (!extension) {
      return res.status(400).json({ success: false, error: 'Format non autorisé.' });
    }

    const safeBase = path.basename(req.file.originalname, path.extname(req.file.originalname))
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()
      .slice(0, 48) || 'reference';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeBase}.${extension}`;
    const filepath = path.join(referenceUploadDir, filename);

    await fs.writeFile(filepath, req.file.buffer);
    return res.status(201).json({ success: true, url: `/uploads/references/${filename}` });
  });
});

app.post('/api/contact', (req, res) => {
  const item = req.body || {};
  if (String(item.website || '').trim()) {
    return res.json({ success: true, message: 'Votre demande a bien été envoyée.' });
  }

  const name = String(item.name || '').trim();
  const email = String(item.email || '').trim();
  const message = String(item.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nom, email et message sont requis.' });
  }

  if (message.length > 5000) {
    return res.status(400).json({ error: 'Le message est limité à 5000 caractères.' });
  }

  db.prepare(`INSERT INTO leads
    (name, email, phone, projectType, budget, message, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Nouveau')`).run(
      name,
      email,
      String(item.phone || '').trim(),
      item.projectType || '',
      item.budget || item.estimatedBudget || '',
      message,
    );

  res.status(201).json({ success: true, message: 'Votre demande a bien été envoyée.' });
});

app.get('/api/admin/leads', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM leads ORDER BY createdAt DESC, id DESC').all().map(leadRow);
  res.json({ leads: rows, stats: leadStats(rows), statuses: leadStatuses });
});

app.get('/api/admin/leads/:id', requireAuth, (req, res) => {
  const row = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Lead introuvable.' });
  res.json(leadRow(row));
});

app.patch('/api/admin/leads/:id/status', requireAuth, (req, res) => {
  const status = String(req.body?.status || '');
  if (!leadStatuses.includes(status)) {
    return res.status(400).json({ error: 'Statut invalide.' });
  }
  db.prepare('UPDATE leads SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?').run(status, req.params.id);
  const row = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Lead introuvable.' });
  res.json(leadRow(row));
});

app.delete('/api/admin/leads/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

app.use('/uploads', express.static(path.join(rootDir, 'public', 'uploads')));
app.use(express.static(path.join(rootDir, 'dist')));
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
  res.sendFile(path.join(rootDir, 'dist', 'index.html'));
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Mills Rocket API running on http://127.0.0.1:${port}`);
});
