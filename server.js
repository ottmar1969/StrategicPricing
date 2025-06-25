import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

// Security and performance middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    port: PORT
  });
});

// API routes
app.get('/api/status', (req, res) => {
  res.json({ 
    message: 'Strategic Pricing API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Serve static files from dist directory
const distPath = join(__dirname, 'dist');
const publicPath = join(__dirname, 'public');

if (existsSync(distPath)) {
  console.log('✅ Serving built files from dist/');
  app.use(express.static(distPath));
} else if (existsSync(publicPath)) {
  console.log('✅ Serving files from public/');
  app.use(express.static(publicPath));
} else {
  console.log('⚠️  No dist/ or public/ directory found, serving from root');
  app.use(express.static(__dirname));
}

// Handle client-side routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  let indexPath;
  
  // Try different possible locations for index.html
  const possiblePaths = [
    join(__dirname, 'dist', 'index.html'),
    join(__dirname, 'public', 'index.html'),
    join(__dirname, 'index.html')
  ];
  
  for (const path of possiblePaths) {
    if (existsSync(path)) {
      indexPath = path;
      break;
    }
  }
  
  if (indexPath) {
    try {
      const indexHtml = readFileSync(indexPath, 'utf-8');
      res.send(indexHtml);
    } catch (error) {
      console.error('Error reading index.html:', error);
      res.status(500).send('Server Error: Unable to load application');
    }
  } else {
    // Fallback HTML if no index.html found
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Strategic Pricing Platform</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .container { max-width: 600px; margin: 0 auto; }
          .status { color: #28a745; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Strategic Pricing Platform</h1>
          <p class="status">✅ Server is running successfully!</p>
          <p>Your application is deployed and ready.</p>
          <p><strong>Environment:</strong> ${NODE_ENV}</p>
          <p><strong>Port:</strong> ${PORT}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        </div>
      </body>
      </html>
    `);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Strategic Pricing Platform started`);
  console.log(`📍 Environment: ${NODE_ENV}`);
  console.log(`🌐 Server running on: http://0.0.0.0:${PORT}`);
  console.log(`📁 Serving from: ${__dirname}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n👋 ${signal} received, shutting down gracefully...`);
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;

