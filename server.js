import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import serveStatic from 'serve-static';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// Explicitly serve the built index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Serve static assets from the 'dist/assets' directory
app.use('/assets', serveStatic(path.join(__dirname, 'dist', 'assets')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// All other requests (for client-side routing) return the main index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
