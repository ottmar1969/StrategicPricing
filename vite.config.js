import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import serveStatic from 'serve-static';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your built frontend files
const distPath = path.join(__dirname, 'dist');

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// Serve static files from the 'dist' directory
// This will serve index.html and all other assets directly
app.use(serveStatic(distPath));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// All other requests (for client-side routing) return the main index.html file
// This should come AFTER serveStatic to ensure static files are prioritized
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
