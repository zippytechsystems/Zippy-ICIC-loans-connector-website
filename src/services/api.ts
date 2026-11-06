/**
 * Zippy ICICI Loan Connector - Frontend API Service
 * Handles communication with the Backend REST API (POST /api/v1/loan-enquiries)
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
}

export interface LoanEnquiryResponse {
  success: boolean;
  referenceId: string;
  message: string;
  savedToDatabase?: boolean;
}

/**
 * Resolves the Backend REST API Base URL:
 * 1. From VITE_API_BASE_URL if explicitly configured
 * 2. Or relative path in production if API is hosted on the same domain
 * 3. Or localhost:5000 in local dev environment
 */
const getApiBaseUrl = (): string => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  return '';
};

/**
 * Fallback reference generator in case backend is offline/unreachable
 */
const generateClientFallbackRef = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ZIP-${dateStr}-${randomSuffix}`;
};

/**
 * Submit loan enquiry to Backend REST API (POST /api/v1/loan-enquiries)
 */
export async function submitLoanEnquiry(payload: LoanEnquiryPayload): Promise<LoanEnquiryResponse> {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/v1/loan-enquiries`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
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
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        referenceId: data.referenceId || generateClientFallbackRef(),
        message: data.message || 'Enquiry successfully registered in backend.',
        savedToDatabase: true
      };
    } else {
      const errData = await response.json().catch(() => ({}));
      console.warn('Backend returned non-200 status:', response.status, errData);
      // Fallback to client reference so WhatsApp flow is never blocked
      return {
        success: true,
        referenceId: generateClientFallbackRef(),
        message: errData.message || 'Enquiry processed via client connector.',
        savedToDatabase: false
      };
    }
  } catch (error) {
    console.info('Backend REST API unreachable or in standalone mode. Continuing with WhatsApp referral workflow.');
    return {
      success: true,
      referenceId: generateClientFallbackRef(),
      message: 'Enquiry processed with client reference ID.',
      savedToDatabase: false
    };
  }
}
