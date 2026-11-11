import React from 'react';
import {
  Building2,
  Globe,
  Smartphone,
  Bot,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Wheat,
  MessageSquare,
  Sparkles,
  Database,
  Cpu,
  Users,
  Handshake,
  CheckCircle
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';

export const ZippyEnterprisesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-[#0A182E] to-slate-950 text-white relative overflow-hidden border-t border-slate-800" id="zippy-enterprises">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-wide uppercase mb-3 shadow-xs backdrop-blur-md">
            <Building2 className="w-4 h-4 text-accent" />
            <span>Corporate Headquarters & Technology Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Zippy Enterprises Private Limited
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Leading innovations across enterprise software applications, IT engineering services, and authorized DSA banking loan solutions from Nacharam, Hyderabad.
          </p>

          {/* Urgent Hiring Banner: Zippy DSA Loans Executive (Only 5 Jobs Available) */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-blue-500/20 border-2 border-amber-500/60 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-accent text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0 animate-bounce">
                💼
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full">
                    Urgent Hiring
                  </span>
                  <span className="text-xs text-amber-300 font-extrabold">
                    Only 5 Jobs Are Available!
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white mt-0.5">
                  Zippy DSA Loans Executive Jobs — Zippy Enterprises Private Limited
                </h4>
                <p className="text-xs text-slate-300">
                  Fixed Salary + High Incentives • Nacharam Office • Immediate Joining
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                'Hello Zippy Enterprises Private Limited, I want to apply for the Zippy DSA Loans Executive job (Only 5 Positions Available). Please share the form details.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent to-amber-600 hover:from-amber-600 hover:to-accent text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all text-center shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Fill Form (Apply Now)</span>
              <span>→</span>
            </a>
          </div>

          {/* Sub Loan Connectors Refers Commissions in Hyderabad Telangana Banner */}
          <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-blue-500/20 border-2 border-emerald-500/60 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full">
                    Partner & Referral Program
                  </span>
                  <span className="text-xs text-emerald-300 font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-300" />
                    <span>Attractive Commissions • Spot Payouts</span>
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white mt-1">
                  Sub Loan Connectors Refers Commissions in Hyderabad Telangana
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Join as a Zippy Sub Loan Connector! Refer loan borrowers for Personal Loans, Home Loans, Business Loans, and Loan Against Property (LAP). Earn handsome referral commissions per disbursed file across Hyderabad & all Telangana districts. Zero investment required!
                </p>
                <div className="flex flex-wrap gap-2 mt-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-medium">✓ High Referral Commission</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-medium">✓ Zero Registration Fee</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-medium">✓ Open for All in Telangana</span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                'Hello Zippy Enterprises Private Limited, I am interested in joining as a Sub Loan Connector for referral commissions in Hyderabad Telangana. Please share connector registration details.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all text-center shrink-0 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Join as Connector</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Two-Column Grid: Left Side (IT Services & DSA Loans) & Right Side (Software Management Apps) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: Zippy Enterprises Private Limited & Services   */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl flex flex-col justify-between backdrop-blur-xl relative group hover:border-blue-500/50 transition-all duration-300">
            <div className="space-y-6">
              
              {/* Header Box */}
              <div className="pb-5 border-b border-slate-800">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-primary flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                      Z
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        Zippy Enterprises Private Limited
                      </h3>
                      <p className="text-xs text-accent font-semibold tracking-wide uppercase">
                        Zippy Softwares (Also Available)
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider border border-blue-400/30 shrink-0">
                    IT & Tech Hub
                  </span>
                </div>
              </div>

              {/* 1. Zippy Softwares - 3 Core IT Services */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-accent" />
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Zippy Softwares — IT Engineering Services
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {/* Service 1: Web Development */}
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 hover:border-blue-400/40 transition-all flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm font-bold">1. Web Development</strong>
                        <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded font-medium">Custom & Fast</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        High-performance responsive websites, business web portals, modern React / Next.js web apps, and enterprise CMS platforms tailored for high search rankings.
                      </p>
                    </div>
                  </div>

                  {/* Service 2: App Development */}
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 hover:border-emerald-400/40 transition-all flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm font-bold">2. App Development</strong>
                        <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded font-medium">Android & iOS</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Custom native and cross-platform mobile apps, customer interfaces, fintech dashboards, and cloud-integrated mobile platforms built for scalability.
                      </p>
                    </div>
                  </div>

                  {/* Service 3: AI Agent Automation Services */}
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 hover:border-purple-400/40 transition-all flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm font-bold">3. AI Agent Automation Services</strong>
                        <span className="text-[10px] bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded font-medium">AI & Bots</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Intelligent AI agent workflows, automated WhatsApp & web chatbots, LLM powered operations, customer lead automation, and modern smart business bots.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Zippy DSA Loans (Financial Referral Services) */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                      Zippy DSA Loans — Financial Services
                    </h4>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Zero Upfront Fee</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Direct partner banking loan referral assistance for salaried & business borrowers across Hyderabad & Telangana:
                  </p>
                  
                  {/* Small compact list of loan services */}
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-1 rounded-lg bg-slate-900/80 text-blue-200 border border-blue-800/50">Home Loans</span>
                    <span className="px-2 py-1 rounded-lg bg-slate-900/80 text-blue-200 border border-blue-800/50">Personal Loans</span>
                    <span className="px-2 py-1 rounded-lg bg-slate-900/80 text-blue-200 border border-blue-800/50">Business & MSME Loans</span>
                    <span className="px-2 py-1 rounded-lg bg-slate-900/80 text-blue-200 border border-blue-800/50">Plot & Flat Loans</span>
                    <span className="px-2 py-1 rounded-lg bg-slate-900/80 text-blue-200 border border-blue-800/50">Loan Against Property (LAP)</span>
                    <span className="px-2 py-1 rounded-lg bg-slate-900/80 text-blue-200 border border-blue-800/50">Vehicle & Construction</span>
                  </div>
                </div>
              </div>

              {/* Office Address Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-800/90 to-blue-950/70 border border-blue-500/30">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                      Zippy Enterprises Head Office Address:
                    </span>
                    <strong className="text-white text-sm font-bold block mt-0.5">
                      Sneha Apartments, HMT Nagar
                    </strong>
                    <span className="text-slate-200 block">
                      Nacharam, 500076, Hyderabad, Telangana
                    </span>
                    <span className="text-slate-400 text-[11px] block mt-0.5">
                      Landmark: Sneha Apartments, HMT Nagar Main Hub
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Left Side Action Button */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">
                Contact: <strong className="text-white">+91 63026 90251</strong>
              </span>

              <a
                href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Zippy Enterprises Private Limited, I would like to inquire about Zippy Softwares (Web, App & AI Automation Services).'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Inquire for Softwares</span>
              </a>
            </div>
          </div>


          {/* ========================================================= */}
          {/* RIGHT SIDE: Zippy Enterprises Private Limited - Apps      */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl flex flex-col justify-between backdrop-blur-xl relative group hover:border-amber-500/50 transition-all duration-300">
            <div className="space-y-6">
              
              {/* Header Box */}
              <div className="pb-5 border-b border-slate-800">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                      ZE
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        Zippy Enterprises Private Limited
                      </h3>
                      <p className="text-xs text-amber-400 font-semibold tracking-wide uppercase">
                        Software Management Apps
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30 shrink-0">
                    Flagship Products
                  </span>
                </div>
              </div>

              {/* Subheading */}
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  Enterprise Software Management Applications
                </h4>
              </div>

              {/* 1st Option: Zippy Loan Connector Management Software App */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-800/50 to-blue-950/40 border border-blue-500/30 hover:border-blue-400/60 transition-all space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                        Option 1 • Management App
                      </span>
                      <h5 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                        Zippy Loan Connector Management Software App
                      </h5>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30 text-[10px] font-bold shrink-0">
                    Fintech CRM
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  A high-efficiency software management application built specifically for DSAs, loan connectors, and financial advisory agencies to manage hundreds of loan files simultaneously.
                </p>

                {/* Key App Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Real-time Lead & Dossier Tracking</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Automated WhatsApp Updates</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Bank Submission Pipelines</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Agent Commission & Payout Ledger</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Available directly through Zippy Enterprises</span>
                  <span className="text-accent font-semibold">Web & Mobile Ready</span>
                </div>
              </div>

              {/* 2nd Option: Zippy Rice Mill Management Software App */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-800/50 to-amber-950/30 border border-amber-500/30 hover:border-amber-400/60 transition-all space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Wheat className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                        Option 2 • Management App
                      </span>
                      <h5 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                        Zippy Rice Mill Management Software App
                      </h5>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold shrink-0">
                    Agro ERP App
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Comprehensive end-to-end industrial enterprise management software designed for modern rice mills, paddy processing units, and agro-commodity trading businesses.
                </p>

                {/* Key App Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Paddy Procurement & Weighbridge Sync</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Milling Yield (Rice, Bran & Husk)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Wholesale & Multi-tier GST Invoicing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Warehouse Storage & Trader Ledgers</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Available directly through Zippy Enterprises</span>
                  <span className="text-amber-400 font-semibold">ERP & Mobile Cloud</span>
                </div>
              </div>

            </div>

            {/* Right Side Action Button */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">
                Software Solutions by <strong className="text-white">Zippy Enterprises</strong>
              </span>

              <a
                href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Zippy Enterprises Private Limited, I would like to request a demo and details for: 1) Zippy Loan Connector Management Software App, 2) Zippy Rice Mill Management Software App.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Request App Demo on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
