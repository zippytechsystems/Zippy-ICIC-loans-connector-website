import React from 'react';
import { Send, FileSearch, Sliders, CheckCircle, ShieldAlert } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: Send,
      title: "Submit Your Enquiry",
      description: "Fill our confidential, simple online form or message us on WhatsApp with basic contact information and your desired loan category."
    },
    {
      number: "02",
      icon: FileSearch,
      title: "Share Your Requirements",
      description: "Our Hyderabad-based loan advisor will have a brief consultation to understand your employment profile, income, and timeline."
    },
    {
      number: "03",
      icon: Sliders,
      title: "Explore Suitable Options",
      description: "Review indicative loan amounts, interest ranges, and eligibility criteria across authorized lender channels without any upfront fees."
    },
    {
      number: "04",
      icon: CheckCircle,
      title: "Get Connected With Lender",
      description: "With your consent, we coordinate your dossier with the authorized lender desk for formal underwriting, verification, and disbursement."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-fintech-royal px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 inline-block mb-3">
            Streamlined 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            From initial enquiry to lender connection, we guide you through every stage of your borrowing journey with clarity and speed.
          </p>
        </div>

        {/* 4-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-slate-200 group-hover:text-blue-100 transition-colors font-mono">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-fintech-royal group-hover:bg-fintech-royal group-hover:text-white transition-colors duration-200 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-400 group-hover:text-fintech-royal transition-colors">
                  <span>Step {index + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explicit Mandatory Disclaimer Callout */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs max-w-4xl mx-auto flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900 block font-semibold mb-1">
              Important Lending Authority Notice:
            </strong>
            <p>
              Final loan approval, eligibility appraisal, interest rate determination, credit scoring, document verification, and actual fund disbursement are strictly determined by the sanctioning bank or lending institution in accordance with its prevailing underwriting policies and regulatory directives. {BRAND_CONFIG.brandName} acts strictly as an independent facilitator and referral consultant.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
