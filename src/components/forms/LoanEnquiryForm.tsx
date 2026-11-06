import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
  Lock,
  PhoneCall,
  User,
  MapPin,
  Briefcase,
  IndianRupee,
  FileText
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { LOANS_DATA } from '../../data/loansData';

interface FormProps {
  initialLoanCategory?: string;
  initialAmount?: string;
  sourceContext?: string;
}

interface FormState {
  fullName: string;
  mobileNumber: string;
  city: string;
  loanCategory: string;
  requiredAmount: string;
  employmentType: string;
  monthlyIncome: string;
  additionalInfo: string;
  consent: boolean;
}

export const LoanEnquiryForm: React.FC<FormProps> = ({
  initialLoanCategory = '',
  initialAmount = '',
  sourceContext = 'General Web Enquiry'
}) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    mobileNumber: '',
    city: 'Hyderabad',
    loanCategory: initialLoanCategory || 'Personal Loans',
    requiredAmount: initialAmount || '',
    employmentType: 'Salaried',
    monthlyIncome: '',
    additionalInfo: '',
    consent: false
  });

  useEffect(() => {
    if (initialLoanCategory) {
      setFormData(prev => ({ ...prev, loanCategory: initialLoanCategory }));
    }
    if (initialAmount) {
      setFormData(prev => ({ ...prev, requiredAmount: initialAmount }));
    }
  }, [initialLoanCategory, initialAmount]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Validate Indian Mobile Number: 10 digits starting with 6, 7, 8, or 9
  const validateMobile = (num: string) => {
    const cleaned = num.replace(/\D/g, '');
    const regex = /^[6-9]\d{9}$/;
    return regex.test(cleaned);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full legal name (minimum 3 characters)';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter your 10-digit mobile number';
    } else if (!validateMobile(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit Indian mobile number (e.g. 9876543210)';
    }

    if (!formData.city) {
      newErrors.city = 'Please select your current city or district';
    }

    if (!formData.loanCategory) {
      newErrors.loanCategory = 'Please choose a loan category';
    }

    const amountNum = parseInt(formData.requiredAmount.replace(/\D/g, ''), 10);
    if (!formData.requiredAmount || isNaN(amountNum) || amountNum < 10000) {
      newErrors.requiredAmount = 'Please enter a valid loan amount (minimum ₹10,000)';
    }

    if (!formData.employmentType) {
      newErrors.employmentType = 'Please select your employment type';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must provide consent before your enquiry can be processed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable submission & reference generation
    setTimeout(() => {
      const randomRef = `ZIP-HYD-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(randomRef);

      // Save submission record safely to localStorage for user's personal session review
      try {
        const stored = JSON.parse(localStorage.getItem('zippy_loan_enquiries') || '[]');
        stored.push({
          ref: randomRef,
          timestamp: new Date().toISOString(),
          category: formData.loanCategory,
          amount: formData.requiredAmount,
          city: formData.city,
          context: sourceContext
        });
        localStorage.setItem('zippy_loan_enquiries', JSON.stringify(stored));
      } catch (err) {
        // Ignore storage exceptions
      }

      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setSubmittedSuccess(false);
    setFormData({
      fullName: '',
      mobileNumber: '',
      city: 'Hyderabad',
      loanCategory: 'Personal Loans',
      requiredAmount: '',
      employmentType: 'Salaried',
      monthlyIncome: '',
      additionalInfo: '',
      consent: false
    });
    setErrors({});
  };

  if (submittedSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-5">
          <CheckCircle className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-2">
          Enquiry Received Successfully
        </span>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Thank You, {formData.fullName}!
        </h3>

        <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6">
          Your loan enquiry for <strong className="text-slate-900">{formData.loanCategory}</strong> has been logged. Our Hyderabad referral specialist will contact you on <strong className="text-slate-900">+91 {formData.mobileNumber}</strong> within working hours.
        </p>

        {/* Reference ID card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto mb-6">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
            Enquiry Reference ID
          </div>
          <div className="text-xl font-mono font-extrabold text-fintech-royal tracking-wider">
            {referenceId}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Please quote this ID for future follow-up</p>
        </div>

        {/* Security reassurance banner */}
        <div className="bg-blue-50/70 border border-blue-200/60 rounded-xl p-3.5 max-w-md mx-auto text-xs text-blue-900 text-left mb-6 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-fintech-royal shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Important Security Assurance:</span>
            <span>We will never ask for your passwords, OTPs, or cash payments. The loan evaluation will be conducted through authorized lending partner protocols.</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors"
          >
            Submit Another Enquiry
          </button>
          <a
            href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(`Hello Zippy ICICI Loan Connector, I have submitted an enquiry with Reference ID ${referenceId} for ${formData.loanCategory}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-fintech-navy via-fintech-royal to-orange-500"></div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fintech-royal mb-1.5">
          <Lock className="w-3.5 h-3.5" />
          <span>Confidential Loan Enquiry Portal</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Request Loan Assistance
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          Tell us about your loan requirement. Our Hyderabad team will review and connect you with authorized lending channels.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Row 1: Full Name & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. Ramesh Reddy"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.fullName
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-300 focus:border-fintech-royal focus:ring-blue-100 bg-white'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mobile Number (10 Digits) <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex rounded-xl shadow-xs">
              <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-semibold">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={formData.mobileNumber}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData({ ...formData, mobileNumber: cleaned });
                }}
                className={`w-full px-3.5 py-2.5 rounded-r-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.mobileNumber
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-300 focus:border-fintech-royal focus:ring-blue-100 bg-white'
                }`}
              />
            </div>
            {errors.mobileNumber && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.mobileNumber}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: City & Loan Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* City */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              City / Location <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal transition-all"
              >
                {BRAND_CONFIG.serviceAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            {errors.city && (
              <p className="mt-1 text-xs text-rose-500 font-medium">{errors.city}</p>
            )}
          </div>

          {/* Loan Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Loan Category <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FileText className="w-4 h-4" />
              </div>
              <select
                value={formData.loanCategory}
                onChange={(e) => setFormData({ ...formData, loanCategory: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal transition-all"
              >
                {LOANS_DATA.map((l) => (
                  <option key={l.id} value={l.title}>
                    {l.title}
                  </option>
                ))}
              </select>
            </div>
            {errors.loanCategory && (
              <p className="mt-1 text-xs text-rose-500 font-medium">{errors.loanCategory}</p>
            )}
          </div>
        </div>

        {/* Row 3: Required Loan Amount & Employment Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Required Loan Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Required Loan Amount (₹) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. 15,00,000"
                value={formData.requiredAmount}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, '');
                  if (!raw) {
                    setFormData({ ...formData, requiredAmount: '' });
                  } else {
                    const formatted = Number(raw).toLocaleString('en-IN');
                    setFormData({ ...formData, requiredAmount: formatted });
                  }
                }}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.requiredAmount
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slate-300 focus:border-fintech-royal focus:ring-blue-100 bg-white'
                }`}
              />
            </div>
            {errors.requiredAmount && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.requiredAmount}
              </p>
            )}
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Employment Type <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal transition-all"
              >
                <option value="Salaried">Salaried (Private / MNC / IT / Govt)</option>
                <option value="Self-Employed Professional">Self-Employed Professional (Doctor, CA, Lawyer, Architect)</option>
                <option value="Self-Employed Business">Self-Employed Business / MSME Owner</option>
                <option value="Contractor / Consultant">Independent Consultant / Contractor</option>
                <option value="Other">Other / Retired / NRI</option>
              </select>
            </div>
            {errors.employmentType && (
              <p className="mt-1 text-xs text-rose-500 font-medium">{errors.employmentType}</p>
            )}
          </div>
        </div>

        {/* Row 4: Monthly Income (Optional) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Net Monthly Income / Turnover (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <IndianRupee className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="e.g. 75,000 (Helps us check lender eligibility brackets faster)"
              value={formData.monthlyIncome}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, '');
                if (!raw) {
                  setFormData({ ...formData, monthlyIncome: '' });
                } else {
                  const formatted = Number(raw).toLocaleString('en-IN');
                  setFormData({ ...formData, monthlyIncome: formatted });
                }
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal transition-all bg-white"
            />
          </div>
        </div>

        {/* Row 5: Additional Information */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Additional Information / Specific Loan Requirements
          </label>
          <textarea
            rows={2}
            placeholder="Tell us about your property location, preferred bank, ongoing loans to consolidate, or specific queries..."
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal transition-all resize-none bg-white"
          ></textarea>
        </div>

        {/* Security & Data Protection Notice */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-800">Data Privacy Assurance:</strong> {BRAND_CONFIG.disclaimers.noAadhaarNotice}
          </p>
        </div>

        {/* Explicit Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-fintech-royal focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-xs text-slate-600 leading-normal">
              {BRAND_CONFIG.disclaimers.consentText}{' '}
              <Link to="/privacy-policy" className="text-fintech-royal hover:underline font-semibold" target="_blank">
                Read Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/terms-conditions" className="text-fintech-royal hover:underline font-semibold" target="_blank">
                Terms of Service
              </Link>.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.consent}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-fintech-royal via-blue-700 to-fintech-navy hover:from-blue-700 hover:to-blue-900 shadow-md shadow-blue-500/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed text-base"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Validating & Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Loan Enquiry</span>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-[11px] text-slate-400">
          *No fee or credit card details required. Submitting this form does not impact your credit score.
        </p>
      </form>
    </div>
  );
};
