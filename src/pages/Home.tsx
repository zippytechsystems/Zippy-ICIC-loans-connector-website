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
import { LocalSeoHub } from '../components/home/LocalSeoHub';
import { EmiCalculator } from '../components/calculator/EmiCalculator';
import { LoanEnquiryForm } from '../components/forms/LoanEnquiryForm';
import { SEOHead } from '../components/common/SEOHead';
import { HeroImageSlider } from '../components/home/HeroImageSlider';
import { ZippyEnterprisesSection } from '../components/home/ZippyEnterprisesSection';
import { JobVacancyWidget } from '../components/home/JobVacancyWidget';

export const Home: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Zippy DSA Loans | Find the Right Loan for Your Financial Needs | Hyderabad"
        description="Zippy DSA Loans is a genuine DSA office in Nacharam, Hyderabad (4-1-19 Sneha Apartments, HMT Nagar). Personalized guidance, eligibility checks, and authorized bank loan referral assistance in Telangana."
        keywords="Zippy DSA Loans, Genuine DSA Loans Hyderabad, DSA Office Nacharam, Loan Assistance Hyderabad, Home Loans Hyderabad, Business Loans Hyderabad, Personal Loans Hyderabad"
      />

      {/* 1. TOP HERO IMAGE SLIDER: ABSOLUTE FIRST THING USER SEES FOR MAXIMUM IMPRESSION */}
      <HeroImageSlider />

      {/* 2. ADVISORY & FINANCIAL CONSULTATION HERO SECTION (EXACT 2-COLUMN FROM IMAGE) */}
      <section className="relative bg-gradient-to-b from-primary via-[#0D213F] to-[#0A1B33] text-white py-14 lg:py-20 overflow-hidden border-b border-slate-800">
        {/* Background glow and subtle accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(23,105,170,0.22),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_40%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Region & Badge tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span>Dedicated Loan Referral Desk for {BRAND_CONFIG.targetRegion}</span>
              </div>

              {/* Required Exact Headline */}
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2] sm:leading-[1.15]">
                Find the Right Loan for Your Financial Needs
              </h2>

              {/* Required Exact Description */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Explore suitable loan options with personalized guidance and assistance throughout your loan application journey.
              </p>

              {/* Highlight bullet points */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-200 text-left max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Personalized loan feasibility review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent Interest & EMI simulations</span>
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
              <div className="pt-4 flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <a
                  href="#loan-categories"
                  className="w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-secondary via-blue-600 to-secondary hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base text-center"
                >
                  <span>Explore Loan Options</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                <Link
                  to="/eligibility"
                  className="w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base backdrop-blur-sm text-center"
                >
                  <span>Check Eligibility</span>
                </Link>
              </div>

              {/* Local Area Trust indicators */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>Genuine DSA Office: 4-1-19 Sneha Apartments, HMT Nagar, Nacharam</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Fast 24-hr consultation callback</span>
                </span>
              </div>
            </div>

            {/* Right Column: Premium Financial Consultation Hero Card (Exactly matching the photo) */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-secondary to-accent opacity-20 blur-xl"></div>

                <div className="relative rounded-3xl bg-slate-900/95 border border-slate-700/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg">
                        Z
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Financial Consultation Desk</h4>
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
                      <span className="text-lg font-bold text-white font-mono">From 8.00%*</span>
                      <span className="text-[10px] text-slate-500 block">Per annum</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[11px] text-slate-400 block mb-0.5">Max Tenure</span>
                      <span className="text-lg font-bold text-accent font-mono">Up to 30 Yrs</span>
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

                  {/* Direct Action Button */}
                  <div className="mt-6 pt-5 border-t border-slate-800">
                    <Link
                      to="/apply"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-accent to-amber-600 hover:from-amber-600 hover:to-accent text-white font-bold text-sm shadow-md hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
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

          {/* Quick Trust Highlights Strip */}
          <div className="mt-12 pt-8 border-t border-slate-800/70 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition-all">
              <span className="text-xl sm:text-2xl font-extrabold text-white font-mono block">From 8.00%*</span>
              <span className="text-xs text-slate-400 mt-1 block">Indicative Home & Loan Rates</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition-all">
              <span className="text-xl sm:text-2xl font-extrabold text-accent font-mono block">Up to 30 Yrs</span>
              <span className="text-xs text-slate-400 mt-1 block">Flexible Repayment</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition-all">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono block">24-48 Hrs</span>
              <span className="text-xs text-slate-400 mt-1 block">In-Principle Sanction</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition-all">
              <span className="text-xl sm:text-2xl font-extrabold text-blue-400 font-mono block">Zero Fee</span>
              <span className="text-xs text-slate-400 mt-1 block">Upfront Customer Charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Categories Section (All 12 Categories) */}
      <section id="loan-categories" className="py-20 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 inline-block mb-3">
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

      {/* Section: Check Your Preliminary Loan Eligibility CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-[#0D213F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-900/60 border border-slate-700/60 p-8 sm:p-10 rounded-3xl backdrop-blur-md">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-accent px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
                Instant 4-Step Diagnostic
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Check Your Preliminary Loan Eligibility
              </h2>
              <p className="text-sm text-slate-300">
                Estimate your borrowing readiness, calculate permissible EMIs, and understand necessary documentation for borrowers in Hyderabad and Telangana.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/eligibility"
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-secondary to-blue-700 hover:from-blue-700 hover:to-secondary shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2 text-sm"
              >
                <span>Check Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive EMI Calculator Section */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmiCalculator defaultLoanType="Personal Loans" defaultAmount={1500000} defaultRate={8.0} defaultTenureYears={5} />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Hyper-Local SEO & All Loan Categories Assistance Hub */}
      <LocalSeoHub />

      {/* Direct Online Enquiry Form Section */}
      <section id="enquiry-form" className="py-20 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 inline-block mb-2">
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

      {/* Final Call to Action Section */}
      <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,105,170,0.3),transparent_70%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-accent px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
            Start Your Application Journey
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Looking for the Right Loan? Let's Get Started.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you need a personal credit line in HITEC City, a home loan for a flat in Kukatpally, or commercial business funds in Telangana—our loan advisors are ready to guide you.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/apply"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-accent to-amber-600 hover:from-amber-600 hover:to-accent shadow-lg shadow-amber-500/25 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
            >
              <span>Apply for Loan Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
            >
              <span>Contact Assistance Desk</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Zippy Enterprises Private Limited - Parent Company & Software Ecosystem Showcase */}
      <ZippyEnterprisesSection />

      {/* Floating Side Job Hiring Widget & Form Modal */}
      <JobVacancyWidget />
    </>
  );
};
