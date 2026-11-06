import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ShieldCheck,
  PhoneCall,
  Clock,
  CheckCircle
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { LoanEnquiryForm } from '../components/forms/LoanEnquiryForm';
import { SEOHead } from '../components/common/SEOHead';

export const ApplyForLoan: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('loan') || 'Personal Loans';
  const initialAmount = searchParams.get('amount') || '';

  return (
    <>
      <SEOHead
        title="Apply for Loan Online | Secure Loan Assistance Hyderabad"
        description="Submit your loan enquiry with Zippy ICICI Loan Connector. Fast, confidential loan referral and assistance for borrowers in Hyderabad, Secunderabad, and Telangana."
        keywords="Apply for loan Hyderabad, Personal loan application Hyderabad, Home loan enquiry Telangana, Business loan application"
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-fintech-navy to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 inline-block mb-3">
            Secure Digital Application
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Apply for Loan Assistance
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Connect with authorized lending channels across Hyderabad and Telangana. Simple 2-minute preliminary enquiry with zero upfront fees.
          </p>
        </div>
      </section>

      {/* Main Form & Trust Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Loan Form */}
          <div className="lg:col-span-8">
            <LoanEnquiryForm
              initialLoanCategory={initialCategory}
              initialAmount={initialAmount}
              sourceContext="Dedicated Apply Page"
            />
          </div>

          {/* Right Column: Reassurance & Process Information */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Security Guarantee Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Risk Guarantee</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Safe & Confidential
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We respect your personal privacy. In accordance with strict data protection and Indian banking guidelines:
              </p>
              
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>No Aadhaar or PAN</strong> collected on this web form.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero consultation charges:</strong> Our referral advisory is 100% free for applicants.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Explicit Consent:</strong> Your dossier is shared solely with authorized lending partners after your verbal agreement.</span>
                </li>
              </ul>
            </div>

            {/* Assistance Callback Box */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fintech-royal">
                <Clock className="w-4 h-4" />
                <span>Response Time</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">What Happens Next?</h4>
              <ol className="text-xs text-slate-600 space-y-2.5 list-decimal pl-4">
                <li>Your enquiry is assigned to our Hyderabad regional loan specialist.</li>
                <li>You receive a friendly phone callback within regular business hours to confirm your financial requirements.</li>
                <li>We review your document readiness and match you with the appropriate authorized lender desk.</li>
              </ol>
            </div>

            {/* Direct Phone Link */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-fintech-navy to-slate-900 text-white space-y-2">
              <span className="text-xs text-slate-400 block">Prefer to speak directly right now?</span>
              <a
                href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
                className="text-base font-extrabold text-amber-400 hover:underline flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{BRAND_CONFIG.contact.phoneDisplay.split('/')[0]}</span>
              </a>
              <span className="text-[11px] text-slate-400 block">
                {BRAND_CONFIG.contact.businessHours}
              </span>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};
