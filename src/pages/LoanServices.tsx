import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { LOANS_DATA } from '../data/loansData';
import { LoanCard } from '../components/loans/LoanCard';
import { SEOHead } from '../components/common/SEOHead';

export const LoanServices: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterCategories = [
    { label: 'All Products', value: 'All' },
    { label: 'Personal & Lifestyle', value: 'Personal' },
    { label: 'Home & Property', value: 'Property' },
    { label: 'Business & MSME', value: 'Business' },
    { label: 'Refinancing & Top-Up', value: 'Refinance' },
  ];

  const filteredLoans = useMemo(() => {
    return LOANS_DATA.filter((loan) => {
      const matchesSearch =
        loan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === 'All') return true;
      if (selectedFilter === 'Personal') {
        return ['personal-loans', 'vehicle-loans', 'consumer-loans', 'medical-loans', 'education-loans'].includes(loan.id);
      }
      if (selectedFilter === 'Property') {
        return ['home-loans', 'construction-loans', 'home-renovation-loans', 'loan-against-property'].includes(loan.id);
      }
      if (selectedFilter === 'Business') {
        return ['business-loans', 'loan-against-property'].includes(loan.id);
      }
      if (selectedFilter === 'Refinance') {
        return ['balance-transfer', 'top-up-loans'].includes(loan.id);
      }
      return true;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <>
      <SEOHead
        title="Loan Services & Products | Zippy DSA Loans Hyderabad"
        description="Browse all 12 verified loan categories including personal loans, home loans, business loans, balance transfer, and loan against property with Zippy DSA Loans (Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana)."
        keywords="Personal Loans Hyderabad, Home Loans Hyderabad, Business Loans Hyderabad, Zippy DSA Loans, Loan Against Property Telangana, Education Loans Hyderabad"
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-fintech-navy to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 inline-block mb-3">
            Product Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Explore All Loan Categories
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Verified financing alternatives structured to meet diverse personal, residential, and enterprise needs across Hyderabad and Telangana.
          </p>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search loan category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {filterCategories.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setSelectedFilter(f.value)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedFilter === f.value
                      ? 'bg-fintech-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Loan Grid Section */}
      <section className="py-16 bg-slate-50 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredLoans.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-auto border border-slate-200">
              <p className="text-slate-600 font-medium text-sm">No loan product matching "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedFilter('All'); }}
                className="mt-4 px-4 py-2 bg-fintech-royal text-white text-xs font-bold rounded-lg"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLoans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} />
              ))}
            </div>
          )}

          {/* Regulatory Reminder */}
          <div className="mt-14 p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 text-center max-w-4xl mx-auto leading-relaxed">
            <p>
              <strong className="text-slate-800">Verification & Channel Disclaimer:</strong> Listed products represent financing options made available through authorized lending partner networks and correspondent channels. Product parameters including interest rates, processing charges, and loan limits are subject to change by respective lending institutions.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};
