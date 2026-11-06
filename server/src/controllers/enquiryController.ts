import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { insertLoanEnquiry, getEnquiryByReference } from '../database.js';
import { generateEnquiryReference } from '../utils/referenceGenerator.js';
import { sanitizeString, sanitizeMobile, sanitizeAmount } from '../utils/sanitize.js';
import { maskMobile } from '../middleware/requestLogger.js';

// Indian Mobile Number Regex: 10 digits starting with 6, 7, 8, or 9
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

// Allowed Loan Categories matching the 12 official loan products
const ALLOWED_LOAN_CATEGORIES = [
  'Personal Loans',
  'Home Loans',
  'Business Loans',
  'Loan Against Property',
  'Vehicle Loans',
  'Construction Loans',
  'Home Renovation Loans',
  'Education Loans',
  'Consumer Loans',
  'Balance Transfer',
  'Top-Up Loans',
  'Medical Loans'
] as const;

// Enquiry Schema Definition
export const createEnquirySchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .min(3, 'Full name must contain at least 3 characters')
    .max(100, 'Full name cannot exceed 100 characters'),
  mobileNumber: z
    .string({ required_error: 'Mobile number is required' })
    .transform(sanitizeMobile)
    .refine((val) => INDIAN_MOBILE_REGEX.test(val), {
      message: 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9'
    }),
  email: z
    .string()
    .email('Invalid email address format')
    .max(150, 'Email cannot exceed 150 characters')
    .optional()
    .or(z.literal('')),
  loanCategory: z
    .string({ required_error: 'Loan category is required' })
    .refine((val) => ALLOWED_LOAN_CATEGORIES.includes(val as (typeof ALLOWED_LOAN_CATEGORIES)[number]) || val.length >= 3, {
      message: 'Please choose a valid loan category'
    }),
  requiredAmount: z
    .union([z.number(), z.string()])
    .transform(sanitizeAmount)
    .refine((val) => val >= 10000, {
      message: 'Minimum loan requirement is ₹10,000'
    })
    .refine((val) => val <= 1000000000, {
      message: 'Maximum loan amount cannot exceed ₹100 Crores'
    }),
  employmentType: z
    .string({ required_error: 'Employment type is required' })
    .min(2, 'Please select your employment type')
    .max(100),
  city: z
    .string({ required_error: 'City is required' })
    .min(2, 'City name is required')
    .max(100),
  monthlyIncome: z
    .union([z.number(), z.string()])
    .optional()
    .transform((val) => (val ? sanitizeAmount(val) : undefined)),
  additionalInfo: z
    .string()
    .max(1000, 'Additional information cannot exceed 1000 characters')
    .optional(),
  consent: z
    .boolean({ required_error: 'Consent confirmation is mandatory' })
    .refine((val) => val === true, {
      message: 'Explicit consent is mandatory to process loan enquiries'
    }),
  sourceContext: z
    .string()
    .max(100)
    .optional()
});

/**
 * POST /api/v1/loan-enquiries
 * Creates a new loan enquiry and returns an official reference ID
 */
export async function createEnquiryHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const validatedData = createEnquirySchema.parse(req.body);

    const referenceId = generateEnquiryReference();
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const consentTimestamp = new Date().toISOString();

    const record = insertLoanEnquiry({
      reference_id: referenceId,
      full_name: sanitizeString(validatedData.fullName, 150),
      mobile_number: validatedData.mobileNumber,
      email: validatedData.email ? sanitizeString(validatedData.email, 150).toLowerCase() : null,
      city: sanitizeString(validatedData.city, 100),
      loan_category: sanitizeString(validatedData.loanCategory, 100),
      required_amount: validatedData.requiredAmount,
      employment_type: sanitizeString(validatedData.employmentType, 100),
      monthly_income: validatedData.monthlyIncome ?? null,
      additional_info: validatedData.additionalInfo ? sanitizeString(validatedData.additionalInfo, 1000) : null,
      source_context: sanitizeString(validatedData.sourceContext || 'Website Loan Enquiry Form', 100),
      status: 'NEW',
      consent_given: 1,
      consent_timestamp: consentTimestamp,
      ip_address: typeof clientIp === 'string' ? clientIp.slice(0, 45) : null,
      user_agent: typeof userAgent === 'string' ? userAgent.slice(0, 255) : null
    });

    console.log(`[LOAN_ENQUIRY_CREATED] Ref: ${referenceId} | Category: ${record.loan_category} | Mobile: ${maskMobile(record.mobile_number)}`);

    res.status(201).json({
      success: true,
      referenceId: record.reference_id,
      message: 'Loan enquiry registered successfully. Our Hyderabad team will review and connect you with authorized lending channels.',
      data: {
        referenceId: record.reference_id,
        fullName: record.full_name,
        loanCategory: record.loan_category,
        requiredAmount: record.required_amount,
        status: record.status,
        createdAt: consentTimestamp
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/v1/loan-enquiries/:refId
 * Fetch status of an existing enquiry by reference ID (safe public fields only)
 */
export async function getEnquiryStatusHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { refId } = req.params;
    if (!refId || typeof refId !== 'string') {
      res.status(400).json({ success: false, error: 'BAD_REQUEST', message: 'Reference ID is required' });
      return;
    }

    const enquiry = getEnquiryByReference(refId.trim());
    if (!enquiry) {
      res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'No loan enquiry found matching the specified reference ID.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        referenceId: enquiry.reference_id,
        loanCategory: enquiry.loan_category,
        city: enquiry.city,
        status: enquiry.status,
        createdAt: enquiry.created_at
      }
    });
  } catch (err) {
    next(err);
  }
}
