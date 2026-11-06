import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { LOANS_DATA } from '../../data/loansData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fintech-navy text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand & Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fintech-royal to-blue-800 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                Z
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight block">
                  {BRAND_CONFIG.brandName}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {BRAND_CONFIG.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              A specialized loan referral and advisory service catering to salaried employees, professionals, and business owners across Hyderabad, Secunderabad, and Telangana. We assist you in discovering suitable borrowing alternatives through authorized lending channels.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Upfront Fee Assurance</span>
              </div>
              <p className="text-[12px] text-slate-400 leading-normal">
                We do not collect cash or consulting charges from applicants. Referral compensation is settled directly by partner institutions according to written DSA / corporate arrangements.
              </p>
            </div>
          </div>

          {/* Column 2: Loan Categories (1 to 6) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Popular Loans
            </h4>
            <ul className="space-y-2 text-sm">
              {LOANS_DATA.slice(0, 6).map((loan) => (
                <li key={loan.id}>
                  <Link
                    to={`/services/${loan.slug}`}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{loan.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Loans (7 to 12) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              More Services
            </h4>
            <ul className="space-y-2 text-sm">
              {LOANS_DATA.slice(6).map((loan) => (
                <li key={loan.id}>
                  <Link
                    to={`/services/${loan.slug}`}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{loan.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Service Region */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Assistance Desk
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Serving {BRAND_CONFIG.targetRegion}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
                    className="hover:text-white transition-colors font-medium block"
                  >
                    {BRAND_CONFIG.contact.phoneDisplay}
                  </a>
                  <span className="text-[11px] text-slate-400">Toll-free / Local Dialing</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {BRAND_CONFIG.contact.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.contact.businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Quick Nav & Legal Links */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/services" className="hover:text-white transition-colors">All Loan Products</Link>
            <Link to="/eligibility" className="hover:text-white transition-colors">Check Eligibility</Link>
            <Link to="/apply" className="hover:text-white transition-colors">Apply Online</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
            <Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted & Verified Referral Portal</span>
          </div>
        </div>

        {/* Regulatory & Referral Disclosure Notice Box */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Mandatory Regulatory & Independent Referral Disclosure</span>
          </div>
          <p>
            {BRAND_CONFIG.disclaimers.mainDisclaimer}
          </p>
          <p className="text-[11px] text-slate-500">
            {BRAND_CONFIG.disclaimers.noAadhaarNotice}
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {BRAND_CONFIG.brandName}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Operating in Hyderabad, Telangana, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
