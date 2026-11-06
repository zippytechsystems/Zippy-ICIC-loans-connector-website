import type { Request, Response, NextFunction } from 'express';

/**
 * Privacy-conscious logger
 * Masks personally identifiable information (PII) before logging
 */
export function maskMobile(mobile?: string): string {
  if (!mobile || mobile.length < 6) return '****';
  return `${mobile.slice(0, 2)}****${mobile.slice(-4)}`;
}

export function maskEmail(email?: string): string {
  if (!email || !email.includes('@')) return '****';
  const [user, domain] = email.split('@');
  return `${user.slice(0, 1)}***@${domain}`;
}

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const clientIp = ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const logEntry = `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} - ${duration}ms (IP: ${clientIp})`;

    if (statusCode >= 400) {
      console.warn(logEntry);
    } else {
      console.log(logEntry);
    }
  });

  next();
}
