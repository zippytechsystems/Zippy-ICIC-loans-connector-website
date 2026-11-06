/**
 * Centralized Frontend Configuration
 * Brand Name: Zippy ICICI Loan Connector
 * Tagline: Your Loan. Your Choice. Our Guidance.
 * Location: Hyderabad, Telangana, India
 */

export interface BrandConfig {
  brandName: string;
  shortName: string;
  legalEntityName: string;
  tagline: string;
  targetRegion: string;
  primaryCity: string;
  serviceAreas: string[];
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    whatsappNumber: string; // Configurable placeholder (e.g. 919000000000)
    whatsappPrefilledMessage: string;
    email: string;
    officeLocation: string; // City & state only, no fabricated street address
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
  brandName: "Zippy ICICI Loan Connector",
  shortName: "Zippy Loan Connector",
  legalEntityName: "Zippy Financial Referral & Assistance Services",
  tagline: "Your Loan. Your Choice. Our Guidance.",
  targetRegion: "Hyderabad, Secunderabad & Telangana",
  primaryCity: "Hyderabad",
  serviceAreas: [
    "Hyderabad",
    "Secunderabad",
    "Cyberabad / HITEC City",
    "Gachibowli & Financial District",
    "Kukatpally & Miyapur",
    "Banjara Hills & Jubilee Hills",
    "Begumpet & Somajiguda",
    "Dilsukhnagar & LB Nagar",
    "Uppal & Habsiguda",
    "Warangal & Hanamkonda",
    "Karimnagar",
    "Nizamabad",
    "Khammam",
    "Other Telangana Locations"
  ],
  contact: {
    // Configurable placeholders
    phoneDisplay: "+91 90000 00000 / (040) 6828-XXXX",
    phoneRaw: "+919000000000",
    whatsappNumber: "919000000000", // Clearly marked configurable placeholder
    whatsappPrefilledMessage: "Hello Zippy ICICI Loan Connector, I would like to know about suitable loan options.",
    email: "contact@zippyloans.in",
    officeLocation: "Hyderabad, Telangana, India",
    businessHours: "Monday – Saturday: 9:30 AM – 6:30 PM IST (Sunday Closed)"
  },
  socialLinks: {
    facebook: "https://facebook.com/#",
    twitter: "https://twitter.com/#",
    linkedin: "https://linkedin.com/#",
    instagram: "https://instagram.com/#"
  },
  disclaimers: {
    headerNotice: "Independent Loan Referral & Guidance Service. Final sanction and terms depend solely on partner lenders.",
    mainDisclaimer: "Zippy ICICI Loan Connector is an independent loan referral and customer assistance entity. We facilitate connections between prospective borrowers and authorized lender channels. We are NOT ICICI Bank, an official branch, subsidiary, or affiliate thereof. All loans, credit evaluation, interest rates, charges, sanctions, and disbursements are governed entirely by the applicable lender at their sole discretion under their terms and statutory regulations. We do NOT charge upfront fees to customers for referral consultations.",
    shortFooter: "Disclaimer: Zippy ICICI Loan Connector is an independent referral facilitator operating in Hyderabad, Secunderabad, and Telangana. We do not issue loans directly, nor are we an official representative of any specific bank.",
    consentText: "I hereby give my explicit consent to Zippy ICICI Loan Connector to contact me via Call, SMS, WhatsApp, or Email regarding my loan enquiry and to share my requirements with authorized lender representatives as per the Privacy Policy.",
    noAadhaarNotice: "Security Alert: We never ask for your Aadhaar card number, PAN card physical copies, Net Banking passwords, debit card PINs, or OTPs on this website.",
    eligibilityNotice: "Notice: This is a preliminary enquiry form and eligibility estimation guide, not an official bank eligibility calculator or loan approval engine."
  }
};
