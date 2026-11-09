import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { openWhatsAppWithTracking } from '../services/api';
import { SEOHead } from '../components/common/SEOHead';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQs: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIds, setOpenIds] = useState<string[]>(['gen-1']);

  const allFaqs: FAQItem[] = [
    // General
    {
      id: 'gen-1',
      category: 'General',
      question: 'Is Zippy DSA Loans a genuine and authorized loan referral partner?',
      answer: 'Yes! Zippy DSA Loans is a 100% genuine, authorized Direct Selling Agent (DSA) and loan referral partner with its registered office located at Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana. We assist customers with home, personal, and business loans through partner banks including ICICI Bank and other leading institutions. All loan sanctions and disbursements are conducted directly by partner banks.'
    },
    {
      id: 'gen-2',
      category: 'General',
      question: 'Do you charge any upfront consultation or application fees to borrowers?',
      answer: 'No. Our preliminary consultation, loan guidance, and referral assistance services are 100% free of charge for borrowers. We never collect cash, processing fees, or advisory charges from applicants. Any official processing fees or statutory stamp duties are payable directly to the sanctioning lending bank upon loan agreement execution.'
    },
    {
      id: 'gen-3',
      category: 'General',
      question: 'Which locations in Telangana do you cater to?',
      answer: 'Our primary focus encompasses Hyderabad, Secunderabad, Cyberabad, Gachibowli, Madhapur, Kukatpally, Banjara Hills, Dilsukhnagar, Uppal, and Medchal, alongside major Telangana urban centres such as Warangal, Karimnagar, Nizamabad, and Khammam.'
    },

    // Eligibility
    {
      id: 'elig-1',
      category: 'Eligibility',
      question: 'What is the minimum credit score (CIBIL) required to qualify for a loan?',
      answer: 'For unsecured personal and business loans, lenders typically prefer a CIBIL score of 650 or higher, with 700+ commanding the lowest interest rate bands. For secured products such as Home Loans and Loans Against Property, strong property valuation and stable income can occasionally offset marginal credit scores.'
    },
    {
      id: 'elig-2',
      category: 'Eligibility',
      question: 'Does checking my eligibility on this website hurt my CIBIL score?',
      answer: 'Not at all. Utilizing our interactive eligibility calculators and submitting preliminary requirement details on our website does not generate a hard bureau pull. A formal credit enquiry is registered only when an official loan dossier is submitted directly to the lending institution with your written consent.'
    },
    {
      id: 'elig-3',
      category: 'Eligibility',
      question: 'Can I add a family member as a co-applicant to increase my loan amount?',
      answer: 'Yes. Adding an earning co-applicant (such as your spouse, parents, or working children) pools your collective household income, lowers your Fixed Obligation to Income Ratio (FOIR), and can significantly elevate your maximum permissible loan amount.'
    },

    // Documentation
    {
      id: 'doc-1',
      category: 'Documentation',
      question: 'What documents are required for an initial loan assessment?',
      answer: 'Basic initial documentation typically includes: (1) Government photo ID and local address proof (Passport, Voter ID, Driving License, or recent utility bill), (2) Income proof: Latest 3 months salary slips and 6 months salary bank statement for salaried employees, or 2-3 years ITR with computation and 12 months business current account statements for self-employed individuals.'
    },
    {
      id: 'doc-2',
      category: 'Documentation',
      question: 'Do you collect Aadhaar or PAN details on this website?',
      answer: 'No. We strictly adhere to Indian data privacy best practices and never collect Aadhaar numbers, PAN copies, banking passwords, PINs, or OTPs on this public website. Formal KYC documents are handed over only to authorized bank verification executives during the official lender underwriting stage.'
    },
    {
      id: 'doc-3',
      category: 'Documentation',
      question: 'When do I need to submit original property deeds for a Home Loan or LAP?',
      answer: 'Original property documents are never required during initial consultation or preliminary sanction. You only present original title deeds to the lending bank at their branch or central mortgage processing cell at the time of final loan agreement execution and equitable mortgage creation.'
    },

    // Process & Rates
    {
      id: 'proc-1',
      category: 'Process & Rates',
      question: 'How are interest rates and processing fees determined?',
      answer: 'All interest rates, loan tenures, processing fees, and credit limits are determined exclusively by the sanctioning bank or lending institution based on their prevailing benchmark spreads (Repo-Linked Lending Rate / MCLR), applicant risk profile, employer category, and property valuation.'
    },
    {
      id: 'proc-2',
      category: 'Process & Rates',
      question: 'What is a Loan Balance Transfer and how does it save money?',
      answer: 'A Balance Transfer enables you to shift an existing high-interest loan (such as an older Home Loan or Personal Loan) from your current financial institution to a new lender offering lower interest margins. This reduces your monthly EMI outflow or overall tenure, generating substantial net interest savings over time.'
    },
    {
      id: 'proc-3',
      category: 'Process & Rates',
      question: 'How quickly will a loan advisor get in touch with me after submitting an enquiry?',
      answer: 'Our Hyderabad loan coordination team reviews all incoming enquiries and aims to contact you by telephone within regular business hours (typically within 2 to 24 hours, excluding Sundays and public holidays).'
    }
  ];

  const categories = ['All', 'General', 'Eligibility', 'Documentation', 'Process & Rates'];

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const matchCat = activeCategory === 'All' || faq.category === activeCategory;
      const matchSearch =
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const toggleAccordion = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions (FAQs) | Zippy DSA Loans Hyderabad"
        description="Find answers to common questions about personal loans, home loans, eligibility criteria, documentation, and genuine DSA services from Zippy DSA Loans (Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana)."
        keywords="Loan FAQs Hyderabad, Zippy DSA Loans, Personal Loan Questions, Home Loan Documentation Telangana, DSA Office Nacharam"
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-fintech-navy to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 inline-block mb-3">
            Clear Answers
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Everything you need to know about our independent loan referral assistance, documentation requirements, and borrowing procedures.
          </p>

          {/* Search bar inside Hero */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search a question (e.g. CIBIL, documents, fees, ICICI)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-fintech-royal text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
              <p className="text-slate-600 font-medium text-sm">No questions matching "{search}".</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="mt-3 px-4 py-1.5 bg-fintech-royal text-white text-xs font-bold rounded-lg"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex justify-between items-start gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-fintech-royal block">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`p-1.5 rounded-full bg-slate-100 text-slate-600 shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180 bg-blue-100 text-fintech-royal' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-14 bg-gradient-to-br from-fintech-navy to-slate-900 rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Have a specific loan query?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Speak directly with our Hyderabad loan coordinator or message us on WhatsApp for tailored advice.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-fintech-royal hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all text-center"
            >
              Contact Desk
            </Link>
            <button
              type="button"
              onClick={() => openWhatsAppWithTracking({
                loanCategory: 'General FAQ Enquiry',
                sourceContext: 'FAQs Page CTA',
                city: 'Hyderabad'
              })}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>

      </div>
    </>
  );
};
