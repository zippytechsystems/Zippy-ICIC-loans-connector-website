import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Loan Services', path: '/services' },
    { name: 'Check Eligibility', path: '/eligibility' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
      {/* Top Advisory Bar */}
      <div className="bg-fintech-navy text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center justify-center p-0.5 rounded bg-blue-900/60 text-blue-300">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
            <span className="font-medium text-slate-200">
              Notice: <span className="text-slate-300 font-normal">{BRAND_CONFIG.disclaimers.headerNotice}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs">
            <span className="text-slate-400">Serving Hyderabad, Secunderabad & Telangana</span>
            <a
              href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
              className="flex items-center gap-1.5 text-white hover:text-amber-400 font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              <span>{BRAND_CONFIG.contact.phoneDisplay.split('/')[0]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-fintech-navy via-blue-900 to-fintech-royal p-0.5 shadow-md flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-fintech-navy rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <span className="text-xl font-extrabold tracking-tight text-white">Z</span>
              <span className="w-2 h-2 rounded-full bg-orange-500 absolute bottom-1.5 right-1.5"></span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold text-fintech-navy tracking-tight leading-tight group-hover:text-fintech-royal transition-colors">
              {BRAND_CONFIG.brandName}
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide">
              {BRAND_CONFIG.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'text-fintech-royal bg-blue-50/80 shadow-xs'
                    : 'text-slate-700 hover:text-fintech-royal hover:bg-slate-100/70'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/apply"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-fintech-royal to-blue-700 hover:from-blue-700 hover:to-fintech-navy shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-200"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/apply"
            className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-fintech-royal shadow-xs"
          >
            Apply
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-fintech-royal hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold ${
                    active
                      ? 'text-fintech-royal bg-blue-50'
                      : 'text-slate-800 hover:bg-slate-100 hover:text-fintech-royal'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <Link
              to="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-fintech-royal to-blue-700 text-center shadow-md"
            >
              <span>Apply for Loan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">Assistance Hours:</p>
              <p>{BRAND_CONFIG.contact.businessHours}</p>
              <p className="pt-1 text-slate-500 font-medium">Service Area: {BRAND_CONFIG.targetRegion}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
