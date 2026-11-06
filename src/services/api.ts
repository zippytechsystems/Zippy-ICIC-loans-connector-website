/**
 * Zippy ICICI Loan Connector - Frontend API Service
 * Handles communication with:
 * 1. Hostinger MySQL Endpoint: /api/enquiry.php
 * 2. Dedicated WhatsApp Lead Endpoint: /api/whatsapp_lead.php
 * 3. Node.js REST API: /api/v1/loan-enquiries
 * with robust offline/network fallback for seamless WhatsApp workflow.
 */

import { BRAND_CONFIG } from '../config/brandConfig';

export interface LoanEnquiryPayload {
  fullName: string;
  mobileNumber: string;
  email?: string;
  loanCategory: string;
  requiredAmount: string | number;
  employmentType: string;
  city: string;
  monthlyIncome?: string | number;
  additionalInfo?: string;
  consent: boolean;
  sourceContext?: string;
  clientReferenceId?: string;
}

export interface WhatsAppLeadPayload {
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  loanCategory?: string;
  requiredAmount?: string | number;
  city?: string;
  sourceContext?: string;
  additionalInfo?: string;
  clientReferenceId?: string;
}

export interface LoanEnquiryResponse {
  success: boolean;
  referenceId: string;
  message: string;
  savedToDatabase?: boolean;
  whatsappUrl?: string;
}

/**
 * Fallback reference generator for standard loan applications
 */
export const generateClientFallbackRef = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ZIP-${dateStr}-${randomSuffix}`;
};

/**
 * Reference generator for WhatsApp leads
 */
export const generateWhatsAppRef = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ZIP-WA-${dateStr}-${randomSuffix}`;
};

/**
 * Returns prioritized API endpoints for general enquiries
 */
const getTargetEndpoints = (): string[] => {
  const list: string[] = [];

  if (import.meta.env.VITE_API_BASE_URL) {
    const custom = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
    list.push(`${custom}/api/enquiry.php`);
    list.push(`${custom}/api/v1/loan-enquiries`);
  }

  // 1. Direct Hostinger MySQL PHP endpoint (active in public_html on Hostinger)
  list.push('/api/enquiry.php');

  // 2. Node.js REST API endpoints
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    list.unshift('http://localhost:5000/api/v1/loan-enquiries');
  } else {
    list.push('/api/v1/loan-enquiries');
  }

  return list;
};

/**
 * Submit full loan application to Hostinger MySQL / Node.js REST API
 */
export async function submitLoanEnquiry(payload: LoanEnquiryPayload): Promise<LoanEnquiryResponse> {
  const endpoints = getTargetEndpoints();
  const preGeneratedRef = payload.clientReferenceId || generateClientFallbackRef();

  const formattedPayload = {
    clientReferenceId: preGeneratedRef,
    fullName: payload.fullName.trim(),
    mobileNumber: payload.mobileNumber.replace(/\D/g, ''),
    email: payload.email?.trim() || undefined,
    loanCategory: payload.loanCategory,
    requiredAmount: typeof payload.requiredAmount === 'string'
      ? parseInt(payload.requiredAmount.replace(/\D/g, ''), 10) || 0
      : payload.requiredAmount,
    employmentType: payload.employmentType,
    city: payload.city,
    monthlyIncome: payload.monthlyIncome
      ? (typeof payload.monthlyIncome === 'string'
          ? parseInt(payload.monthlyIncome.replace(/\D/g, ''), 10) || undefined
          : payload.monthlyIncome)
      : undefined,
    additionalInfo: payload.additionalInfo?.trim() || undefined,
    consent: Boolean(payload.consent),
    sourceContext: payload.sourceContext || 'Website Loan Enquiry Form'
  };

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formattedPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          referenceId: data.referenceId || preGeneratedRef,
          message: data.message || 'Enquiry successfully saved to Hostinger MySQL database.',
          savedToDatabase: true,
          whatsappUrl: data.whatsappUrl
        };
      }
    } catch {
      // Try next endpoint
    }
  }

  // Graceful fallback to client reference so WhatsApp is NEVER blocked
  return {
    success: true,
    referenceId: preGeneratedRef,
    message: 'Enquiry processed with official reference ID.',
    savedToDatabase: false
  };
}

/**
 * Record WhatsApp lead in MySQL and return WhatsApp chat URL
 */
export async function trackWhatsAppLead(lead: WhatsAppLeadPayload): Promise<{
  referenceId: string;
  whatsappUrl: string;
  savedToDatabase: boolean;
}> {
  const refId = lead.clientReferenceId || generateWhatsAppRef();
  const fullName = lead.fullName?.trim() || 'WhatsApp Lead';
  const mobileNumber = lead.mobileNumber?.replace(/\D/g, '') || BRAND_CONFIG.contact.whatsappNumber;
  const loanCategory = lead.loanCategory || 'Personal Loans';
  const city = lead.city || 'Hyderabad';
  const sourceContext = lead.sourceContext || 'WhatsApp Direct Click';
  const requiredAmount = lead.requiredAmount ? Number(lead.requiredAmount) : 0;
  const additionalInfo = lead.additionalInfo?.trim() || '';

  // Construct default WhatsApp message with Reference ID
  const buildWaMessage = () => {
    let msg = `*New Loan Enquiry - Zippy Loan Connector*\n`;
    msg += `Ref ID: *${refId}*\n\n`;
    msg += `*Customer Details:*\n`;
    msg += `• Name: ${fullName}\n`;
    if (mobileNumber && mobileNumber !== BRAND_CONFIG.contact.whatsappNumber) {
      msg += `• Mobile: +91 ${mobileNumber}\n`;
    }
    msg += `• City: ${city}\n`;
    msg += `• Loan Type: *${loanCategory}*\n`;
    if (requiredAmount > 0) {
      msg += `• Amount: ₹${requiredAmount.toLocaleString('en-IN')}\n`;
    }
    if (additionalInfo) {
      msg += `• Notes: ${additionalInfo}\n`;
    }
    msg += `\nHello Zippy Loan Connector Advisor, I would like guidance on suitable lender options.`;
    return `https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const defaultUrl = buildWaMessage();
  let savedToDatabase = false;

  const endpoints = ['/api/whatsapp_lead.php', '/api/enquiry.php'];
  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientReferenceId: refId,
          fullName,
          mobileNumber,
          loanCategory,
          city,
          requiredAmount,
          additionalInfo,
          sourceContext,
          isWhatsAppLead: true,
          consent: true
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        savedToDatabase = Boolean(data.savedToDatabase);
        return {
          referenceId: data.referenceId || refId,
          whatsappUrl: data.whatsappUrl || defaultUrl,
          savedToDatabase
        };
      }
    } catch {
      // fallback
    }
  }

  // Backup to localStorage
  try {
    const list = JSON.parse(localStorage.getItem('zippy_whatsapp_leads') || '[]');
    list.push({ refId, fullName, mobileNumber, loanCategory, sourceContext, time: new Date().toISOString() });
    localStorage.setItem('zippy_whatsapp_leads', JSON.stringify(list));
  } catch {}

  return {
    referenceId: refId,
    whatsappUrl: defaultUrl,
    savedToDatabase
  };
}

/**
 * Helper to trigger lead recording and open WhatsApp in new tab
 */
export async function openWhatsAppWithTracking(lead: WhatsAppLeadPayload): Promise<{
  referenceId: string;
  whatsappUrl: string;
  savedToDatabase: boolean;
}> {
  const result = await trackWhatsAppLead(lead);
  try {
    window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
  } catch {
    window.location.href = result.whatsappUrl;
  }
  return result;
}
