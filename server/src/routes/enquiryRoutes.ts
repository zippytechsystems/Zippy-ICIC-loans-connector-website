import { Router } from 'express';
import { createEnquiryHandler, getEnquiryStatusHandler } from '../controllers/enquiryController.js';
import { enquiryRateLimiter } from '../middleware/rateLimiter.js';

export const enquiryRouter = Router();

// POST /api/v1/loan-enquiries (Protected by rate limiter)
enquiryRouter.post('/', enquiryRateLimiter, createEnquiryHandler);

// GET /api/v1/loan-enquiries/:refId
enquiryRouter.get('/:refId', getEnquiryStatusHandler);
