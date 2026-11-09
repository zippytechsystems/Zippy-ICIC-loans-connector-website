/**
 * Centralized Frontend Configuration
 * Brand Name: Zippy DSA Loans
 * Tagline: Your Loan. Your Choice. Our Genuine Guidance.
 * Location: Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana
 */

export interface BrandConfig {
  brandName: string;
  shortName: string;
  googleSearchName: string;
  domain: string;
  siteUrl: string;
  legalEntityName: string;
  tagline: string;
  targetRegion: string;
  primaryCity: string;
  serviceAreas: string[];
  parentCompany: {
    legalName: string;
    softwareDivision: string;
    officeAddress: string;
    itServices: {
      id: string;
      title: string;
      desc: string;
    }[];
    softwareApps: {
      id: string;
      name: string;
      tag: string;
      desc: string;
    }[];
  };
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    whatsappNumber: string; // Configurable placeholder (e.g. 919000000000)
    whatsappPrefilledMessage: string;
    email: string;
    officeLocation: string;
    fullOfficeAddress: string;
    officeLandmark: string;
    businessHours: string;
  };
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  disclaimers: {
    headerNotice: string;
    mainDisclaimer: string;
    shortFooter: string;
    consentText: string;
    noAadhaarNotice: string;
    eligibilityNotice: string;
  };
}

export const BRAND_CONFIG: BrandConfig = {
  brandName: "Zippy DSA Loans",
  shortName: "Zippy DSA Loans",
  googleSearchName: "Zippy DSA Loans",
  domain: "zippydsaloans.in",
  siteUrl: "https://zippydsaloans.in",
  legalEntityName: "Zippy DSA Loans - Authorized Banking Referral Services",
  tagline: "Your Loan. Your Choice. Our Genuine Guidance.",
  targetRegion: "Nacharam, Hyderabad, Secunderabad & Telangana",
  primaryCity: "Hyderabad",
  parentCompany: {
    legalName: "Zippy Enterprises Private Limited",
    softwareDivision: "Zippy Softwares",
    officeAddress: "Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana",
    itServices: [
      {
        id: "web-dev",
        title: "Web Development",
        desc: "High-performance responsive websites, customer portals, e-commerce & modern React/Next.js platforms."
      },
      {
        id: "app-dev",
        title: "App Development",
        desc: "Custom Android & iOS mobile applications, native interfaces, and scalable cloud-backed architectures."
      },
      {
        id: "ai-automation",
        title: "AI Agent Automation Services",
        desc: "Agentic AI workflows, intelligent chatbots, customer lead handling, and automated business operations."
      }
    ],
    softwareApps: [
      {
        id: "loan-connector-app",
        name: "Zippy Loan Connector Management Software App",
        tag: "Fintech & DSA Management Platform",
        desc: "Full-lifecycle loan referral & DSA operations app featuring customer lead tracking, bank executive routing, WhatsApp automation, and live status pipelines."
      },
      {
        id: "rice-mill-app",
        name: "Zippy Rice Mill Management Software App",
        tag: "Rice Industry ERP & Operations System",
        desc: "Complete enterprise management app for rice millers: paddy procurement, weighbridge sync, milling batch yield, warehouse inventory, wholesale sales, and GST billing."
      }
    ]
  },
  serviceAreas: [
    "Nacharam & HMT Nagar (Head Office)",
    "Habsiguda & Tarnaka",
    "Uppal & Boduppal",
    "Narapally & Ghatkesar",
    "Secunderabad & Malkajgiri",
    "LB Nagar, Nagole & Kothapet",
    "Dilsukhnagar & Malakpet",
    "Cyberabad / HITEC City & Madhapur",
    "Gachibowli & Financial District",
    "Kukatpally, KPHB & Miyapur",
    "Banjara Hills & Jubilee Hills",
    "Begumpet & Somajiguda",
    "Warangal & Hanamkonda",
    "Karimnagar",
    "Nizamabad",
    "Khammam",
    "All Greater Hyderabad & Telangana Districts"
  ],
  contact: {
    // Official Contact Information
    phoneDisplay: "+91 63026 90251",
    phoneRaw: "+916302690251",
    whatsappNumber: "916302690251",
    whatsappPrefilledMessage: "Hello Zippy DSA Loans, I would like to know about suitable loan options.",
    email: "zippyloanconnector2@gmail.com",
    officeLocation: "Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana",
    fullOfficeAddress: "Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana",
    officeLandmark: "Sneha Apartments, HMT Nagar, Nacharam Hub, Hyderabad",
    businessHours: "Monday – Saturday: 9:30 AM – 6:30 PM IST (Sunday Closed)"
  },
  socialLinks: {
    facebook: "https://facebook.com/#",
    twitter: "https://twitter.com/#",
    linkedin: "https://linkedin.com/#",
    instagram: "https://instagram.com/#"
  },
  disclaimers: {
    headerNotice: "Genuine Direct Selling Agent (DSA) & Independent Loan Referral Desk. Sanction & terms depend on partner lenders.",
    mainDisclaimer: "Zippy DSA Loans is a genuine, authorized Direct Selling Agent (DSA) and loan referral partner with its registered office located at Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana. We assist prospective borrowers in finding suitable loan solutions through authorized banking and NBFC channels. All credit evaluation, interest rates, sanctions, and disbursements are governed solely by partner lending institutions according to statutory regulations. We do NOT charge upfront fees to customers for referral consultations.",
    shortFooter: "Disclaimer: Zippy DSA Loans is a genuine Direct Selling Agent (DSA) and loan referral consultant headquartered at Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana. We do not charge upfront fees.",
    consentText: "I hereby give my explicit consent to Zippy DSA Loans to contact me via Call, SMS, WhatsApp, or Email regarding my loan enquiry and to share my requirements with authorized lender representatives as per the Privacy Policy.",
    noAadhaarNotice: "Security Alert: We never ask for your Aadhaar card number, PAN card physical copies, Net Banking passwords, debit card PINs, or OTPs on this website.",
    eligibilityNotice: "Notice: This is a preliminary enquiry form and eligibility estimation guide, not an official bank eligibility calculator or loan approval engine."
  }
};
