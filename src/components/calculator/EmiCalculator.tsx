import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight, IndianRupee, Sparkles } from 'lucide-react';

interface EmiCalculatorProps {
  defaultLoanType?: string;
  defaultAmount?: number;
  defaultRate?: number;
  defaultTenureYears?: number;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({
  defaultLoanType = 'Personal Loan',
  defaultAmount = 1000000,
  defaultRate = 10.75,
  defaultTenureYears = 5
}) => {
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = useState<number>(defaultAmount);
  const [interestRate, setInterestRate] = useState<number>(defaultRate);
  const [tenureYears, setTenureYears] = useState<number>(defaultTenureYears);

  // EMI Math Calculation
  const { monthlyEmi, totalInterest, totalAmount, principalRatio, interestRatio } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / (12 * 100); // monthly interest rate
    const n = tenureYears * 12; // total months

    if (P <= 0 || r <= 0 || n <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalAmount: 0, principalRatio: 50, interestRatio: 50 };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    const interest = totalPayable - P;

    const pRatio = Math.round((P / totalPayable) * 100);
    const iRatio = 100 - pRatio;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(interest),
      totalAmount: Math.round(totalPayable),
      principalRatio: pRatio,
      interestRatio: iRatio
    };
  }, [loanAmount, interestRate, tenureYears]);

  const handleApplyNow = () => {
    const formattedAmt = loanAmount.toLocaleString('en-IN');
    navigate(`/apply?loan=${encodeURIComponent(defaultLoanType)}&amount=${formattedAmt}`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fintech-royal mb-1">
            <Calculator className="w-4 h-4" />
            <span>Interactive Financial Planning</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Loan EMI & Repayment Calculator
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Simulate monthly EMIs, total interest outlay, and overall repayment schedule for your borrowing needs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Sliders Input Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Loan Amount Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-700">Loan Amount</span>
              <div className="flex items-center px-3 py-1 bg-blue-50/80 border border-blue-200 rounded-lg text-fintech-royal font-extrabold text-base">
                <IndianRupee className="w-4 h-4 mr-1" />
                <span>{loanAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <input
              type="range"
              min={50000}
              max={15000000}
              step={25000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-fintech-royal"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>₹50,000</span>
              <span>₹50 Lakhs</span>
              <span>₹1.5 Crores</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-700">Indicative Interest Rate</span>
              <div className="flex items-center px-3 py-1 bg-blue-50/80 border border-blue-200 rounded-lg text-fintech-royal font-extrabold text-base">
                <span>{interestRate.toFixed(2)} % p.a.</span>
              </div>
            </div>
            <input
              type="range"
              min={7.5}
              max={22}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-fintech-royal"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>7.5% (Home Loans)</span>
              <span>12% (Personal)</span>
              <span>22%</span>
            </div>
          </div>

          {/* Loan Tenure Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-700">Repayment Tenure</span>
              <div className="flex items-center px-3 py-1 bg-blue-50/80 border border-blue-200 rounded-lg text-fintech-royal font-extrabold text-base">
                <span>{tenureYears} Years ({tenureYears * 12} Months)</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-fintech-royal"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

        </div>

        {/* Output Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-fintech-navy to-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
          {/* Subtle glow accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-5">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Estimated Monthly EMI
            </span>
            <span className="p-1 rounded-md bg-blue-500/20 text-blue-400">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          {/* Big EMI display */}
          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-semibold text-orange-400">₹</span>
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
                {monthlyEmi.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400">/ month</span>
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="space-y-3 py-4 border-t border-slate-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Principal Amount</span>
              <span className="font-semibold text-slate-200">₹ {loanAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Interest Payable</span>
              <span className="font-semibold text-orange-400">₹ {totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 font-bold text-sm">
              <span className="text-white">Total Amount Payable</span>
              <span className="text-emerald-400 font-mono">₹ {totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div className="mt-4 mb-6">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
              <span>Principal: {principalRatio}%</span>
              <span>Interest: {interestRatio}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${principalRatio}%` }}
              ></div>
              <div
                className="bg-orange-500 h-full transition-all duration-300"
                style={{ width: `${interestRatio}%` }}
              ></div>
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={handleApplyNow}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-fintech-royal to-blue-600 hover:from-blue-600 hover:to-fintech-royal text-white shadow-md transition-all flex items-center justify-center gap-2 group"
          >
            <span>Proceed with this Requirement</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[10px] text-slate-400 text-center mt-3">
            *Indicative calculation. Final EMI & interest will be determined by the sanctioning bank.
          </p>
        </div>
      </div>
    </div>
  );
};
