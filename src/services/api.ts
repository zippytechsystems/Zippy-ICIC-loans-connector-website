/**
 * Zippy DSA Loans - Frontend API Service
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

export interface DsaApplication {
  id?: number;
  application_id: string;
  full_name: string;
  mobile_number: string;
  email: string | null;
  qualification: string;
  experience: string;
  location: string;
  notes: string | null;
  role: string;
  status: string;
  source_context?: string;
  created_at: string;
  updated_at?: string;
}

export interface DsaHiringMetrics {
  total: number;
  newApplicants: number;
  shortlisted: number;
  today: number;
  experienced: number;
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
    let msg = `*New Loan Enquiry - Zippy DSA Loans*\n`;
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
    msg += `\nHello Zippy DSA Loans Advisor, I would like guidance on suitable lender options.`;
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

/**
 * Generate DSA Job Application ID: ZIP-JOB-YYYYMMDD-XXXX
 */
export const generateDsaApplicationId = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ZIP-JOB-${dateStr}-${randomSuffix}`;
};

/**
 * Submit DSA Job Application to MySQL / Local Storage
 */
export async function submitDsaApplication(data: {
  fullName: string;
  mobileNumber: string;
  email?: string;
  qualification: string;
  experience: string;
  location: string;
  notes?: string;
  role?: string;
  applicationId?: string;
}): Promise<{
  success: boolean;
  applicationId: string;
  message: string;
  savedToDatabase: boolean;
}> {
  const appId = data.applicationId || generateDsaApplicationId();
  const cleanMobile = data.mobileNumber.replace(/\D/g, '');
  const cleanName = data.fullName.trim();
  const cleanRole = data.role || 'Zippy DSA Loans Executive';

  const newApp: DsaApplication = {
    application_id: appId,
    full_name: cleanName,
    mobile_number: cleanMobile,
    email: data.email?.trim() || null,
    qualification: data.qualification,
    experience: data.experience,
    location: data.location,
    notes: data.notes?.trim() || null,
    role: cleanRole,
    status: 'NEW',
    source_context: 'Website Job Vacancy Widget',
    created_at: new Date().toISOString()
  };

  // 1. Always store locally in localStorage for immediate reflection in Admin Dashboard
  try {
    const localApps: DsaApplication[] = JSON.parse(localStorage.getItem('zippy_dsa_applications') || '[]');
    const existingIdx = localApps.findIndex((a) => a.application_id === appId);
    if (existingIdx >= 0) {
      localApps[existingIdx] = newApp;
    } else {
      localApps.unshift(newApp);
    }
    localStorage.setItem('zippy_dsa_applications', JSON.stringify(localApps));
  } catch {
    // Ignore storage errors
  }

  // 2. Submit to PHP MySQL backend
  let savedToDatabase = false;
  try {
    const res = await fetch('/api/dsa_hiring.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        applicationId: appId,
        fullName: cleanName,
        mobileNumber: cleanMobile,
        email: data.email?.trim() || '',
        qualification: data.qualification,
        experience: data.experience,
        location: data.location,
        notes: data.notes?.trim() || '',
        role: cleanRole
      })
    });
    if (res.ok) {
      const respData = await res.json();
      if (respData.success) {
        savedToDatabase = Boolean(respData.savedToDatabase);
      }
    }
  } catch (err) {
    console.warn('Backend API connection warning (offline or local fallback):', err);
  }

  return {
    success: true,
    applicationId: appId,
    message: 'Application recorded successfully.',
    savedToDatabase
  };
}

/**
 * Fetch all DSA Job Applications for Admin Dashboard
 */
export async function fetchDsaApplications(key: string): Promise<{
  applications: DsaApplication[];
  metrics: DsaHiringMetrics;
}> {
  let backendApps: DsaApplication[] = [];
  let backendMetrics: Partial<DsaHiringMetrics> = {};

  try {
    const res = await fetch(`/api/dsa_hiring.php?action=list&key=${encodeURIComponent(key)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.applications)) {
        backendApps = data.applications;
        if (data.metrics) {
          backendMetrics = data.metrics;
        }
      }
    }
  } catch (err) {
    console.info('Backend fetch skipped or offline, loading local applications cache:', err);
  }

  // Retrieve locally cached applications and merge
  let localApps: DsaApplication[] = [];
  try {
    localApps = JSON.parse(localStorage.getItem('zippy_dsa_applications') || '[]');
  } catch {
    localApps = [];
  }

  // Also migrate any old 'zippy_job_applications' if present
  try {
    const legacy = JSON.parse(localStorage.getItem('zippy_job_applications') || '[]');
    if (Array.isArray(legacy) && legacy.length > 0) {
      for (const item of legacy) {
        if (item.appId && !localApps.some((a) => a.application_id === item.appId)) {
          localApps.push({
            application_id: item.appId,
            full_name: item.name || 'Applicant',
            mobile_number: item.mobile || '',
            email: null,
            qualification: 'Graduate',
            experience: 'Fresher',
            location: 'Hyderabad',
            notes: null,
            role: item.role || 'Zippy DSA Loans Executive',
            status: 'NEW',
            created_at: item.timestamp || new Date().toISOString()
          });
        }
      }
      localStorage.setItem('zippy_dsa_applications', JSON.stringify(localApps));
    }
  } catch {}

  // Merge backend and local, preferring newer/backend
  const mergedMap = new Map<string, DsaApplication>();
  // 1. Put backend apps
  backendApps.forEach((app) => mergedMap.set(app.application_id, app));
  // 2. Put local apps if not present
  localApps.forEach((app) => {
    if (!mergedMap.has(app.application_id)) {
      mergedMap.set(app.application_id, app);
    }
  });

  const mergedApps = Array.from(mergedMap.values()).sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Calculate metrics
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const total = mergedApps.length;
  const newApplicants = mergedApps.filter((a) => a.status === 'NEW').length;
  const shortlisted = mergedApps.filter((a) => a.status === 'SHORTLISTED' || a.status === 'INTERVIEW_SCHEDULED').length;
  const today = mergedApps.filter((a) => (a.created_at || '').slice(0, 10) === todayStr).length;
  const experienced = mergedApps.filter((a) => !a.experience?.toLowerCase().includes('fresher')).length;

  const metrics: DsaHiringMetrics = {
    total: backendMetrics.total ?? total,
    newApplicants: backendMetrics.newApplicants ?? newApplicants,
    shortlisted: backendMetrics.shortlisted ?? shortlisted,
    today: backendMetrics.today ?? today,
    experienced: backendMetrics.experienced ?? experienced
  };

  return {
    applications: mergedApps,
    metrics
  };
}

/**
 * Update DSA Application Status
 */
export async function updateDsaApplicationStatus(
  applicationId: string,
  newStatus: string,
  key: string
): Promise<boolean> {
  // Update local storage
  try {
    const localApps: DsaApplication[] = JSON.parse(localStorage.getItem('zippy_dsa_applications') || '[]');
    const updated = localApps.map((a) => (a.application_id === applicationId ? { ...a, status: newStatus } : a));
    localStorage.setItem('zippy_dsa_applications', JSON.stringify(updated));
  } catch {}

  // Update backend API
  try {
    const res = await fetch('/api/dsa_hiring.php?action=update_status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId, status: newStatus, key })
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Delete DSA Application
 */
export async function deleteDsaApplication(applicationId: string, key: string): Promise<boolean> {
  // Remove from local storage
  try {
    const localApps: DsaApplication[] = JSON.parse(localStorage.getItem('zippy_dsa_applications') || '[]');
    const filtered = localApps.filter((a) => a.application_id !== applicationId);
    localStorage.setItem('zippy_dsa_applications', JSON.stringify(filtered));
  } catch {}

  try {
    const res = await fetch('/api/dsa_hiring.php?action=delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId, key })
    });
    return res.ok;
  } catch {
    return false;
  }
}

