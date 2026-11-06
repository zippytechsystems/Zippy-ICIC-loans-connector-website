import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ChevronRight,
  CheckCircle2,
  FileText,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { LOANS_DATA } from '../data/loansData';
import { LoanIcon } from '../components/common/LoanIcon';
import { LoanEnquiryForm } from '../components/forms/LoanEnquiryForm';
import { EmiCalculator } from '../components/calculator/EmiCalculator';
import { SEOHead } from '../components/common/SEOHead';
import { BRAND_CONFIG } from '../config/brandConfig';

export const IndividualLoanDetails: React.FC = () => {
  const { loanSlug } = useParams<{ loanSlug: string }>();

  const loan = LOANS_DATA.find((l) => l.slug === loanSlug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!loan) {
    return <Navigate to="/services" replace />;
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <SEOHead
        title={`${loan.title} in Hyderabad | Rates, Eligibility & Documents`}
        description={loan.shortDescription}
        keywords={`${loan.title} Hyderabad, ${loan.title} interest rates Telangana, ${loan.title} eligibility, ${loan.title} documents required`}
      />

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-fintech-royal">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/services" className="hover:text-fintech-royal">Loan Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{loan.title}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-fintech-navy to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <LoanIcon name={loan.iconName} className="w-3.5 h-3.5" />
              <span>Verified Lending Category</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {loan.heroHeadline}
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              {loan.shortDescription}
            </p>

            {/* Metrics Ribbon */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block">Indicative Rate</span>
                <span className="text-sm sm:text-base font-bold text-white font-mono">{loan.indicativeRate}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block">Tenure Range</span>
                <span className="text-sm sm:text-base font-bold text-white font-mono">{loan.tenureRange}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block">Max Limit</span>
                <span className="text-sm sm:text-base font-bold text-orange-400 font-mono">{loan.maxAmount}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block">Turnaround</span>
                <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">{loan.processingTime}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#enquiry-form"
                className="px-6 py-3 rounded-xl bg-fintech-royal hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Apply for {loan.title}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#eligibility-criteria"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
              >
                Check Criteria
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Comprehensive Details */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Product Overview & Purpose
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {loan.fullDescription}
              </p>

              {/* Key Highlights */}
              <div className="pt-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                  Key Benefits & Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                  {loan.keyHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Eligibility Criteria */}
            <section id="eligibility-criteria" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 scroll-mt-24">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fintech-royal">
                <UserCheck className="w-4 h-4" />
                <span>Eligibility Parameters</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Who Can Apply?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <span className="text-slate-400 block font-semibold text-xs">Eligible Age Range</span>
                  <span className="font-bold text-slate-800">{loan.eligibility.ageRange}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <span className="text-slate-400 block font-semibold text-xs">Employment Classification</span>
                  <span className="font-bold text-slate-800">{loan.eligibility.employmentType}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <span className="text-slate-400 block font-semibold text-xs">Minimum Net Monthly Income</span>
                  <span className="font-bold text-slate-800">{loan.eligibility.minIncome}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <span className="text-slate-400 block font-semibold text-xs">Credit Score Recommendation</span>
                  <span className="font-bold text-emerald-600">{loan.eligibility.minCreditScore}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-fintech-royal shrink-0 mt-0.5" />
                <span><strong>Residential Requirement:</strong> {loan.eligibility.residence}</span>
              </div>
            </section>

            {/* Required Documentation */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fintech-royal">
                <FileText className="w-4 h-4" />
                <span>Verification Checklist</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Required Documents Checklist
              </h2>
              <p className="text-xs text-slate-500">
                Having clear photocopies ready helps prevent delays during lender appraisal:
              </p>

              <div className="space-y-4">
                {loan.requiredDocuments.map((docGroup, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {docGroup.category}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {docGroup.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Application Stages */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Application Journey for {loan.title}
              </h2>

              <div className="space-y-4">
                {loan.steps.map((st, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-fintech-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div className="pt-1 text-sm text-slate-700 leading-relaxed">
                      {st}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Loan Specific FAQs */}
            {loan.faqs && loan.faqs.length > 0 && (
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                  {loan.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 text-left font-bold text-sm text-slate-800 flex justify-between items-center gap-3 hover:bg-slate-50"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-fintech-royal' : ''}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interactive Calculator tuned for this loan */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <EmiCalculator defaultLoanType={loan.title} />
            </section>

            {/* Loan Disclaimers */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Specific Lender Disclosure:</strong> {loan.lenderDisclaimer}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Form & Quick Contact Card */}
          <div className="lg:col-span-4 space-y-6">
            <div id="enquiry-form" className="sticky top-28 space-y-6">
              
              <LoanEnquiryForm
                initialLoanCategory={loan.title}
                sourceContext={`Individual Product Page: ${loan.title}`}
              />

              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-3">
                <span className="font-bold text-slate-900 block text-sm">Need Direct Phone Assistance?</span>
                <p>Call our Hyderabad loan coordinator during working hours:</p>
                <a
                  href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
                  className="font-bold text-fintech-royal hover:underline block text-sm"
                >
                  {BRAND_CONFIG.contact.phoneDisplay}
                </a>
                <span className="text-[11px] text-slate-400 block">{BRAND_CONFIG.contact.businessHours}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};
