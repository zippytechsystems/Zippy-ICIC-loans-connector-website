import { Router } from 'express';
import { healthCheckHandler } from '../controllers/healthController.js';

export const healthRouter = Router();

// GET /api/v1/health
healthRouter.get('/', healthCheckHandler);
