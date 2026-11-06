import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { LOANS_DATA } from '../data/loansData';
import { EmiCalculator } from '../components/calculator/EmiCalculator';
import { SEOHead } from '../components/common/SEOHead';

export const CheckEligibility: React.FC = () => {
  const navigate = useNavigate();

  // Eligibility Form States
  const [loanType, setLoanType] = useState('Personal Loans');
  const [employmentType, setEmploymentType] = useState<'Salaried' | 'SelfEmployed'>('Salaried');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(65000);
  const [existingEmi, setExistingEmi] = useState<number>(10000);
  const [creditBracket, setCreditBracket] = useState<'Excellent' | 'Good' | 'Average' | 'Low'>('Good');
  const [city, setCity] = useState('Hyderabad');

  // Realistic Indian Banking FOIR (Fixed Obligation to Income Ratio) calculation
  const calculation = useMemo(() => {
    // Standard banking FOIR is 50% for lower incomes and up to 65% for higher incomes
    const foir = monthlyIncome >= 100000 ? 0.65 : 0.50;
    const maxPermissibleEmi = Math.max(0, monthlyIncome * foir - existingEmi);

    // Estimate max loan based on loan type and indicative tenure
    let defaultTenureYears = 5;
    let defaultRate = 11.0; // p.a.

    if (loanType === 'Home Loans' || loanType === 'Construction Loans') {
      defaultTenureYears = 20;
      defaultRate = 8.65;
    } else if (loanType === 'Loan Against Property') {
      defaultTenureYears = 12;
      defaultRate = 9.5;
    } else if (loanType === 'Business Loans') {
      defaultTenureYears = 4;
      defaultRate = 13.5;
    } else if (loanType === 'Vehicle Loans') {
      defaultTenureYears = 7;
      defaultRate = 8.85;
    }

    const monthlyRate = defaultRate / (12 * 100);
    const months = defaultTenureYears * 12;

    // Inverse EMI calculation: P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
    let estimatedMaxPrincipal = 0;
    if (maxPermissibleEmi > 0 && monthlyRate > 0) {
      estimatedMaxPrincipal = Math.round(
        (maxPermissibleEmi * (Math.pow(1 + monthlyRate, months) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, months))
      );
    }

    // Readiness rating
    let readiness: 'High' | 'Moderate' | 'Needs Co-Borrower' = 'High';
    let readinessColor = 'text-emerald-500';
    let readinessBg = 'bg-emerald-50 border-emerald-200';

    if (creditBracket === 'Low' || maxPermissibleEmi < 5000) {
      readiness = 'Needs Co-Borrower';
      readinessColor = 'text-amber-500';
      readinessBg = 'bg-amber-50 border-amber-200';
    } else if (creditBracket === 'Average') {
      readiness = 'Moderate';
      readinessColor = 'text-blue-500';
      readinessBg = 'bg-blue-50 border-blue-200';
    }

    return {
      maxPermissibleEmi: Math.round(maxPermissibleEmi),
      estimatedMaxPrincipal,
      tenureYears: defaultTenureYears,
      rate: defaultRate,
      readiness,
      readinessColor,
      readinessBg
    };
  }, [loanType, employmentType, monthlyIncome, existingEmi, creditBracket]);

  const handleProceedToApply = () => {
    const formattedAmount = calculation.estimatedMaxPrincipal.toLocaleString('en-IN');
    navigate(`/apply?loan=${encodeURIComponent(loanType)}&amount=${formattedAmount}`);
  };

  return (
    <>
      <SEOHead
        title="Check Loan Eligibility Online | Loan Calculator Hyderabad & Telangana"
        description="Check your loan borrowing eligibility in Hyderabad. Simulate maximum loan amounts, FOIR ratios, and monthly repayment limits for Personal, Home, and Business loans."
        keywords="Loan Eligibility Calculator Hyderabad, Personal Loan Eligibility, Home Loan Eligibility Telangana, CIBIL score loan eligibility"
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-fintech-navy to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 inline-block mb-3">
            Financial Assessment Tool
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Check Your Loan Eligibility
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Get an instant, data-driven estimate of your borrowing capacity based on standard Indian banking criteria before formally applying.
          </p>
        </div>
      </section>

      {/* Main Diagnostic Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-fintech-royal">
                Step 1: Loan & Profile Parameters
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Your Financial Profile
              </h2>
            </div>

            {/* Loan Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Desired Loan Category
              </label>
              <select
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal"
              >
                {LOANS_DATA.map((l) => (
                  <option key={l.id} value={l.title}>
                    {l.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Employment Type Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Employment Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEmploymentType('Salaried')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                    employmentType === 'Salaried'
                      ? 'bg-fintech-royal text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Salaried Professional (MNC/Govt/Pvt)
                </button>
                <button
                  type="button"
                  onClick={() => setEmploymentType('SelfEmployed')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                    employmentType === 'SelfEmployed'
                      ? 'bg-fintech-royal text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Self-Employed / Business Owner
                </button>
              </div>
            </div>

            {/* Net Monthly Income Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider">
                  Net Monthly Income / Average Profit
                </span>
                <span className="font-bold text-slate-900 text-sm font-mono">
                  ₹ {monthlyIncome.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={20000}
                max={500000}
                step={5000}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-fintech-royal"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>₹20,000</span>
                <span>₹2.5 Lakhs</span>
                <span>₹5 Lakhs+</span>
              </div>
            </div>

            {/* Existing Monthly EMIs Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider">
                  Existing Monthly EMIs / Card Dues
                </span>
                <span className="font-bold text-slate-900 text-sm font-mono">
                  ₹ {existingEmi.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={200000}
                step={2500}
                value={existingEmi}
                onChange={(e) => setExistingEmi(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-fintech-royal"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>₹0 (Nil Dues)</span>
                <span>₹1 Lakh</span>
                <span>₹2 Lakhs</span>
              </div>
            </div>

            {/* Credit Score Bracket */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Approximate CIBIL / Credit Score
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { label: '750+ (Excellent)', value: 'Excellent' },
                  { label: '700 - 749 (Good)', value: 'Good' },
                  { label: '650 - 699 (Fair)', value: 'Average' },
                  { label: '< 650 / New', value: 'Low' },
                ].map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setCreditBracket(tier.value as any)}
                    className={`py-2 px-2.5 rounded-xl text-center font-medium border transition-all ${
                      creditBracket === tier.value
                        ? 'border-fintech-royal bg-blue-50/80 text-fintech-royal font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Current Location in Telangana
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal"
              >
                {BRAND_CONFIG.serviceAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Right Column: Instant Diagnostic Results Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-gradient-to-br from-fintech-navy via-slate-900 to-[#06101E] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block">
                    Preliminary Assessment
                  </span>
                  <h3 className="text-lg font-bold text-white">Estimated Borrowing Capacity</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${calculation.readinessBg} ${calculation.readinessColor}`}>
                  {calculation.readiness}
                </span>
              </div>

              {/* Big Estimated Loan Amount */}
              <div className="mb-6">
                <span className="text-xs text-slate-400 block mb-1">Estimated Maximum Loan Amount</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-orange-400">₹</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                    {calculation.estimatedMaxPrincipal.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  Based on {calculation.tenureYears} years tenure @ ~{calculation.rate}% p.a.
                </span>
              </div>

              {/* Key Diagnostic Metrics */}
              <div className="space-y-3 py-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Max Permissible New EMI</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    ₹ {calculation.maxPermissibleEmi.toLocaleString('en-IN')} / mo
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Target Region Clearance</span>
                  <span className="font-semibold text-slate-200">{city}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Assessed Category</span>
                  <span className="font-semibold text-slate-200">{loanType}</span>
                </div>
              </div>

              {/* Direct Next Step Action */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <button
                  onClick={handleProceedToApply}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-fintech-royal to-blue-600 hover:from-blue-600 hover:to-fintech-royal text-white shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Apply with this Eligibility Profile</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center mt-3 leading-tight">
                *Preliminary algorithmic estimate. Credit sanction, interest rates, and loan limits are subject to formal underwriting by partner lenders.
              </p>
            </div>

            {/* Quick Tips to Improve Eligibility */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Tips to Enhance Your Loan Approval</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                  <span><strong>Add an earning co-applicant:</strong> Adding a spouse or working parent pools family income and significantly expands borrowing limits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                  <span><strong>Clear small credit card balances:</strong> Lowering outstanding credit card debt reduces your debt-to-income (FOIR) ratio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                  <span><strong>Maintain clean bank balances:</strong> Avoid unarranged overdrafts or ECS check returns for at least 6 months prior to applying.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Standalone Calculator Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmiCalculator defaultLoanType={loanType} defaultAmount={calculation.estimatedMaxPrincipal || 1000000} />
        </div>
      </section>
    </>
  );
};
