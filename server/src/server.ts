import { createApp } from './app.js';
import { getDatabase } from './database.js';

const PORT = parseInt(process.env.PORT || '5000', 10);

async function startServer() {
  try {
    // 1. Initialize Database connection and verify schema
    const db = getDatabase();
    console.log('[DATABASE] SQLite connection established & schema verified successfully.');

    // 2. Create Express app
    const app = createApp();

    // 3. Listen on specified port
    const server = app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 Zippy Loan Connector REST API is running!`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/v1/health`);
      console.log(`📝 Enquiry Endpoint: POST http://localhost:${PORT}/api/v1/loan-enquiries`);
      console.log(`🏢 Official WhatsApp: +91 6302690251`);
      console.log(`📧 Official Email: zippyloanconnector2@gmail.com`);
      console.log(`=======================================================`);
    });

    // 4. Graceful Shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`[SHUTDOWN] Received ${signal}. Closing HTTP server and database...`);
      server.close(() => {
        try {
          db.close();
          console.log('[DATABASE] Closed connection.');
        } catch {
          // ignore
        }
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('[FATAL] Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
