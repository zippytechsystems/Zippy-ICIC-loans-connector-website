/**
 * Zippy ICICI Loan Connector - Frontend API Service
 * Handles communication with:
 * 1. Hostinger MySQL Endpoint: /api/enquiry.php
 * 2. Node.js REST API: /api/v1/loan-enquiries
 * with robust offline/network fallback for seamless WhatsApp workflow.
 */

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

export interface LoanEnquiryResponse {
  success: boolean;
  referenceId: string;
  message: string;
  savedToDatabase?: boolean;
}

/**
 * Fallback reference generator in case backend is offline/unreachable
 */
export const generateClientFallbackRef = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ZIP-${dateStr}-${randomSuffix}`;
};

/**
 * Returns prioritized API endpoints to ensure MySQL persistence on Hostinger and Node
 */
const getTargetEndpoints = (): string[] => {
  const list: string[] = [];

  if (import.meta.env.VITE_API_BASE_URL) {
    const custom = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
    list.push(`${custom}/api/v1/loan-enquiries`);
    list.push(`${custom}/api/enquiry.php`);
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
 * Submit loan enquiry to Hostinger MySQL / Node.js REST API
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
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout per endpoint

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
          savedToDatabase: true
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
