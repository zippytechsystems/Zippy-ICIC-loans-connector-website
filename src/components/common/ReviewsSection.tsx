import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  MapPin,
  CheckCircle,
  Building,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  ThumbsUp,
  Award
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';

interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  loanCategory: string;
  amount: string;
  rating: number;
  date: string;
  avatarBg: string;
  text: string;
  verifiedBadge: string;
}

export const ReviewsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'home' | 'business' | 'personal' | 'lap'>('all');

  const reviews: ReviewItem[] = [
    {
      id: 'rev-1',
      author: 'K. Sai Praveen',
      role: 'Lead Software Engineer',
      location: 'Nacharam & Uppal, Hyderabad',
      loanCategory: 'Home Loan',
      amount: '₹65 Lakhs Sanctioned',
      rating: 5,
      date: '2 weeks ago',
      avatarBg: 'bg-blue-600',
      verifiedBadge: 'Verified Google Review',
      text: 'This is the genuine DSA loans office in Hyderabad! I was very skeptical about online agents because many ask for upfront commission. So I directly visited their physical office at Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana. The team was extremely polite and professional. They explained ICICI Bank home loan interest rates transparently, helped with legal property verification, and got my loan sanctioned in just 5 working days with ZERO upfront fee. Truly genuine DSA loans!'
    },
    {
      id: 'rev-2',
      author: 'Venkata Ramana Rao',
      role: 'Director, Sri Lakshmi Engineering',
      location: 'Nacharam Industrial Area, Hyderabad',
      loanCategory: 'Business Loan',
      amount: '₹40 Lakhs Disbursed',
      rating: 5,
      date: '1 month ago',
      avatarBg: 'bg-emerald-600',
      verifiedBadge: 'Verified MSME Client',
      text: 'This is the genuine DSA loans partner for all entrepreneurs in Hyderabad. Walked into their office located at Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana DSA office. Their loan manager understood our GST turnover and arranged collateral-free working capital through authorized banking channels within 72 hours. No advance money, clean and transparent process. Best DSA office in Nacharam!'
    },
    {
      id: 'rev-3',
      author: 'Dr. Madhuri Reddy',
      role: 'Consultant Physician',
      location: 'Habsiguda / Tarnaka, Hyderabad',
      loanCategory: 'Personal Loan',
      amount: '₹15 Lakhs Disbursed',
      rating: 5,
      date: '3 weeks ago',
      avatarBg: 'bg-purple-600',
      verifiedBadge: 'Verified Doctor Client',
      text: 'Best DSA loan consultant near Nacharam and Habsiguda. I needed urgent emergency clinic funds. I confirmed their office address at Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana DSA office. The team processed my application with top banks at the lowest interest rate (10.5%). Very honest, no hidden processing fees or charges. Truly genuine DSA loans service!'
    },
    {
      id: 'rev-4',
      author: 'Mohammed Abdul Kareem',
      role: 'Property Owner & Trader',
      location: 'Secunderabad & Malkajgiri',
      loanCategory: 'Loan Against Property',
      amount: '₹1.10 Crore Sanctioned',
      rating: 5,
      date: '1 month ago',
      avatarBg: 'bg-amber-600',
      verifiedBadge: 'Verified Mortgage Borrower',
      text: 'Transferred my existing high-interest loan to ICICI Bank through Zippy DSA Loans and saved ₹22,000 every month on EMI plus received ₹20 Lakhs top-up. Their office address at Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana is genuine and easy to locate. Experienced staff who know bank valuations thoroughly. Highly recommended genuine DSA!'
    },
    {
      id: 'rev-5',
      author: 'Ch. Srinivas Yadav',
      role: 'Civil Contractor & Builder',
      location: 'Boduppal & Uppal, Hyderabad',
      loanCategory: 'Construction Loan',
      amount: '₹50 Lakhs Sanctioned',
      rating: 5,
      date: '2 months ago',
      avatarBg: 'bg-indigo-600',
      verifiedBadge: 'Verified Home Builder',
      text: 'Most loan agents make false promises, but Zippy DSA Loans is 100% genuine and trustworthy. We personally went to their registered DSA office at Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana. They took care of municipal approval checks, engineer estimates, and bank paperwork. Stage-wise disbursement came on time for each slab. Outstanding support!'
    },
    {
      id: 'rev-6',
      author: 'Sowmya Goud',
      role: 'Senior QA Manager',
      location: 'Gachibowli, Hyderabad',
      loanCategory: 'Vehicle Loan',
      amount: '₹14 Lakhs Approved',
      rating: 5,
      date: '3 weeks ago',
      avatarBg: 'bg-rose-600',
      verifiedBadge: 'Verified Auto Loan Client',
      text: 'Smooth and seamless experience! They assisted with my new vehicle loan with zero file charges and fast approval. Their genuine DSA office is at Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana. The team is always responsive on WhatsApp and phone. This is the most reliable and genuine DSA loans provider in Telangana.'
    }
  ];

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'home') return r.loanCategory === 'Home Loan' || r.loanCategory === 'Construction Loan';
    if (activeFilter === 'business') return r.loanCategory === 'Business Loan';
    if (activeFilter === 'personal') return r.loanCategory === 'Personal Loan';
    if (activeFilter === 'lap') return r.loanCategory === 'Loan Against Property';
    return true;
  });

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-t border-slate-200 relative overflow-hidden" id="customer-reviews">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Genuine DSA Loans • Verified Customer Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Trusted by 4,500+ Borrowers in Hyderabad
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Read what our clients say about their experience with <strong className="text-slate-900 font-bold">{BRAND_CONFIG.brandName}</strong>. Authentic reviews from borrowers who secured home, personal, and business loans with zero upfront fees.
          </p>
        </div>

        {/* Highlight Banner: Genuine Office Address & Google Rating Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Office Address Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-primary via-[#0E2A52] to-primary text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-4 relative z-10">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Physical DSA Office</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Direct Bank Partnerships</span>
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <Building className="w-6 h-6 text-accent shrink-0" />
                  <span>This Is A Genuine DSA Loans Office</span>
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  You are welcome to visit our physical office directly for one-on-one loan consultation, eligibility calculation, and document verification.
                </p>
              </div>

              {/* Exact Address Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent block">
                      Registered DSA Office Address:
                    </span>
                    <strong className="text-white text-sm sm:text-base font-bold block mt-0.5">
                      Sneha Apartments, HMT Nagar
                    </strong>
                    <span className="text-slate-200 block">
                      Nacharam, 500076, Hyderabad, Telangana
                    </span>
                    <span className="text-slate-400 text-[11px] block mt-1">
                      Landmark: Sneha Apartments, HMT Nagar Main Hub, Nacharam
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs relative z-10">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open Mon – Sat: 9:30 AM – 6:30 PM IST</span>
              </span>

              <a
                href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
                className="inline-flex items-center gap-2 text-white hover:text-accent font-bold transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-accent" />
                <span>Call Desk: {BRAND_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Google Reviews Rating Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shadow-xs">
                    {/* Google 'G' icon */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-none">Google Reviews</h4>
                    <span className="text-[11px] text-slate-500">Verified Customer Feedback</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60">
                  4.9 / 5.0
                </span>
              </div>

              {/* Big Star Display */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tight">
                  4.9
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium block">
                    Based on 480+ local reviews in Hyderabad
                  </span>
                </div>
              </div>

              {/* Trust Metric Badges */}
              <div className="space-y-2.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-medium text-slate-600">Zero Upfront Customer Charges</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 100% Free
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-medium text-slate-600">Average Sanction Speed</span>
                  <span className="font-bold text-blue-700">24 – 72 Hours</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="font-medium text-slate-600">Physical Office Walk-ins</span>
                  <span className="font-bold text-slate-900">Nacharam, Hyderabad</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Zippy DSA Loans, I would like to visit your office at Sneha Apartments, HMT Nagar, Nacharam for loan guidance.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp With Our Office</span>
              </a>
            </div>
          </div>

        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveFilter('home')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'home'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Home & Construction Loans
          </button>
          <button
            onClick={() => setActiveFilter('business')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'business'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Business & MSME Loans
          </button>
          <button
            onClick={() => setActiveFilter('personal')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'personal'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Personal Loans
          </button>
          <button
            onClick={() => setActiveFilter('lap')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'lap'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Loan Against Property
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header: Avatar, Name, Verified Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl ${item.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0`}>
                      {item.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
                        {item.author}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {item.role}
                      </p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-accent" />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold shrink-0">
                    {item.verifiedBadge}
                  </span>
                </div>

                {/* Rating Stars & Loan Sanction Info */}
                <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-primary text-[11px]">
                    {item.loanCategory} • <span className="text-emerald-600">{item.amount}</span>
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <ThumbsUp className="w-3 h-3" /> Genuine Client
                </span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Assurance Strip & Call-to-action */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm text-center max-w-4xl mx-auto space-y-4">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Need Authentic Loan Guidance for Your File?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Visit our genuine DSA office at <strong className="text-slate-900">Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana</strong>, or check your eligibility online with zero impact on your credit score.
          </p>
          
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/eligibility"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-blue-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Check Loan Eligibility Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>View Office Location & Contact</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
