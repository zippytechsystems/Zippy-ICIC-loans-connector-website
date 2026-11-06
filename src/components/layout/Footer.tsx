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
    <footer className="bg-primary text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand & Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-blue-800 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
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
              <div className="flex items-center gap-2 text-accent font-semibold">
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
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Serving {BRAND_CONFIG.targetRegion}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
                    className="hover:text-white transition-colors font-medium block"
                  >
                    {BRAND_CONFIG.contact.phoneDisplay}
                  </a>
                  <span className="text-[11px] text-slate-400">Local Dialing Placeholder</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {BRAND_CONFIG.contact.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.contact.businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Quick Nav, Social Media Placeholders & SSL */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/services" className="hover:text-white transition-colors">Loan Services</Link>
            <Link to="/eligibility" className="hover:text-white transition-colors">Check Eligibility</Link>
            <Link to="/apply" className="hover:text-white transition-colors">Apply Online</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
            <Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>

          {/* Social Media Placeholders */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs hidden sm:inline">Follow:</span>
            <a
              href={BRAND_CONFIG.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-secondary hover:text-white text-slate-400 transition-colors"
              aria-label="LinkedIn Placeholder"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a
              href={BRAND_CONFIG.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-secondary hover:text-white text-slate-400 transition-colors"
              aria-label="Twitter Placeholder"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href={BRAND_CONFIG.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-secondary hover:text-white text-slate-400 transition-colors"
              aria-label="Facebook Placeholder"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
            <a
              href={BRAND_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-secondary hover:text-white text-slate-400 transition-colors"
              aria-label="Instagram Placeholder"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted Referral Portal</span>
          </div>
        </div>

        {/* Regulatory & Referral Disclosure Notice Box */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider">
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
            <span className="text-slate-400">Target Region: Hyderabad, Telangana, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
