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
  FileText,
  Mail,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { LOANS_DATA } from '../../data/loansData';
import { submitLoanEnquiry, generateClientFallbackRef } from '../../services/api';

interface FormProps {
  initialLoanCategory?: string;
  initialAmount?: string;
  sourceContext?: string;
}

interface FormState {
  fullName: string;
  mobileNumber: string;
  email: string;
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
    email: '',
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
  const [whatsappChatUrl, setWhatsappChatUrl] = useState('');

  // Validate Indian Mobile Number: 10 digits starting with 6, 7, 8, or 9
  const validateMobile = (num: string) => {
    const cleaned = num.replace(/\D/g, '');
    const regex = /^[6-9]\d{9}$/;
    return regex.test(cleaned);
  };

  // Optional email format validation
  const validateEmail = (em: string) => {
    if (!em.trim()) return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(em.trim());
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

    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address or leave blank';
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

    // 1. Generate Official Reference ID immediately (ZIP-YYYYMMDD-XXXX)
    const officialRef = generateClientFallbackRef();
    setReferenceId(officialRef);

    // 2. Generate Professional WhatsApp Message containing customer's submitted details
    const professionalWhatsAppMessage = 
`*New Loan Enquiry - Zippy DSA Loans*
Ref ID: *${officialRef}*

*Customer Details:*
• Name: ${formData.fullName.trim()}
• Mobile: +91 ${formData.mobileNumber}
${formData.email.trim() ? `• Email: ${formData.email.trim()}\n` : ''}• City: ${formData.city}

*Loan Requirement:*
• Loan Type: *${formData.loanCategory}*
• Requested Amount: *₹${formData.requiredAmount}*
• Employment: ${formData.employmentType}
${formData.monthlyIncome ? `• Monthly Income: ₹${formData.monthlyIncome}\n` : ''}${formData.additionalInfo ? `• Notes: ${formData.additionalInfo.trim()}\n` : ''}
Hello Zippy DSA Loans Advisor, I have submitted my enquiry and would like guidance on suitable lender options.`;

    // 3. Construct official WhatsApp click-to-chat URL (+91 6302690251)
    const chatUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(professionalWhatsAppMessage)}`;
    setWhatsappChatUrl(chatUrl);

    // 4. Open WhatsApp immediately on submit
    try {
      window.open(chatUrl, '_blank', 'noopener,noreferrer');
    } catch (popupErr) {
      console.info('Auto popup restricted. Fallback CTA active on screen.', popupErr);
    }

    // 5. Asynchronously persist enquiry into Hostinger MySQL Database
    submitLoanEnquiry({
      ...formData,
      clientReferenceId: officialRef,
      sourceContext
    })
      .then((apiResponse) => {
        console.log('[ENQUIRY_PERSISTED_DATABASE]', apiResponse);
        // Save to localStorage for customer's session reference
        try {
          const stored = JSON.parse(localStorage.getItem('zippy_loan_enquiries') || '[]');
          stored.push({
            ref: officialRef,
            timestamp: new Date().toISOString(),
            category: formData.loanCategory,
            amount: formData.requiredAmount,
            city: formData.city,
            savedToDatabase: apiResponse.savedToDatabase,
            context: sourceContext
          });
          localStorage.setItem('zippy_loan_enquiries', JSON.stringify(stored));
        } catch {
          // ignore
        }
      })
      .catch((err) => {
        console.warn('[DATABASE_ASYNC_NOTICE]', err);
      })
      .finally(() => {
        setIsSubmitting(false);
        setSubmittedSuccess(true);
      });
  };

  const handleReset = () => {
    setSubmittedSuccess(false);
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
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
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-xl text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4 shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-2 border border-emerald-200">
          Enquiry Registered Successfully
        </span>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Thank You, {formData.fullName}!
        </h3>

        <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6">
          Your enquiry for <strong className="text-slate-900">{formData.loanCategory}</strong> (Amount: <strong className="text-slate-900">₹{formData.requiredAmount}</strong>) has been logged in our referral system.
        </p>

        {/* Reference ID card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto mb-6">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
            Official Enquiry Reference ID
          </div>
          <div className="text-xl sm:text-2xl font-mono font-extrabold text-fintech-royal tracking-wider">
            {referenceId}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Please quote this Reference ID during communication</p>
        </div>

        {/* Action Instruction: Step to complete in WhatsApp */}
        <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-5 max-w-lg mx-auto text-left mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-xs">
              👉
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-amber-950 uppercase tracking-wide">
                Next Step: Confirm on WhatsApp
              </h4>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                We have generated your enquiry details and redirected to WhatsApp.
                <strong> Please click "Send" in WhatsApp</strong> to deliver your message to our Hyderabad loan advisor.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 mb-8">
          <a
            href={whatsappChatUrl || `https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(`Hello Zippy DSA Loans, I have submitted an enquiry with Ref ${referenceId}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 group"
          >
            <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Open WhatsApp & Press Send</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>

        {/* Official Contact Box */}
        <div className="border-t border-slate-200 pt-6 max-w-lg mx-auto text-center">
          <p className="text-xs text-slate-500 font-semibold mb-3 uppercase tracking-wider">
            Official Loan Assistance Channels
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <a
              href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-fintech-royal font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>{BRAND_CONFIG.contact.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>+91 63026 90251</span>
            </a>
            <a
              href={`mailto:${BRAND_CONFIG.contact.email}`}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-fintech-royal font-medium transition-colors flex items-center justify-center gap-1.5 truncate"
              title={BRAND_CONFIG.contact.email}
            >
              <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{BRAND_CONFIG.contact.email}</span>
            </a>
          </div>
        </div>

        {/* Security Reassurance */}
        <div className="mt-6 p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900 text-left flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-fintech-royal shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong>Security Reminder:</strong> Zippy DSA Loans will never ask for your Aadhaar card number, PAN card physical copies, bank passwords, or OTPs. All loan evaluation and approvals are executed solely by authorized lenders.
          </p>
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

        {/* Row 4: Monthly Income & Email (Both Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Monthly Income */}
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
                placeholder="e.g. 75,000"
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

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="e.g. yourname@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all bg-white ${
                  errors.email
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-fintech-royal focus:ring-blue-100'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.email}
              </p>
            )}
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
            className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-fintech-royal via-blue-700 to-fintech-navy hover:from-blue-700 hover:to-blue-900 shadow-md shadow-blue-500/25 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed text-base"
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
