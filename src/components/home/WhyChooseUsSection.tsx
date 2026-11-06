import React from 'react';
import {
  Compass,
  Zap,
  Layers,
  FileCheck2,
  Headphones,
  Users
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const points = [
    {
      icon: Compass,
      title: "Personalized Loan Guidance",
      description: "Every borrower's financial background is unique. We evaluate your employment type, income consistency, and repayment capacity to identify the most suitable borrowing route."
    },
    {
      icon: Zap,
      title: "Simple Enquiry Process",
      description: "No lengthy paperwork or upfront fees. Submit your preliminary requirements through our simplified, mobile-friendly interface in under two minutes."
    },
    {
      icon: Layers,
      title: "Multiple Loan Options",
      description: "From secured mortgages and commercial property loans to unsecured personal financing, balance transfers, and emergency medical lines—explore an extensive suite of 12 loan categories."
    },
    {
      icon: FileCheck2,
      title: "Transparent Information",
      description: "We communicate indicative interest rates, eligibility criteria, and documentation checklists with complete openness, with zero hidden charges or false guarantees."
    },
    {
      icon: Users,
      title: "Customer Assistance",
      description: "Our Hyderabad-based loan advisors assist you with assembling clean document dossiers, understanding legal scrutiny stages, and answering all your procedural doubts."
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "Enjoy prompt support via direct phone consultation and WhatsApp messaging throughout your loan application and disbursement cycle."
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-fintech-royal px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 inline-block mb-3">
            Trust & Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Us?
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Professional loan referral guidance tailored specifically for individuals and businesses across Hyderabad, Secunderabad, and Telangana.
          </p>
        </div>

        {/* 6 Key Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-fintech-royal group-hover:bg-fintech-royal group-hover:text-white transition-colors duration-200 flex items-center justify-center mb-5 shadow-xs">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-fintech-royal transition-colors">
                  {point.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-fintech-royal font-mono">100% Free</div>
            <div className="text-xs text-slate-500 font-medium">Customer Consultation</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-fintech-royal font-mono">12+</div>
            <div className="text-xs text-slate-500 font-medium">Loan Categories</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-fintech-royal font-mono">Hyderabad</div>
            <div className="text-xs text-slate-500 font-medium">& Telangana Coverage</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-fintech-royal font-mono">Zero</div>
            <div className="text-xs text-slate-500 font-medium">Spam or Unverified Calls</div>
          </div>
        </div>

      </div>
    </section>
  );
};
