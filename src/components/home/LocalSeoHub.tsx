import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Building,
  Home as HomeIcon,
  Briefcase,
  TrendingDown,
  CreditCard,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';

interface AreaHub {
  name: string;
  tag: string;
  pincode: string;
  landmark: string;
  popularLoans: string[];
}

const LOCAL_HUBS: AreaHub[] = [
  {
    name: "Nacharam & HMT Nagar",
    tag: "Primary Hub",
    pincode: "500076",
    landmark: "Nacharam Main Road / HMT Nagar Colony",
    popularLoans: ["House Purchase Loans", "Business & MSME Loans", "Plot Loans", "Personal Loans"]
  },
  {
    name: "Habsiguda & Tarnaka",
    tag: "East Zone",
    pincode: "500007",
    landmark: "Metro Station & Street No. 8 Junction",
    popularLoans: ["Flat Purchase Loans", "Home Renovation", "Balance Transfer", "Car Loans"]
  },
  {
    name: "Uppal & Boduppal",
    tag: "High Growth Corridor",
    pincode: "500039",
    landmark: "Uppal Ring Road & Peerzadiguda Hub",
    popularLoans: ["Plot Purchase Loans", "Construction Loans", "Personal Loans", "MSME Credit"]
  },
  {
    name: "Narapally & Ghatkesar",
    tag: "Warangal Highway Hub",
    pincode: "500088",
    landmark: "Narapally Main Junction / Pocharam IT",
    popularLoans: ["Open Plot Loans", "House Construction", "Independent House Loans", "Vehicle Loans"]
  },
  {
    name: "Secunderabad & Malkajgiri",
    tag: "Twin Cities Core",
    pincode: "500003",
    landmark: "Clock Tower / Station Road / Anandbagh",
    popularLoans: ["Home Renovation Loans", "Loan Against Property", "Top-Up Loans", "Consumer Loans"]
  },
  {
    name: "LB Nagar, Nagole & Kothapet",
    tag: "South-East Hub",
    pincode: "500074",
    landmark: "LB Nagar X Roads & Sagar Ring Road",
    popularLoans: ["Business Expansion Loans", "Flat Purchase Loans", "Bike Loans", "Medical Loans"]
  },
  {
    name: "HITEC City, Gachibowli & Cyberabad",
    tag: "IT & Tech Corridor",
    pincode: "500081",
    landmark: "Madhapur, Kondapur & Financial District",
    popularLoans: ["Premium Home Loans", "Express Personal Loans", "Credit Card Loans", "Car Loans"]
  },
  {
    name: "Kukatpally, KPHB & Miyapur",
    tag: "West Residential",
    pincode: "500072",
    landmark: "KPHB Colony & JNTU Road",
    popularLoans: ["Apartment Flat Loans", "Balance Transfer", "Education Loans", "Gold Loans"]
  },
  {
    name: "All Telangana Districts",
    tag: "Statewide Coverage",
    pincode: "500001 - 509999",
    landmark: "Warangal, Karimnagar, Nizamabad, Khammam, Nalgonda",
    popularLoans: ["Project Loans", "Machinery Loans", "MSME Commercial", "Mortgage Loans"]
  }
];

const SEARCH_CATEGORIES = [
  {
    category: "Real Estate & Property Loans",
    icon: HomeIcon,
    items: [
      { name: "House Purchase Loans", desc: "Independent villas & resale houses", link: "/home-loan" },
      { name: "Plot Purchase Loans", desc: "HMDA & RERA approved residential plots", link: "/construction-loan" },
      { name: "Flat Purchase Loans", desc: "Gated communities & multi-floor flats", link: "/home-loan" },
      { name: "Construction Loans", desc: "Self-construction on own open land", link: "/construction-loan" },
      { name: "Home Improvement & Renovation", desc: "Interior styling, repairs & floor extensions", link: "/home-loan" }
    ]
  },
  {
    category: "Commercial & Business Funding",
    icon: Briefcase,
    items: [
      { name: "Business Loans & MSME", desc: "Working capital, shop & factory expansion", link: "/business-loan" },
      { name: "Loan Against Property (LAP)", desc: "High-value funding against commercial/residential", link: "/loan-against-property" },
      { name: "Credit Card Overdraft Loans", desc: "Pre-approved card lines & business liquidity", link: "/personal-loan" },
      { name: "Machinery & Equipment Loans", desc: "Industrial tools, machinery & manufacturing", link: "/business-loan" }
    ]
  },
  {
    category: "Personal & Lifestyle Financing",
    icon: CreditCard,
    items: [
      { name: "Personal Loans (Instant Cash)", desc: "Quick salaried & self-employed personal credit", link: "/personal-loan" },
      { name: "Car Loans (New & Used)", desc: "Four-wheeler financing with low EMI options", link: "/vehicle-loan" },
      { name: "Bike & Two-Wheeler Loans", desc: "Commuter & electric two-wheelers", link: "/vehicle-loan" },
      { name: "Consumer & Appliance Loans", desc: "Electronics, gadgets & lifestyle durables", link: "/services" },
      { name: "Education Loans", desc: "Higher education in India & study abroad", link: "/services" }
    ]
  },
  {
    category: "Interest Saver & Refinance",
    icon: TrendingDown,
    items: [
      { name: "Loan Balance Transfer (BT)", desc: "Switch high-interest loans for lower monthly EMI", link: "/services" },
      { name: "Top-Up Loans", desc: "Extra funds on existing home or personal loan", link: "/services" },
      { name: "Medical Emergency Loans", desc: "Instant funding for urgent hospital treatments", link: "/personal-loan" }
    ]
  }
];

export const LocalSeoHub: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<AreaHub>(LOCAL_HUBS[0]);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background illumination */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-accent animate-bounce" />
            <span>Hyper-Local Bank Loan Assistance Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Bank Loan Consultant Near You in Hyderabad & Telangana
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Searching for <strong className="text-white">"Bank Loans Near Me"</strong> or an experienced loan consultant? Whether you need a <span className="text-amber-400 font-semibold">House Loan in Nacharam</span>, a <span className="text-amber-400 font-semibold">Plot Loan in Uppal</span>, a <span className="text-amber-400 font-semibold">Flat Loan in Habsiguda</span>, or <span className="text-amber-400 font-semibold">MSME Business Credit in LB Nagar & Narapally</span>—we connect you directly to authorized lending channels with zero consulting fees.
          </p>
        </div>

        {/* 1. Interactive Area Hub Selector */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-secondary" />
              <span>Select Your Local Area in Hyderabad & Telangana</span>
            </h3>
            <span className="text-xs text-slate-400 hidden sm:inline">9 Key Service Hubs</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {LOCAL_HUBS.map((hub) => {
              const isSelected = selectedHub.name === hub.name;
              return (
                <button
                  key={hub.name}
                  onClick={() => setSelectedHub(hub)}
                  className={`p-3.5 rounded-xl text-left transition-all duration-200 border ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500'
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent px-1.5 py-0.5 rounded bg-amber-500/10">
                      {hub.pincode.slice(0, 6)}
                    </span>
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-tight line-clamp-1">
                    {hub.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {hub.tag}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Area Banner */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-800/90 via-slate-800 to-blue-950/60 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Active Consultation Desk Available
                </span>
              </div>
              <h4 className="text-xl font-bold text-white">
                {selectedHub.name} – Pincode {selectedHub.pincode}
              </h4>
              <p className="text-xs text-slate-300">
                Key Coverage: {selectedHub.landmark}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedHub.popularLoans.map((loan) => (
                  <span
                    key={loan}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-900/50 border border-blue-700/40 text-[11px] font-medium text-blue-200"
                  >
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                    <span>{loan}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <a
                href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Zippy Loan Connector, I live in ${selectedHub.name} (Pincode: ${selectedHub.pincode}) and need consultation for a bank loan.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk ({selectedHub.name})</span>
              </a>

              <Link
                to="/apply"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-accent to-amber-600 hover:from-amber-600 hover:to-accent text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Check Eligibility</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Complete Loan Search Catalog (Targeting All Loan Queries) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Every Loan Category Handled Under One Roof
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From house purchase to MSME commercial credit—explore tailored options for all personal and business requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SEARCH_CATEGORIES.map((catGroup) => {
              const IconComp = catGroup.icon;
              return (
                <div
                  key={catGroup.category}
                  className="rounded-2xl bg-slate-800/70 border border-slate-700/80 p-5 hover:border-blue-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-700/80 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {catGroup.category}
                      </h4>
                    </div>

                    <ul className="space-y-3">
                      {catGroup.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.link}
                            className="group block p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                          >
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-amber-400">
                              <span>{item.name}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {item.desc}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-700/60">
                    <Link
                      to="/apply"
                      className="text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <span>Check rates & eligibility</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Direct Help Strip */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border border-blue-800/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Need urgent assistance for any loan in Hyderabad or Telangana?
              </h4>
              <p className="text-xs text-slate-400">
                Call our central guidance desk at <strong className="text-white">+91 63026 90251</strong> or visit our Nacharam referral center.
              </p>
            </div>
          </div>

          <a
            href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-md transition-all shrink-0"
          >
            Call +91 63026 90251
          </a>
        </div>

      </div>
    </section>
  );
};
