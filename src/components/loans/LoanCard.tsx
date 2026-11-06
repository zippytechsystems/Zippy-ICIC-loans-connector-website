import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { LoanProduct } from '../../data/loansData';
import { LoanIcon } from '../common/LoanIcon';

interface LoanCardProps {
  loan: LoanProduct;
}

export const LoanCard: React.FC<LoanCardProps> = ({ loan }) => {
  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between">
      {/* Top Banner & Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-fintech-royal group-hover:bg-fintech-royal group-hover:text-white transition-colors duration-200 flex items-center justify-center p-2.5 shadow-xs">
            <LoanIcon name={loan.iconName} className="w-6 h-6 stroke-[2]" />
          </div>

          {loan.badge && (
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-fintech-royal border border-blue-200/60">
              {loan.badge}
            </span>
          )}
        </div>

        {/* Loan Title */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-fintech-royal transition-colors mb-2">
          {loan.title}
        </h3>

        {/* Short Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {loan.shortDescription}
        </p>

        {/* Indicative Rate & Tenure Highlights */}
        <div className="bg-slate-50 rounded-xl p-3 mb-5 border border-slate-100 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Interest Rate:</span>
            <span className="font-semibold text-slate-900">{loan.indicativeRate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Max Limit:</span>
            <span className="font-semibold text-slate-900">{loan.maxAmount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Repayment Tenure:</span>
            <span className="font-semibold text-slate-900">{loan.tenureRange}</span>
          </div>
        </div>

        {/* 2 Feature bullets */}
        <div className="space-y-1.5 mb-6 text-xs text-slate-600">
          {loan.keyHighlights.slice(0, 2).map((h, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons: Learn More & Apply Now */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-semibold">
        <Link
          to={`/services/${loan.slug}`}
          className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:text-fintech-royal hover:border-blue-400 hover:bg-blue-50/50 transition-all"
        >
          <span>Learn More</span>
        </Link>

        <Link
          to={`/apply?loan=${encodeURIComponent(loan.title)}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-fintech-royal text-white hover:bg-blue-700 shadow-xs hover:shadow-md transition-all"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
