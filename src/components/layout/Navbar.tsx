import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Wallet,
  Home,
  Briefcase,
  Building2,
  Car,
  Hammer,
  Layers
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const featuredServices = [
    { name: 'Personal Loan', path: '/services/personal-loan', icon: Wallet, desc: 'Unsecured personal credit up to ₹50L' },
    { name: 'Home Loan', path: '/services/home-loan', icon: Home, desc: 'Flats & villas across Hyderabad' },
    { name: 'Business Loan', path: '/services/business-loan', icon: Briefcase, desc: 'Collateral-free MSME working capital' },
    { name: 'Loan Against Property', path: '/services/loan-against-property', icon: Building2, desc: 'High-ticket mortgage up to ₹15Cr' },
    { name: 'Vehicle Loan', path: '/services/vehicle-loan', icon: Car, desc: 'New & used car on-road financing' },
    { name: 'Construction Loan', path: '/services/construction-loan', icon: Hammer, desc: 'Staged funds on residential plots' },
  ];

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
      {/* Top Advisory Bar */}
      <div className="bg-primary text-slate-300 text-xs py-1.5 px-4 sm:px-6">
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
            <span className="text-slate-300">Target Location: {BRAND_CONFIG.targetRegion}</span>
            <a
              href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
              className="flex items-center gap-1.5 text-white hover:text-amber-400 font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-accent" />
              <span>{BRAND_CONFIG.contact.phoneDisplay.split('/')[0]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary via-blue-900 to-secondary p-0.5 shadow-md flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105 shrink-0">
            <div className="w-full h-full bg-primary rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white">Z</span>
              <span className="w-2 h-2 rounded-full bg-accent absolute bottom-1.5 right-1.5"></span>
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-base sm:text-lg md:text-xl font-extrabold text-primary tracking-tight leading-tight group-hover:text-secondary transition-colors truncate">
              {BRAND_CONFIG.brandName}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-wide truncate">
              {BRAND_CONFIG.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              location.pathname === '/'
                ? 'text-secondary bg-blue-50/80 shadow-xs'
                : 'text-darkSlate hover:text-secondary hover:bg-slate-100/70'
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isActive('/about')
                ? 'text-secondary bg-blue-50/80 shadow-xs'
                : 'text-darkSlate hover:text-secondary hover:bg-slate-100/70'
            }`}
          >
            About Us
          </Link>

          {/* Loan Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/services') || servicesDropdownOpen
                  ? 'text-secondary bg-blue-50/80 shadow-xs'
                  : 'text-darkSlate hover:text-secondary hover:bg-slate-100/70'
              }`}
              aria-expanded={servicesDropdownOpen}
            >
              <span>Loan Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Box */}
            {servicesDropdownOpen && (
              <div
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute top-full left-0 w-80 mt-1 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 mb-1">
                  Popular Loan Categories
                </div>

                <div className="space-y-1">
                  {featuredServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.name}
                        to={service.path}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-secondary group-hover:bg-secondary group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-secondary transition-colors">
                            {service.name}
                          </div>
                          <div className="text-[11px] text-slate-500 leading-tight">
                            {service.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100">
                  <Link
                    to="/services"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl text-xs font-bold text-secondary hover:bg-blue-50 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>View All 12 Loan Services</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/eligibility"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isActive('/eligibility')
                ? 'text-secondary bg-blue-50/80 shadow-xs'
                : 'text-darkSlate hover:text-secondary hover:bg-slate-100/70'
            }`}
          >
            Check Eligibility
          </Link>

          <Link
            to="/contact"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isActive('/contact')
                ? 'text-secondary bg-blue-50/80 shadow-xs'
                : 'text-darkSlate hover:text-secondary hover:bg-slate-100/70'
            }`}
          >
            Contact Us
          </Link>

          <Link
            to="/faqs"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isActive('/faqs')
                ? 'text-secondary bg-blue-50/80 shadow-xs'
                : 'text-darkSlate hover:text-secondary hover:bg-slate-100/70'
            }`}
          >
            FAQs
          </Link>
        </div>

        {/* Action Button: Apply Now CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/apply"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-secondary to-blue-700 hover:from-blue-700 hover:to-primary shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <Link
            to="/apply"
            className="hidden xs:inline-flex sm:hidden px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-secondary hover:bg-blue-700 active:scale-95 shadow-xs transition-all"
          >
            Apply Now
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:text-secondary hover:bg-slate-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold ${
                location.pathname === '/' ? 'text-secondary bg-blue-50' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold ${
                isActive('/about') ? 'text-secondary bg-blue-50' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>About Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            {/* Mobile Loan Services Submenu */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold ${
                  isActive('/services') ? 'text-secondary bg-blue-50' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>Loan Services</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl my-1 border border-slate-100">
                  <Link
                    to="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-bold text-secondary hover:underline"
                  >
                    → View All 12 Loan Services
                  </Link>
                  {featuredServices.map((service) => (
                    <Link
                      key={service.name}
                      to={service.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs text-slate-700 hover:text-secondary font-medium"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/eligibility"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold ${
                isActive('/eligibility') ? 'text-secondary bg-blue-50' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>Check Eligibility</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold ${
                isActive('/contact') ? 'text-secondary bg-blue-50' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/faqs"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold ${
                isActive('/faqs') ? 'text-secondary bg-blue-50' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>FAQs</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-3">
            <Link
              to="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-secondary to-blue-700 text-center shadow-md text-sm"
            >
              <span>Apply for Loan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">Assistance Hours:</p>
              <p>{BRAND_CONFIG.contact.businessHours}</p>
              <p className="pt-1 text-slate-500 font-medium">Location: {BRAND_CONFIG.targetRegion}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
