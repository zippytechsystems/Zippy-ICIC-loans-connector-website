import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { enquiryRouter } from './routes/enquiryRoutes.js';
import { healthRouter } from './routes/healthRoutes.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

export function createApp(): Application {
  const app = express();

  // 1. Basic Security Headers
  app.use(helmet());

  // 2. CORS Configuration
  const allowedOrigins = (process.env.CORS_ORIGIN || '*')
    .split(',')
    .map((origin) => origin.trim());

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Origin blocked by CORS policy'));
        }
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true
    })
  );

  // 3. Request Parsers (Strict size limits against memory attacks)
  app.use(express.json({ limit: '50kb' }));
  app.use(express.urlencoded({ extended: true, limit: '50kb' }));

  // 4. Privacy-conscious request logging
  app.use(requestLogger);

  // 5. API Routes
  app.use('/api/v1/health', healthRouter);
  app.use('/api/v1/loan-enquiries', enquiryRouter);

  // Root welcome endpoint
  app.get('/', (_req, res) => {
    res.status(200).json({
      service: 'Zippy ICICI Loan Connector REST API',
      status: 'active',
      version: '1.0.0',
      docs: '/api/v1/health'
    });
  });

  // 404 Catch-All
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      error: 'NOT_FOUND',
      message: 'The requested API endpoint does not exist. Check /api/v1/health for available services.'
    });
  });

  // 6. Centralized Error Handling
  app.use(errorHandler);

  return app;
}
