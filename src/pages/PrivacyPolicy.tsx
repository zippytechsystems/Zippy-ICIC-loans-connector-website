import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { SEOHead } from '../components/common/SEOHead';

export const PrivacyPolicy: React.FC = () => {
  const lastUpdated = "November 2026";

  return (
    <>
      <SEOHead
        title="Privacy Policy | Data Protection & Customer Consent"
        description="Read the Privacy Policy of Zippy ICICI Loan Connector. Learn how your loan enquiry details and contact information are protected and processed under Indian data protection laws."
        keywords="Privacy Policy Zippy ICICI Loan Connector, Data Protection Hyderabad, Loan Consent Policy"
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-fintech-navy to-slate-900 text-white py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 inline-block mb-3">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Privacy Policy & Data Protection
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-300">
            Last Updated: {lastUpdated} | Effective for {BRAND_CONFIG.legalEntityName}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-700 leading-relaxed text-sm space-y-10">
        
        {/* Core Principles Callout */}
        <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200/70 space-y-3">
          <div className="flex items-center gap-2 text-fintech-royal font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-fintech-royal" />
            <span>Our Uncompromising Privacy Commitments</span>
          </div>
          <ul className="text-xs text-blue-950 space-y-1.5 list-disc pl-5">
            <li>We do NOT ask for or store your Aadhaar number, physical PAN copies, net banking passwords, or OTPs on this website.</li>
            <li>We do NOT sell, lease, or monetize your contact information to third-party telemarketers or non-financial advertising networks.</li>
            <li>We only share your loan enquiry details with authorized lending partner channels upon obtaining your explicit consent.</li>
          </ul>
        </div>

        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            1. Introduction & Scope
          </h2>
          <p>
            Welcome to <strong>{BRAND_CONFIG.brandName}</strong> (operated by "{BRAND_CONFIG.legalEntityName}", hereinafter referred to as "we", "us", or "our"). We operate an independent loan referral and customer assistance portal serving prospective borrowers located in Hyderabad, Secunderabad, and across Telangana, India.
          </p>
          <p>
            This Privacy Policy describes our practices regarding the collection, handling, storage, and sharing of personal data collected through our website, web forms, and direct messaging channels in compliance with the Digital Personal Data Protection Act (DPDP Act, 2023), the Information Technology Act, 2000, and Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
        </section>

        {/* Section 2: Independent Referral Business Status */}
        <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>2. Nature of Service & Non-Affiliation Disclosure</span>
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {BRAND_CONFIG.disclaimers.mainDisclaimer}
          </p>
        </section>

        {/* Section 3: Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            3. Information We Collect
          </h2>
          <p>
            We collect only the minimum necessary information required to evaluate preliminary loan eligibility and introduce you to relevant lender desks:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li><strong>Basic Contact Information:</strong> Full Legal Name, 10-digit Indian Mobile Number, and optional Email Address.</li>
            <li><strong>Geographic Location:</strong> City or District in Telangana (e.g., Hyderabad, Secunderabad, Cyberabad).</li>
            <li><strong>Loan Requirement Parameters:</strong> Requested loan category (e.g., Personal, Home, Business Loan), approximate loan amount desired, and general loan end-use.</li>
            <li><strong>Employment & Income Category:</strong> Employment nature (Salaried, Self-Employed Professional, Business Owner) and optional net monthly income band.</li>
            <li><strong>Technical Diagnostics:</strong> Browser type, operating system, IP address, and anonymized website navigation analytics solely to improve portal performance and detect malicious spam submissions.</li>
          </ul>
        </section>

        {/* Section 4: What We Explicitly DO NOT Collect */}
        <section className="space-y-3 p-5 rounded-2xl bg-rose-50/50 border border-rose-200">
          <h2 className="text-base font-bold text-rose-950">
            4. Sensitive Data We Explicitly DO NOT Collect
          </h2>
          <p className="text-xs text-rose-900 leading-relaxed">
            For your security and compliance with Reserve Bank of India (RBI) consumer protection directives, <strong>we strictly do not collect</strong> the following on our public website:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-rose-900">
            <li>Aadhaar card number, biometric credentials, or Aadhaar OTPs.</li>
            <li>Physical copies of PAN cards or taxpayer identification uploads.</li>
            <li>Bank account net banking login IDs, passwords, debit/credit card CVVs, or ATM PINs.</li>
            <li>Transaction One-Time Passwords (OTPs) generated by your bank.</li>
          </ul>
          <p className="text-xs text-rose-800 italic mt-2">
            Official KYC verification and credit underwriting documentation will be carried out directly through official, verified lending bank representatives.
          </p>
        </section>

        {/* Section 5: How We Use Your Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            5. Purpose of Data Processing
          </h2>
          <p>The information you provide is utilized strictly for the following legitimate purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>To perform initial eligibility feasibility screening against participating lender matrices.</li>
            <li>To contact you via phone call, SMS, WhatsApp, or email regarding your loan enquiry.</li>
            <li>To forward your contact and preliminary requirements to authorized bank or NBFC relationship desks upon your explicit request.</li>
            <li>To maintain an audit trail of customer referral consent as mandated by statutory banking correspondent regulations.</li>
            <li>To resolve customer queries, prevent fraudulent submissions, and enhance website functionality.</li>
          </ul>
        </section>

        {/* Section 6: Customer Consent & Right to Withdraw */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            6. Customer Consent & Withdrawal Rights
          </h2>
          <p>
            By checking the consent box on our loan enquiry forms, you explicitly grant consent to {BRAND_CONFIG.brandName} to contact you and to route your requirement to partner lenders.
          </p>
          <p>
            You retain the right to withdraw your consent at any time. To withdraw consent or request deletion of your contact information from our active referral database, simply write to our designated grievance contact at <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-fintech-royal font-bold">{BRAND_CONFIG.contact.email}</a> with your reference number. Upon receipt, your contact information will be purged from our active contact lists within 7 business days.
          </p>
        </section>

        {/* Section 7: Security Measures */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            7. Data Security Safeguards
          </h2>
          <p>
            We implement industry-standard organizational and technological safeguards, including 256-bit TLS/SSL encryption for data transmission, firewalled hosting environments, and access-controlled databases to protect against unauthorized access, alteration, or disclosure.
          </p>
        </section>

        {/* Section 8: Grievance Officer & Contact */}
        <section className="space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <h2 className="text-base font-bold text-slate-900">
            8. Grievance Officer & Inquiries
          </h2>
          <p className="text-xs text-slate-600">
            In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023, the details of our Grievance Desk are provided below:
          </p>
          <div className="text-xs text-slate-800 space-y-1 font-medium pt-2">
            <p><strong>Entity:</strong> {BRAND_CONFIG.legalEntityName}</p>
            <p><strong>Brand:</strong> {BRAND_CONFIG.brandName}</p>
            <p><strong>Location:</strong> {BRAND_CONFIG.contact.officeLocation}</p>
            <p><strong>Email:</strong> {BRAND_CONFIG.contact.email}</p>
            <p><strong>Operating Hours:</strong> {BRAND_CONFIG.contact.businessHours}</p>
          </div>
        </section>

      </div>
    </>
  );
};
