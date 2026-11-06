import type { Request, Response } from 'express';
import { getDatabaseHealth } from '../database.js';

export function healthCheckHandler(_req: Request, res: Response): void {
  const dbHealth = getDatabaseHealth();

  res.status(200).json({
    status: 'healthy',
    service: 'Zippy Loan Connector REST API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      client: process.env.DATABASE_CLIENT || 'sqlite',
      status: dbHealth.connected ? 'connected' : 'disconnected',
      enquiryRecordsCount: dbHealth.totalEnquiries
    },
    businessContacts: {
      phone: process.env.BUSINESS_PHONE || '+916302690251',
      whatsapp: process.env.BUSINESS_WHATSAPP || '916302690251',
      email: process.env.BUSINESS_EMAIL || 'zippyloanconnector2@gmail.com'
    }
  });
}
