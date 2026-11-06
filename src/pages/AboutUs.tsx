import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Compass,
  Users,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { SEOHead } from '../components/common/SEOHead';

export const AboutUs: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About Us | Independent Loan Referral & Assistance Services"
        description="Learn about Zippy ICICI Loan Connector, an independent loan referral and customer assistance service catering to borrowers across Hyderabad, Secunderabad, and Telangana."
        keywords="About Zippy ICICI Loan Connector, Loan Referral Hyderabad, Loan DSA Telangana, Independent Loan Assistance"
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-fintech-navy to-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 inline-block mb-4">
            Our Identity & Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            About {BRAND_CONFIG.brandName}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {BRAND_CONFIG.tagline}
          </p>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl mx-auto">
            Empowering individuals and businesses across Hyderabad, Secunderabad, and Telangana with transparent loan guidance and seamless lender connectivity.
          </p>
        </div>
      </section>

      {/* Core Business Overview & Clarification */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-fintech-royal">
                Who We Are
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Bridging Borrowers with Verified Lending Channels
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <strong className="text-slate-900">{BRAND_CONFIG.brandName}</strong> is an independent loan referral and customer assistance service. Navigating modern retail and commercial banking products can be overwhelming—each lender has distinct income thresholds, credit score requirements, property clearance standards, and documentation guidelines.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our role is to provide preliminary loan guidance, understand your exact requirements, evaluate your borrowing readiness, and introduce you to authorized lender relationship channels to streamline your borrowing experience.
              </p>

              {/* Business Model Bullets */}
              <div className="pt-2 space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Understand Requirements:</strong> We analyze your specific financial objective (buying a flat in Gachibowli, expanding a factory in Medchal, or emergency medical funds).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Preliminary Guidance:</strong> We simulate realistic EMIs, assess debt-to-income feasibility, and assemble necessary documentation before formal submission.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Authorized Referral:</strong> We route verified customer files to designated bank/lender relationship managers as permitted under applicable referral or DSA arrangements.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Free for Borrowers:</strong> We do not charge upfront consultation fees to customers. Our revenues are earned through direct referral remuneration from partner institutions under written agreements.</span>
                </div>
              </div>
            </div>

            {/* Right Card: Transparent Disclosure Callout */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Important Brand & Regulatory Disclosure</h3>
                    <span className="text-[11px] text-slate-500">Independent Entity Notice</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {BRAND_CONFIG.disclaimers.mainDisclaimer}
                </p>

                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <strong className="text-slate-900 block font-semibold">What We Do NOT Do:</strong>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    <li>We do not represent ourselves as ICICI Bank itself.</li>
                    <li>We do not issue credit decisions, sanction letters, or direct fund disbursements.</li>
                    <li>We do not ask for or collect sensitive banking OTPs, net banking passwords, or Aadhaar numbers.</li>
                    <li>We do not demand any cash or consultation fees from applicants.</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="w-full py-3 px-4 rounded-xl bg-fintech-royal text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Contact Our Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Target Market Focus: Hyderabad & Telangana */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-fintech-royal">
              Regional Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Serving Hyderabad, Secunderabad & Telangana
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Our initial operational focus is grounded in the dynamic twin cities and Telangana's industrial and urban corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-fintech-royal flex items-center justify-center mb-4 font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">IT & Corporate Hubs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated loan structuring for software engineers, tech managers, and corporate professionals across HITEC City, Gachibowli, Madhapur, Financial District, and Kondapur.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-fintech-royal flex items-center justify-center mb-4 font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Twin Cities Residential Corridors</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Assistance with home purchases, construction, and plot loans across Kukatpally, Miyapur, Secunderabad, Begumpet, Banjara Hills, Jubilee Hills, Uppal, and LB Nagar.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-fintech-royal flex items-center justify-center mb-4 font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Commercial & MSME Clusters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Working capital and property loans for manufacturers, traders, and service enterprises across Jeedimetla, Balanagar, Kattedan, Warangal, and Karimnagar.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Values & Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our Core Operating Principles
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              We operate on strict compliance, borrower privacy, and total financial transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-fintech-royal mx-auto flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Integrity</h3>
              <p className="text-xs text-slate-600">No unrealistic promises, deceptive loan guarantees, or misleading quotes.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-fintech-royal mx-auto flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Data Privacy</h3>
              <p className="text-xs text-slate-600">Borrower contact details are kept strictly secure and shared solely upon explicit consent.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-fintech-royal mx-auto flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Clarity</h3>
              <p className="text-xs text-slate-600">Clear breakdown of rate types, tenures, processing costs, and statutory stamp charges.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-fintech-royal mx-auto flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Client Respect</h3>
              <p className="text-xs text-slate-600">Professional guidance with zero spam calls or repetitive unsolicited marketing.</p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-fintech-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Explore Your Loan Options?
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
            Take two minutes to submit your requirement. Our Hyderabad loan referral advisor will guide you forward without any obligation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/apply"
              className="px-8 py-3.5 rounded-xl font-bold text-white bg-fintech-royal hover:bg-blue-600 shadow-lg transition-all"
            >
              Submit Loan Enquiry
            </Link>
            <Link
              to="/eligibility"
              className="px-8 py-3.5 rounded-xl font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              Check Eligibility First
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
