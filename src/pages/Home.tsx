import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { LOANS_DATA } from '../data/loansData';
import { LoanCard } from '../components/loans/LoanCard';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { EmiCalculator } from '../components/calculator/EmiCalculator';
import { LoanEnquiryForm } from '../components/forms/LoanEnquiryForm';
import { SEOHead } from '../components/common/SEOHead';

export const Home: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Find the Right Loan for Your Financial Needs | Loan Assistance Hyderabad"
        description="Zippy ICICI Loan Connector provides personalized loan guidance, preliminary eligibility checks, and authorized lender referral assistance in Hyderabad, Secunderabad, and Telangana."
        keywords="Loan Assistance Hyderabad, Personal Loans Hyderabad, Home Loans Hyderabad, Business Loans Hyderabad, Loan Against Property Hyderabad, Loan Enquiry Hyderabad, Loan Assistance Telangana"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-fintech-navy to-[#06101E] text-white pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
        {/* Background glow and geometric mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.12),transparent_40%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Region & Badge tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                <span>Dedicated Loan Referral Desk for {BRAND_CONFIG.targetRegion}</span>
              </div>

              {/* Required Exact Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Find the Right Loan for Your Financial Needs
              </h1>

              {/* Required Exact Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Explore suitable loan options with personalized guidance and assistance throughout your loan application journey.
              </p>

              {/* Highlight bullet points */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200 text-left max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Personalized loan feasibility review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent interest & EMI simulations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Authorized lender channel connection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero upfront customer consulting fees</span>
                </div>
              </div>

              {/* Required Exact Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/eligibility"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-fintech-royal via-blue-600 to-fintech-royal hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-base"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="#loan-categories"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all duration-200 flex items-center justify-center gap-2 text-base backdrop-blur-sm"
                >
                  <span>Explore Loan Options</span>
                </a>
              </div>

              {/* Local Area Trust indicators */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>Hyderabad • Secunderabad • Cyberabad</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Fast 24-hr consultation callback</span>
                </span>
              </div>
            </div>

            {/* Right Column: Premium Fintech Consultation Card / Visual Element */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-orange-500 opacity-20 blur-xl"></div>

                <div className="relative rounded-3xl bg-slate-900/90 border border-slate-700/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                        Z
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Loan Advisory Concierge</h4>
                        <p className="text-[11px] text-slate-400">Authorized Lending Referral Services</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                      Active
                    </span>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 gap-3 my-5">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[11px] text-slate-400 block mb-0.5">Indicative Rates</span>
                      <span className="text-lg font-bold text-white font-mono">From 8.50%*</span>
                      <span className="text-[10px] text-slate-500 block">Per annum</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[11px] text-slate-400 block mb-0.5">Max Tenure</span>
                      <span className="text-lg font-bold text-orange-400 font-mono">Up to 30 Yrs</span>
                      <span className="text-[10px] text-slate-500 block">Home / LAP Loans</span>
                    </div>
                  </div>

                  {/* Quick Feature Checklist */}
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-800/40">
                      <span>Personal Loan Consultation</span>
                      <span className="font-semibold text-emerald-400">Up to ₹50 Lakhs</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-800/40">
                      <span>Home & Construction Loans</span>
                      <span className="font-semibold text-emerald-400">Up to ₹10 Crores</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-800/40">
                      <span>Business & MSME Credit</span>
                      <span className="font-semibold text-emerald-400">Collateral Free</span>
                    </div>
                  </div>

                  {/* Direct Action */}
                  <div className="mt-6 pt-5 border-t border-slate-800">
                    <Link
                      to="/apply"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span>Start Confidential Enquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Small statutory footnote */}
                  <p className="text-[10px] text-slate-500 text-center mt-3 leading-tight">
                    *Independent referral entity. All sanctions, pricing & loan terms depend on partner lenders.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Loan Categories Section (All 12 Categories) */}
      <section id="loan-categories" className="py-20 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-fintech-royal px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 inline-block mb-3">
              Comprehensive Financing Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Loan Categories
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Discover verified loan categories available through authorized lender channels. Each product includes detailed eligibility criteria, required documentation, and transparent advisory guidance.
            </p>
          </div>

          {/* 12 Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {LOANS_DATA.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))}
          </div>

          {/* Product Availability & Lender Disclosure Notice */}
          <div className="mt-12 p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 shadow-xs max-w-4xl mx-auto text-center leading-relaxed">
            <p>
              <strong className="text-slate-900">Product Availability Notice:</strong> We display loan categories that are verified as accessible through relevant authorized lender and institutional partner networks. We do not represent or imply that all listed products originate exclusively from ICICI Bank or any single financial institution.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Interactive EMI Calculator Section */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmiCalculator defaultLoanType="Personal Loans" defaultAmount={1500000} defaultRate={10.75} defaultTenureYears={5} />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Direct Online Enquiry Form Section */}
      <section id="enquiry-form" className="py-20 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-fintech-royal px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 inline-block mb-2">
              Confidential & Fast
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Submit Your Loan Enquiry
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Receive personalized loan guidance tailored for borrowers in Hyderabad and Telangana.
            </p>
          </div>

          <LoanEnquiryForm initialLoanCategory="Personal Loans" sourceContext="Home Page Bottom Form" />
        </div>
      </section>
    </>
  );
};
