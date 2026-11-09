import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { SEOHead } from '../components/common/SEOHead';

export const TermsConditions: React.FC = () => {
  const lastUpdated = "November 2026";

  return (
    <>
      <SEOHead
        title="Terms & Conditions | Genuine DSA Loan Portal | Zippy DSA Loans"
        description="Review the Terms & Conditions governing the use of Zippy DSA Loans website, loan enquiry tools, and referral assistance services."
        keywords="Terms and Conditions Zippy DSA Loans, Loan Disclaimer Hyderabad, Loan Referral Terms"
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-fintech-navy to-slate-900 text-white py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 inline-block mb-3">
            Legal Terms of Use
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-300">
            Last Updated: {lastUpdated} | {BRAND_CONFIG.brandName}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-700 leading-relaxed text-sm space-y-10">
        
        {/* Core Non-Affiliation Alert */}
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Critical Regulatory Disclosure & Disclaimer</span>
          </div>
          <p className="text-xs leading-relaxed text-amber-900">
            {BRAND_CONFIG.disclaimers.mainDisclaimer}
          </p>
        </div>

        {/* Section 1: Agreement to Terms */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or browsing this website (<a href="https://zippyicicloanconnector.in" className="text-fintech-royal">zippyicicloanconnector.in</a>), using our eligibility estimation calculators, or submitting an online enquiry, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you should refrain from using this website.
          </p>
        </section>

        {/* Section 2: Scope of Referral Services */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            2. Nature and Scope of Services
          </h2>
          <p>
            <strong>{BRAND_CONFIG.brandName}</strong> provides introductory financial information, general guidance, and referral coordination services. Specifically:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>We do NOT act as a bank, Non-Banking Financial Company (NBFC), or primary lender.</li>
            <li>We do NOT disburse funds, originate loans, issue credit sanction letters, or approve credit card applications directly.</li>
            <li>We facilitate introductions between interested consumers and authorized institutional lending channels or banking correspondent desks under applicable written referral/DSA agreements.</li>
            <li>Our consultation and guidance services are provided to prospective borrowers with zero upfront consulting fee.</li>
          </ul>
        </section>

        {/* Section 3: No Loan Guarantee */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            3. No Guarantee of Sanction or Terms
          </h2>
          <p>
            All interest rates, loan amounts, processing fees, repayment tenures, and eligibility requirements shown on this website or communicated by our representatives are strictly <strong>indicative</strong>.
          </p>
          <p>
            The actual grant, sanction, quantum, pricing, and disbursement of any credit facility is at the sole and unfettered discretion of the respective lending institution. The lending institution reserves the right to reject an application or revise offered terms based on applicant credit appraisal, CIBIL score, employer tiering, internal risk policies, and regulatory guidelines without assigning any reason.
          </p>
        </section>

        {/* Section 4: Accuracy of Customer Representations */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            4. User Representations & Information Accuracy
          </h2>
          <p>When submitting an enquiry or interacting with our coordinators, you represent and warrant that:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>You are at least 18 years of age and legally competent to enter into a contract under Indian law.</li>
            <li>The contact information, employment type, and financial figures provided by you are true, accurate, and up-to-date.</li>
            <li>You are seeking financing for legitimate and lawful purposes permitted under Indian banking laws.</li>
            <li>You will not impersonate any person or entity or submit fabricated information.</li>
          </ul>
        </section>

        {/* Section 5: Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            5. Intellectual Property & Third-Party Trademarks
          </h2>
          <p>
            All website design, text, code, graphics, layout, calculators, and brand assets of <em>{BRAND_CONFIG.brandName}</em> are the intellectual property of {BRAND_CONFIG.legalEntityName}.
          </p>
          <p>
            Any bank names, third-party trademarks, logos, or institutional service marks mentioned on this portal are used solely for factual descriptive and comparative identification purposes in accordance with Indian trademark fair-use principles. Such mention does not imply sponsorship, endorsement, or direct corporate affiliation unless supported by explicit written agreement.
          </p>
        </section>

        {/* Section 6: Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            6. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable Indian law, {BRAND_CONFIG.legalEntityName}, its promoters, coordinators, and associates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>Rejection, cancellation, or delay in loan sanction by any lending institution.</li>
            <li>Variations between indicative online estimates and formal lender sanction terms.</li>
            <li>Any technical downtime, server interruption, or website communication failure.</li>
          </ul>
        </section>

        {/* Section 7: Jurisdiction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            7. Governing Law & Dispute Resolution
          </h2>
          <p>
            These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes or claims arising out of or in connection with the use of this website shall be subject to the exclusive jurisdiction of the competent courts in <strong>Hyderabad, Telangana, India</strong>.
          </p>
        </section>

        {/* Contact info box */}
        <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
          <strong className="text-slate-900 block font-semibold">Questions Concerning These Terms:</strong>
          <p>Please address all queries or correspondence regarding these Terms & Conditions to:</p>
          <p className="font-medium text-slate-800">{BRAND_CONFIG.legalEntityName}</p>
          <p>Email: <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-fintech-royal font-semibold">{BRAND_CONFIG.contact.email}</a></p>
          <p>Regional Office: {BRAND_CONFIG.contact.officeLocation}</p>
        </section>

      </div>
    </>
  );
};
