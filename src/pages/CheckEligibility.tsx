import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Loader2,
  User,
  MapPin,
  IndianRupee,
  Briefcase,
  Check,
  RotateCcw
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { LOANS_DATA } from '../data/loansData';
import { LoanIcon } from '../components/common/LoanIcon';
import { EmiCalculator } from '../components/calculator/EmiCalculator';
import { SEOHead } from '../components/common/SEOHead';

interface StepData {
  // Step 1
  loanType: string;
  // Step 2
  fullName: string;
  mobileNumber: string;
  city: string;
  // Step 3
  requiredAmount: string;
  employmentType: string;
  monthlyIncome: string;
  // Step 4
  consent: boolean;
}

export const CheckEligibility: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<StepData>({
    loanType: 'Personal Loans',
    fullName: '',
    mobileNumber: '',
    city: 'Hyderabad',
    requiredAmount: '10,00,000',
    employmentType: 'Salaried',
    monthlyIncome: '65,000',
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const steps = [
    { number: 1, title: 'Loan Type', desc: 'Select Category' },
    { number: 2, title: 'Basic Details', desc: 'Name & Contact' },
    { number: 3, title: 'Requirements', desc: 'Amount & Income' },
    { number: 4, title: 'Review & Consent', desc: 'Submit Enquiry' },
  ];

  const validateMobile = (num: string) => {
    const cleaned = num.replace(/\D/g, '');
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.loanType) {
        newErrors.loanType = 'Please select a loan type';
      }
    } else if (step === 2) {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
        newErrors.fullName = 'Please enter your full legal name (min 3 characters)';
      }
      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = 'Please enter your 10-digit mobile number';
      } else if (!validateMobile(formData.mobileNumber)) {
        newErrors.mobileNumber = 'Enter a valid 10-digit Indian mobile number (starts with 6, 7, 8 or 9)';
      }
      if (!formData.city) {
        newErrors.city = 'Please select your city in Telangana';
      }
    } else if (step === 3) {
      const amt = parseInt(formData.requiredAmount.replace(/\D/g, ''), 10);
      if (!formData.requiredAmount || isNaN(amt) || amt < 10000) {
        newErrors.requiredAmount = 'Please enter a valid loan amount (min ₹10,000)';
      }
      if (!formData.employmentType) {
        newErrors.employmentType = 'Please choose your employment type';
      }
    } else if (step === 4) {
      if (!formData.consent) {
        newErrors.consent = 'You must give consent to proceed with this eligibility enquiry';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ref = `ZIP-ELIG-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(ref);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCurrentStep(1);
    setFormData({
      loanType: 'Personal Loans',
      fullName: '',
      mobileNumber: '',
      city: 'Hyderabad',
      requiredAmount: '10,00,000',
      employmentType: 'Salaried',
      monthlyIncome: '65,000',
      consent: false
    });
    setErrors({});
  };

  return (
    <>
      <SEOHead
        title="Check Loan Eligibility Online | Zippy DSA Loans Hyderabad"
        description="Check preliminary loan eligibility in Hyderabad. 4-step frontend enquiry for personal, home, and business loans with Zippy DSA Loans (Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana)."
        keywords="Check Loan Eligibility Hyderabad, Zippy DSA Loans, Loan Eligibility Calculator, Loan Enquiry Telangana"
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-primary via-[#0D213F] to-primary text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 inline-block mb-3">
            Preliminary Loan Guidance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Check Your Preliminary Loan Eligibility
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Complete our 4-step eligibility enquiry to share your borrowing requirements. Our Hyderabad referral advisors will review and assist you with suitable loan avenues.
          </p>
        </div>
      </section>

      {/* Multi-Step Wizard Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Important Regulatory Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-950 flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-900 block font-semibold mb-0.5">
              Preliminary Enquiry Notice:
            </strong>
            <p>
              {BRAND_CONFIG.disclaimers.eligibilityNotice} Final loan eligibility, credit limits, interest rates, and loan sanctions are determined solely by the sanctioning bank based on full underwriting and verified credit documentation.
            </p>
          </div>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-5">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-2">
              Eligibility Enquiry Logged
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Thank You, {formData.fullName}!
            </h3>

            <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6">
              Your preliminary eligibility enquiry for <strong className="text-slate-900">{formData.loanType}</strong> (₹{formData.requiredAmount}) has been received. Our Hyderabad loan advisor will review your profile and reach out on <strong className="text-slate-900">+91 {formData.mobileNumber}</strong>.
            </p>

            {/* Reference ID Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto mb-6">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                Enquiry Reference Number
              </div>
              <div className="text-2xl font-mono font-extrabold text-secondary tracking-wider">
                {referenceId}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Please quote this reference number during consultation
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start New Enquiry</span>
              </button>
              <Link
                to="/services"
                className="px-6 py-2.5 rounded-xl bg-secondary text-white hover:bg-blue-700 text-sm font-semibold shadow-md transition-colors"
              >
                Explore Loan Services
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-Step Card */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>

            {/* Progress Stepper Indicator */}
            <div className="mb-10">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
                {steps.map((s) => {
                  const isCompleted = currentStep > s.number;
                  const isCurrent = currentStep === s.number;
                  return (
                    <div key={s.number} className="flex flex-col items-center text-center">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 mb-2 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : isCurrent
                            ? 'bg-secondary text-white ring-4 ring-blue-100 shadow-md'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : s.number}
                      </div>
                      <span className={`text-[11px] sm:text-xs font-bold leading-tight ${isCurrent ? 'text-secondary' : 'text-slate-600'}`}>
                        {s.title}
                      </span>
                      <span className="hidden sm:block text-[10px] text-slate-400 mt-0.5">
                        {s.desc}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar Track */}
              <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step Form Body */}
            <form onSubmit={handleSubmit} noValidate>
              
              {/* STEP 1: Select Loan Type */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                      Step 1 of 4
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                      Which loan category are you seeking?
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose the product that matches your requirement in Hyderabad or Telangana.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {LOANS_DATA.map((loan) => {
                      const isSelected = formData.loanType === loan.title;
                      return (
                        <div
                          key={loan.id}
                          onClick={() => setFormData({ ...formData, loanType: loan.title })}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                            isSelected
                              ? 'border-secondary bg-blue-50/70 shadow-xs ring-2 ring-blue-200'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-secondary text-white' : 'bg-slate-100 text-secondary'
                          }`}>
                            <LoanIcon name={loan.iconName} className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block leading-snug">
                              {loan.title}
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              {loan.indicativeRate}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.loanType && (
                    <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.loanType}
                    </p>
                  )}
                </div>
              )}

              {/* STEP 2: Basic Details */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                      Step 2 of 4
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                      Enter Your Basic Details
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      We use these details solely to connect with you regarding your loan enquiry.
                    </p>
                  </div>

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
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-secondary"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.fullName}</p>
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
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-secondary"
                      />
                    </div>
                    {errors.mobileNumber && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.mobileNumber}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      City / Location in Telangana <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-secondary"
                      >
                        {BRAND_CONFIG.serviceAreas.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>
                    {errors.city && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.city}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: Loan Requirements */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                      Step 3 of 4
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                      Loan Requirements & Employment
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Specify the loan amount you require and your current employment status.
                    </p>
                  </div>

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
                          setFormData({
                            ...formData,
                            requiredAmount: raw ? Number(raw).toLocaleString('en-IN') : ''
                          });
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-secondary"
                      />
                    </div>
                    {errors.requiredAmount && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.requiredAmount}</p>
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
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-secondary"
                      >
                        <option value="Salaried">Salaried (Private / MNC / IT / Govt)</option>
                        <option value="Self-Employed Professional">Self-Employed Professional (Doctor, CA, Lawyer)</option>
                        <option value="Self-Employed Business">Self-Employed Business / MSME Owner</option>
                        <option value="Other">Other / Consultant / NRI</option>
                      </select>
                    </div>
                  </div>

                  {/* Monthly Income (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Net Monthly Income (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <IndianRupee className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. 75,000 (Helps match relevant bank policy tiers)"
                        value={formData.monthlyIncome}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^0-9]/g, '');
                          setFormData({
                            ...formData,
                            monthlyIncome: raw ? Number(raw).toLocaleString('en-IN') : ''
                          });
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-secondary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review, Consent & Submit */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                      Step 4 of 4
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                      Review & Submit Enquiry
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Verify your summary before submitting your loan assistance request.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Loan Category:</span>
                      <strong className="text-slate-900 font-bold">{formData.loanType}</strong>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Applicant Name:</span>
                      <strong className="text-slate-900 font-bold">{formData.fullName}</strong>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Mobile Number:</span>
                      <strong className="text-slate-900 font-bold">+91 {formData.mobileNumber}</strong>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Target Location:</span>
                      <strong className="text-slate-900 font-bold">{formData.city}</strong>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Requested Amount:</span>
                      <strong className="text-secondary font-bold text-sm">₹ {formData.requiredAmount}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Employment Type:</span>
                      <strong className="text-slate-900 font-bold">{formData.employmentType}</strong>
                    </div>
                  </div>

                  {/* Privacy & No Aadhaar Assurance */}
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>
                      {BRAND_CONFIG.disclaimers.noAadhaarNotice}
                    </span>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-secondary focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 leading-normal">
                        {BRAND_CONFIG.disclaimers.consentText}{' '}
                        <Link to="/privacy-policy" className="text-secondary hover:underline font-semibold" target="_blank">
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link to="/terms-conditions" className="text-secondary hover:underline font-semibold" target="_blank">
                          Terms & Conditions
                        </Link>.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.consent}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Actions (Back / Next / Submit) */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-secondary to-blue-700 hover:from-blue-700 hover:to-primary text-white text-sm font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Eligibility Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Eligibility Enquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Embedded Companion EMI Calculator */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmiCalculator defaultLoanType={formData.loanType} />
        </div>
      </section>
    </>
  );
};
