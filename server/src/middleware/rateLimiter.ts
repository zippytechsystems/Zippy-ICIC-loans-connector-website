import rateLimit from 'express-rate-limit';

const windowMinutes = parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '15', 10);
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '30', 10);

/**
 * Strict rate limiter for enquiry submissions to prevent bot spam
 */
export const enquiryRateLimiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000,
  max: maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'TOO_MANY_REQUESTS',
    message: `Too many loan enquiries submitted from this network. Please wait ${windowMinutes} minutes or contact us directly on WhatsApp (+91 63026 90251).`
  }
});

/**
 * General rate limiter for read / health check endpoints
 */
export const generalRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
