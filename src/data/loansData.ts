export interface LoanProduct {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  heroHeadline: string;
  fullDescription: string;
  indicativeRate: string;
  tenureRange: string;
  maxAmount: string;
  processingTime: string;
  iconName: string;
  badge?: string;
  keyHighlights: string[];
  features: string[];
  eligibility: {
    ageRange: string;
    employmentType: string;
    minIncome: string;
    minCreditScore: string;
    residence: string;
  };
  requiredDocuments: {
    category: string;
    items: string[];
  }[];
  steps: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  lenderDisclaimer: string;
}

export const LOANS_DATA: LoanProduct[] = [
  {
    id: "personal-loans",
    slug: "personal-loans",
    title: "Personal Loans",
    shortDescription: "Unsecured personal financing for weddings, travel, emergencies, and unexpected expenses with flexible tenure.",
    heroHeadline: "Fast & Convenient Personal Loan Referral Guidance in Hyderabad",
    fullDescription: "Personal loans provide quick, multi-purpose liquidity without pledging any collateral. Whether you are planning a milestone family event, consolidating existing card obligations, funding sudden medical emergencies, or renovating your apartment in Hyderabad, our advisory service helps you structure your requirement and guides you through the application channel with partner lenders.",
    indicativeRate: "From 8.00% p.a. (indicative)",
    tenureRange: "12 to 72 Months",
    maxAmount: "Up to ₹50 Lakhs",
    processingTime: "24 – 72 Hours (subject to lender verification)",
    iconName: "Wallet",
    badge: "Most Popular",
    keyHighlights: [
      "Zero collateral or guarantor required",
      "Minimal documentation for salaried professionals",
      "Flexible repayment tenures from 1 to 6 years",
      "Special guidance for MNC & IT employees in HITEC City / Gachibowli"
    ],
    features: [
      "Multi-purpose loan with no restriction on end-use (except speculative activities)",
      "Competitive rate bands evaluated on credit profile and employer tiering",
      "Structured pre-closure and part-payment choices per lender policy",
      "Digital verification assistance for expedited underwriting"
    ],
    eligibility: {
      ageRange: "21 to 58 years (at loan maturity)",
      employmentType: "Salaried in Private/Govt Sector, or Self-Employed Professional",
      minIncome: "₹25,000 net monthly salary (salaried) / ₹3.5 Lakhs ITR (self-employed)",
      minCreditScore: "650+ preferred (700+ gets preferential lender brackets)",
      residence: "Resident of Hyderabad, Secunderabad, or Telangana for min 6 months"
    },
    requiredDocuments: [
      {
        category: "Identity & Address Proof",
        items: ["Valid Passport", "Voter ID Card", "Driving License", "Utility Bill (Electricity/Piped Gas under 2 months)"]
      },
      {
        category: "Income Proof (Salaried)",
        items: ["Latest 3 months salary slips", "Latest 6 months salary bank account statement", "Form 16 / ITR of previous financial year"]
      },
      {
        category: "Income Proof (Self-Employed)",
        items: ["2 years computation of income and ITR acknowledgment", "Latest 6 months active current account statements", "Business registration proof (GST/Trade license)"]
      }
    ],
    steps: [
      "Submit preliminary requirements via Zippy Loan Connector",
      "Profile verification and eligibility check against lender matrices",
      "Guided documentation assembly and submission to authorized lender desk",
      "Lender underwriting, credit verification, and direct disbursement to your account"
    ],
    faqs: [
      {
        question: "Can I get a personal loan if I recently joined a new job in Hyderabad?",
        answer: "Most partner lenders look for at least 1-2 years total work experience with minimum 3-6 months at your current employer. If you have continuous employment with reputed corporate firms, exceptions may be considered."
      },
      {
        question: "Does checking eligibility with Zippy impact my CIBIL score?",
        answer: "No. Our initial consultation and advisory assessment do not create a hard credit inquiry. A hard bureau pull only occurs when your formal dossier is submitted directly to the lender with your consent."
      },
      {
        question: "Are pre-payment charges applicable?",
        answer: "Prepayment or foreclosure terms depend strictly on the sanctioning lender's schedule of charges and RBI guidelines for floating vs fixed rate personal loans."
      }
    ],
    lenderDisclaimer: "Sanction of personal loan amount, interest rate, and processing fee depends entirely on the lending bank's risk assessment, credit scoring criteria, and policy changes."
  },
  {
    id: "home-loans",
    slug: "home-loans",
    title: "Home Loans",
    shortDescription: "Attractive financing solutions for purchasing new flats, independent villas, or plots across Hyderabad and Telangana.",
    heroHeadline: "Affordable Home Loan Guidance for Your Dream Property in Hyderabad",
    fullDescription: "Purchasing a home is one of the most critical financial decisions you will ever make. Our loan connector team provides end-to-end guidance for residential real estate acquisitions across Hyderabad, Cyberabad, and expanding Telangana corridors. We assist with assessing your borrowing capacity, structuring co-borrower profiles, understanding property legal scrutiny stages, and routing your application to authorized lending officers.",
    indicativeRate: "From 8.00% p.a. (floating, indicative)",
    tenureRange: "Up to 30 Years",
    maxAmount: "Up to ₹10 Crores (subject to property valuation & LTV)",
    processingTime: "5 – 10 Working Days (including legal & technical verification)",
    iconName: "Home",
    badge: "Low Interest",
    keyHighlights: [
      "Extended repayment tenure up to 30 years for manageable EMIs",
      "High Loan-to-Value (LTV) ratio up to 75% - 90% as per RBI caps",
      "PMAY subsidy / tax benefits guidance under Section 80C and 24(b)",
      "Pre-approved project listings for major builders across Hyderabad"
    ],
    features: [
      "Financing for under-construction, ready-to-move, and resale residential units",
      "Flexible co-applicant options (Spouse, Parents, Working Children) to increase eligibility",
      "Customized repayment structures (Step-up, Tranche-based disbursements)",
      "Technical evaluation and legal chain verification coordination with bank empaneled advocates"
    ],
    eligibility: {
      ageRange: "21 to 65 years at maturity",
      employmentType: "Salaried, Self-Employed Professional, or Business Entrepreneur",
      minIncome: "₹30,000 monthly combined family income",
      minCreditScore: "700+ recommended for best home loan spreads",
      residence: "Indian Citizen / NRI purchasing property in Hyderabad or Telangana"
    },
    requiredDocuments: [
      {
        category: "KYC Documents",
        items: ["Government photo ID", "Current residential address proof", "Recent passport-sized photographs"]
      },
      {
        category: "Financial Documents",
        items: ["6 months bank statement", "Last 3 months salary slips or 3 years ITR with computation", "Form 16 / appointment letter"]
      },
      {
        category: "Property Documents",
        items: ["Sale deed / Agreement of sale", "Allotment letter from builder", "Occupancy certificate / Approved GHMC or HMDA layout copy", "Prior title link documents for 13-30 years (for resale)"]
      }
    ],
    steps: [
      "Calculate realistic affordability and budget based on net monthly earnings",
      "Identify compliant properties with HMDA/GHMC approvals",
      "Submit property drafts and financial proofs for lender legal & technical inspection",
      "Final sanction letter issuance, signing loan agreement, and scheduled disbursement"
    ],
    faqs: [
      {
        question: "Can I add my spouse as a co-applicant to increase my loan eligibility?",
        answer: "Yes, adding a earning spouse as a co-applicant can substantially enhance your overall loan sanction amount, while also allowing both of you to claim income tax deductions under Section 80C and Section 24(b)."
      },
      {
        question: "What is the difference between GHMC and HMDA approved properties for home loans?",
        answer: "Lenders look for clear municipal approvals (GHMC in core city areas, HMDA in metropolitan peripheries). Bank empaneled legal advocates review the master layout sanctions before issuing disbursement clearance."
      }
    ],
    lenderDisclaimer: "Property valuation, title clearance by bank advocates, and underwriting decisions are sole prerogatives of the lending institution."
  },
  {
    id: "business-loans",
    slug: "business-loans",
    title: "Business Loans",
    shortDescription: "Working capital, expansion funds, and equipment loans for MSMEs, trading firms, and commercial enterprises in Telangana.",
    heroHeadline: "Scale Your Business With Tailored Commercial Loan Guidance",
    fullDescription: "From manufacturing units in Jeedimetla and Balanagar to IT solution providers in Madhapur and retail chains across Hyderabad, businesses need agile liquidity to seize market opportunities. Our referral assistance bridges business owners with authorized MSME and commercial banking desks for collateral-free term loans, cash credit (CC) limits, and overdraft facilities.",
    indicativeRate: "From 8.00% p.a. (indicative)",
    tenureRange: "12 to 60 Months",
    maxAmount: "Up to ₹1 Crore (unsecured) / Higher for secured",
    processingTime: "3 – 7 Working Days",
    iconName: "Briefcase",
    badge: "MSME Special",
    keyHighlights: [
      "Unsecured working capital facilities available without collateral",
      "High ticket limits tailored for growing turnover and healthy GST filings",
      "Structured overdraft and dropline credit line facilities",
      "Dedicated MSME priority sector referral paths"
    ],
    features: [
      "No equity dilution or external stakeholder interference",
      "Flexibility to deploy funds for raw material procurement, inventory, machinery, or office expansion",
      "Evaluation based on banking turnover, GST 3B consistency, and audited balance sheets",
      "Special programs for enterprises with 3+ years operational track record in Telangana"
    ],
    eligibility: {
      ageRange: "24 to 65 years",
      employmentType: "Proprietorship, Partnership, Private Limited, or LLP",
      minIncome: "Minimum ₹40 Lakhs annual GST turnover / positive net cash flow",
      minCreditScore: "CIBIL / CMR score 675+",
      residence: "Business operational in Telangana for at least 2 consecutive years"
    },
    requiredDocuments: [
      {
        category: "Entity Proof",
        items: ["GST Registration Certificate", "Udyam MSME Certificate", "Partnership deed / Certificate of Incorporation & MOA/AOA"]
      },
      {
        category: "Financials",
        items: ["2 years Audited Balance Sheet & P&L statements", "Last 12 months GST returns (GSTR-1 & GSTR-3B)", "Last 12 months operative business current account statements"]
      },
      {
        category: "Promoter Proofs",
        items: ["Promoter/Director KYC documents", "Proof of business premises ownership or registered rental agreement"]
      }
    ],
    steps: [
      "Preliminary assessment of business turnover, debt-service coverage (DSCR), and banking health",
      "Matching with lender programs (MSME scheme, surrogate banking programs, balance-sheet funding)",
      "Document compilation and submission to lender relationship manager",
      "Field investigation, credit approval, and facility activation"
    ],
    faqs: [
      {
        question: "Can newly incorporated startups with under 1 year vintage apply?",
        answer: "Unsecured business loans usually require at least 2-3 years of continuous audited operations and GST filings. For early-stage entities, secured loan against property or specialized startup programs may be explored."
      },
      {
        question: "Is collateral required for loans up to ₹50 Lakhs?",
        answer: "Lenders provide unsecured business loans up to specific limits based on your banking velocity and profitability without requiring mortgage collateral."
      }
    ],
    lenderDisclaimer: "Credit appraisal, financial ratios analysis, and facility limits are governed exclusively by the credit committee of the respective lending institution."
  },
  {
    id: "loan-against-property",
    slug: "loan-against-property",
    title: "Loan Against Property",
    shortDescription: "Unlock the commercial value of your residential, commercial, or industrial property with competitive rates and high limits.",
    heroHeadline: "Monetize Your Hyderabad Property With High-Value Mortgage Loans",
    fullDescription: "Loan Against Property (LAP) allows property owners in Hyderabad, Secunderabad, and adjoining Telangana regions to leverage self-occupied residential houses, commercial office spaces, or industrial plots. By mortgaging your registered real estate asset, you obtain high loan limits at substantially lower interest rates compared to unsecured funding, with repayment tenures stretching up to 15 years.",
    indicativeRate: "From 8.00% p.a. (indicative)",
    tenureRange: "Up to 15 Years",
    maxAmount: "Up to ₹15 Crores (subject to market valuation)",
    processingTime: "7 – 14 Working Days",
    iconName: "Building2",
    badge: "High Limit",
    keyHighlights: [
      "Interest rates lower than personal or unsecured business loans",
      "High LTV: Borrow up to 60% – 70% of registered market value",
      "Retain ownership and continuous physical possession of your property",
      "Both residential and commercial properties eligible"
    ],
    features: [
      "Can be used for debt consolidation, massive business expansion, overseas education, or capital expenditure",
      "Structured terms including term loan and overdraft (OD) facility combinations",
      "Longer amortization schedules to keep monthly cash outflows minimal",
      "Clear title examination assisted by authorized bank legal panels"
    ],
    eligibility: {
      ageRange: "25 to 68 years at loan termination",
      employmentType: "Salaried executives, Self-Employed professionals, and Business Owners",
      minIncome: "Stable documented income stream demonstrating debt servicing capability",
      minCreditScore: "680+",
      residence: "Indian resident or NRI owning unencumbered property in Telangana"
    },
    requiredDocuments: [
      {
        category: "Property Chain Documents",
        items: ["Registered Sale Deed / Gift Deed / Partition Deed", "Encumbrance Certificate (EC) for past 30 years", "Latest Property Tax receipts and electricity bill", "Sanctioned building layout and plan approval"]
      },
      {
        category: "Applicant Financials",
        items: ["3 years ITR with Computation / 6 months salary slips", "12 months bank statements of all active accounts", "Existing loan repayment track records (if any)"]
      }
    ],
    steps: [
      "Property preliminary viability assessment (check HMDA/GHMC zones & title clarity)",
      "Technical evaluation by empaneled valuers to establish fair market valuation",
      "Legal title search by bank advocates across registry sub-offices",
      "Sanction letter issuance, mortgage deed registration, and fund disbursement"
    ],
    faqs: [
      {
        question: "Can I take a loan against an inherited ancestral property?",
        answer: "Yes, provided the title is clear, partition or succession certificates are validly registered, and all legal heirs give registered consent or join as co-applicants as per the lender's legal counsel."
      },
      {
        question: "Is commercial property accepted for LAP in Hyderabad?",
        answer: "Yes. Approved commercial retail spaces, office units, and warehouse properties in municipal limits can be evaluated."
      }
    ],
    lenderDisclaimer: "Valuation, legal encumbrance check, and loan-to-value percentage are strictly determined by the lending institution's independent valuers and legal counsel."
  },
  {
    id: "vehicle-loans",
    slug: "vehicle-loans",
    title: "Vehicle Loans",
    shortDescription: "Competitive financing for new cars, pre-owned four-wheelers, and commercial vehicles with quick on-road funding.",
    heroHeadline: "Drive Your Ideal Vehicle Home With Guided Auto Loan Assistance",
    fullDescription: "Whether purchasing a brand-new electric vehicle, a premium sedan, or a verified pre-owned car in Hyderabad, auto financing provides quick access to road-ready mobility. We assist car buyers in navigating vehicle loan options, on-road price financing parameters, and seasonal festive interest packages offered through authorized lender networks.",
    indicativeRate: "From 8.00% p.a. (indicative)",
    tenureRange: "1 to 8 Years",
    maxAmount: "Up to 90% - 100% of On-Road Price",
    processingTime: "24 – 48 Hours",
    iconName: "Car",
    keyHighlights: [
      "Financing up to 100% of on-road vehicle cost on select profiles",
      "Flexible tenure up to 8 years for new four-wheelers",
      "Special packages for Electric Vehicles (EVs) and hybrid cars",
      "Doorstep documentation assistance across Hyderabad & Secunderabad"
    ],
    features: [
      "Competitive fixed and floating interest schemes",
      "Support for both brand new showroom purchases and certified used cars",
      "Pre-approved limits for existing premier banking account holders",
      "Simple hypothecation endorsement process on registration certificate (RC)"
    ],
    eligibility: {
      ageRange: "21 to 65 years",
      employmentType: "Salaried employees, Self-Employed individuals, and Agriculturists",
      minIncome: "₹25,000 per month (salaried) / ₹3 Lakhs ITR (self-employed)",
      minCreditScore: "675+",
      residence: "Resident of Hyderabad / Telangana with stable local address"
    },
    requiredDocuments: [
      {
        category: "KYC & Income",
        items: ["Identity and address proof", "Latest 3 months salary slips or 2 years ITR", "6 months primary bank statement"]
      },
      {
        category: "Vehicle Details",
        items: ["Proforma invoice from authorized car dealership", "Valuation report and previous RC copy (for pre-owned cars)"]
      }
    ],
    steps: [
      "Select vehicle model and collect authorized dealership proforma invoice",
      "Verify eligible loan bracket and compare EMI affordability",
      "Submit KYC and banking proof to lender auto-loan cell",
      "Delivery order (DO) issuance directly to the dealership for vehicle delivery"
    ],
    faqs: [
      {
        question: "Can I get a loan for a used car in Hyderabad?",
        answer: "Yes, partner lenders provide loans on pre-owned cars up to 8-10 years of vehicle age, based on an inspection valuation report by empaneled agencies."
      }
    ],
    lenderDisclaimer: "Loan-to-value calculations, ex-showroom vs on-road coverage, and final approval are subject to lender auto-finance credit norms."
  },
  {
    id: "construction-loans",
    slug: "construction-loans",
    title: "Construction Loans",
    shortDescription: "Staged funding for constructing your independent house or residential villa on your existing freehold plot.",
    heroHeadline: "Build on Your Own Land With Stage-Wise Construction Loan Guidance",
    fullDescription: "If you already own an unencumbered residential plot in Hyderabad, Shadnagar, Medchal, or anywhere in Telangana, a construction loan funds the civil work and structural development step-by-step. Unlike generic lump-sum loans, construction finance disburses funds in stages corresponding to engineering milestones (foundation, plinth, slab casting, brickwork, and finishing), ensuring your interest outflow is matched to work completed.",
    indicativeRate: "From 8.00% p.a. (indicative)",
    tenureRange: "Up to 30 Years",
    maxAmount: "Up to ₹5 Crores",
    processingTime: "7 – 10 Working Days",
    iconName: "Hammer",
    badge: "Milestone Based",
    keyHighlights: [
      "Disbursement aligned with actual construction progress stages",
      "Pay pre-EMI interest only on the disbursed quantum during building phase",
      "Option to bundle plot purchase + construction in a single composite loan",
      "Guidance on building estimate verification and architect certificates"
    ],
    features: [
      "Architect estimation alignment with bank chartered engineers",
      "Flexible moratorium period during active civil construction (up to 18-24 months)",
      "Long repayment horizon to safeguard family monthly budgets",
      "Tax exemptions under Section 80C and Section 24 available upon completion certificate"
    ],
    eligibility: {
      ageRange: "21 to 65 years",
      employmentType: "Salaried professionals and self-employed individuals",
      minIncome: "₹35,000 monthly income",
      minCreditScore: "700+",
      residence: "Owner of registered non-agricultural residential plot in Telangana"
    },
    requiredDocuments: [
      {
        category: "Plot Documents",
        items: ["Registered Title Deed of plot", "Encumbrance Certificate (EC) for 30 years", "Latest land revenue tax receipt"]
      },
      {
        category: "Construction Approvals",
        items: ["Approved building plan sanctioned by GHMC/HMDA/Gram Panchayat", "Detailed itemized cost estimate by certified Civil Engineer/Architect"]
      }
    ],
    steps: [
      "Validate title deeds and approved building permission copy",
      "Lender civil engineer inspects plot site and validates construction estimate",
      "Loan sanction and foundation stage initial disbursement",
      "Sequential disbursements upon engineer inspection of completed slabs"
    ],
    faqs: [
      {
        question: "Can I get a construction loan on Gram Panchayat approved layouts?",
        answer: "Lenders strictly evaluate whether the layout has LRS (Layout Regularization Scheme) clearance or falls under HMDA/GHMC limits. Our advisors can pre-check this viability."
      }
    ],
    lenderDisclaimer: "Each disbursement tranche is contingent upon physical verification and satisfaction of construction progress by the lender's technical inspection team."
  },
  {
    id: "home-renovation-loans",
    slug: "home-renovation-loans",
    title: "Home Renovation Loans",
    shortDescription: "Finance modern interior styling, painting, modular kitchen upgrades, and structural repairs at attractive rates.",
    heroHeadline: "Revitalize Your Living Space With Home Improvement Financing",
    fullDescription: "Homes require aesthetic refreshes, structural waterproofing, and contemporary interior upgrades over time. Home Renovation Loans provide cost-effective liquidity to revamp your existing apartment or house in Hyderabad. Benefiting from interest rates far lower than unsecured credit lines, this secured facility lets you enhance your home's comfort, longevity, and capital valuation.",
    indicativeRate: "From 8.00% p.a. (indicative)",
    tenureRange: "Up to 15 Years",
    maxAmount: "Up to ₹50 Lakhs",
    processingTime: "3 – 5 Working Days",
    iconName: "Paintbrush",
    keyHighlights: [
      "Substantially lower interest rates than personal loans or credit cards",
      "Covers civil alterations, modular kitchens, luxury flooring, and electrical overhauls",
      "Minimal disruption: Existing home loan borrowers can access top-up routes",
      "Tenure up to 15 years for comfortable monthly repayments"
    ],
    features: [
      "Can be secured against the existing house or offered as a home loan extension",
      "Simple architect/contractor renovation quotation suffices for approval",
      "Available for self-occupied as well as rented residential premises in Hyderabad",
      "Quick sanction turnarounds for verified existing property titles"
    ],
    eligibility: {
      ageRange: "21 to 65 years",
      employmentType: "Salaried or Self-Employed individuals",
      minIncome: "₹25,000 monthly income",
      minCreditScore: "680+",
      residence: "Owner/Co-owner of property in Telangana being renovated"
    },
    requiredDocuments: [
      {
        category: "Renovation Details",
        items: ["Quotation / Cost estimate from interior designer, architect, or contractor", "Proof of ownership of the property (Sale deed or property tax receipt)"]
      },
      {
        category: "Financials",
        items: ["Last 3 months salary slips or 2 years ITR", "6 months bank statement showing salary or business receipts"]
      }
    ],
    steps: [
      "Obtain an itemized renovation quotation from your contractor",
      "Submit identity, income proofs, and house ownership documents",
      "Fast-track appraisal and verification by lender mortgage cell",
      "Sanction and disbursement directly to your account or contractor"
    ],
    faqs: [
      {
        question: "Can I apply if I currently have an ongoing home loan with another bank?",
        answer: "Yes, you can either opt for a home renovation top-up with your existing lender or transfer your existing loan balance to an authorized partner lender while adding the renovation sum."
      }
    ],
    lenderDisclaimer: "Sanction depends on property valuation, equity cushion, and borrower debt-to-income servicing ratio."
  },
  {
    id: "education-loans",
    slug: "education-loans",
    title: "Education Loans",
    shortDescription: "Funding higher studies in top Indian universities and prestigious international colleges in USA, UK, Canada & Germany.",
    heroHeadline: "Empower Your Academic Ambitions With Global Education Loan Guidance",
    fullDescription: "Higher education opens international careers, and financing should never be an obstacle to your potential. Hyderabad sends thousands of bright engineering and management students annually to premier universities across the USA, UK, Australia, Germany, and India. Our loan connector guidance assists students and co-borrower parents in securing collateralized or non-collateral education financing covering tuition fees, living allowances, travel expenses, and health insurance.",
    indicativeRate: "From 8.00% p.a. (indicative)",
    tenureRange: "Up to 15 Years (post-course moratorium)",
    maxAmount: "Up to ₹1.5 Crores (Overseas) / ₹50 Lakhs (India)",
    processingTime: "5 – 10 Working Days",
    iconName: "GraduationCap",
    badge: "Study Abroad",
    keyHighlights: [
      "Comprehensive funding covering 100% of tuition, accommodation, and flights",
      "Moratorium period: Repayment starts only 6-12 months after course completion",
      "Income tax deduction on total interest paid under Section 80E (no upper limit)",
      "Fast-track sanction letters for visa file submission at consulates"
    ],
    features: [
      "Unsecured education loans available for premier institutions (IIMs, IITs, Tier-1 Global Universities)",
      "Secured loans against residential property or fixed deposits for lower interest rates",
      "Pre-visa disbursement solutions to meet Proof of Funds (POF) requirements",
      "Parent, guardian, or sibling eligible as financial co-applicant"
    ],
    eligibility: {
      ageRange: "18 to 35 years (Student)",
      employmentType: "Student with earning Parent/Spouse/Sibling as financial co-applicant",
      minIncome: "Stable co-applicant income with clean credit record",
      minCreditScore: "680+ for co-borrower",
      residence: "Indian citizen with confirmed admission in recognized domestic or foreign university"
    },
    requiredDocuments: [
      {
        category: "Academic & Admission",
        items: ["University Admission Offer Letter / I-20 / CAS statement", "Detailed breakdown of tuition fees and living expenses", "10th, 12th, Degree marksheets, and GRE/TOEFL/IELTS scorecards"]
      },
      {
        category: "Co-Applicant KYC & Income",
        items: ["Identity and address proof of student and co-borrower", "Last 3 months salary slips / 2 years ITR of co-applicant", "Last 6 months bank statement"]
      }
    ],
    steps: [
      "Review admission offer and total estimated academic budget",
      "Check unsecured vs collateral loan viability based on target university tier",
      "Submit verified academic and co-borrower financial dossier",
      "Issue provisional sanction letter for visa interview and fund release to university"
    ],
    faqs: [
      {
        question: "Is collateral mandatory for overseas master's programs?",
        answer: "Not necessarily. For recognized STEM and management programs in countries like USA, UK, and Canada, select partner lenders offer unsecured education loans up to ₹50-75 Lakhs based on academic merit and co-signer strength."
      }
    ],
    lenderDisclaimer: "Course accreditation, university ranking lists, and loan quantum are evaluated per the lending institution's international education credit policy."
  },
  {
    id: "consumer-loans",
    slug: "consumer-loans",
    title: "Consumer Loans",
    shortDescription: "Quick financing for premium consumer electronics, smart home appliances, computers, and household devices.",
    heroHeadline: "Upgrade Your Lifestyle With Convenient Consumer Financing Guidance",
    fullDescription: "From modern computing setups for hybrid work to high-end home entertainment and smart appliances, consumer loans provide instant purchasing flexibility. We assist customers in discovering zero-downpayment and structured EMI schemes through authorized lender tie-ups, allowing you to split large purchases into manageable monthly installments.",
    indicativeRate: "From 8.00% p.a. (or subvented EMI schemes)",
    tenureRange: "3 to 24 Months",
    maxAmount: "Up to ₹5 Lakhs",
    processingTime: "Instant to 4 Hours",
    iconName: "Tv",
    keyHighlights: [
      "Zero to minimal down payment options on select retail promotions",
      "Flexible tenures from 3 to 24 months to suit your budget",
      "Instant paperless verification with minimal KYC",
      "Simple digital repayment mandate through NACH / e-Mandate"
    ],
    features: [
      "Covers electronics, laptops, home air conditioning, modular appliances, and smart gadgets",
      "Helps first-time borrowers build a positive formal credit track record",
      "Rapid turnaround without complex collateral or income proofs",
      "Direct merchant invoice settlement"
    ],
    eligibility: {
      ageRange: "21 to 60 years",
      employmentType: "Salaried or Self-Employed individuals",
      minIncome: "₹18,000 monthly income",
      minCreditScore: "650+ (or first-time borrowers with verified bank account)",
      residence: "Resident of Hyderabad / Telangana"
    },
    requiredDocuments: [
      {
        category: "Verification",
        items: ["Government ID card (Voter ID / Driving License / Passport)", "Recent address proof", "Bank account debit card / net banking for e-Mandate setup", "Proforma invoice of consumer durable item"]
      }
    ],
    steps: [
      "Select the required appliance/equipment at partner retail outlets or online portals",
      "Provide mobile number and basic identification for instant eligibility check",
      "Set up automatic EMI repayment mandate through your primary bank",
      "Instant checkout clearance and product delivery"
    ],
    faqs: [
      {
        question: "Can a first-time borrower with no credit score apply?",
        answer: "Yes, consumer durable schemes are frequently designed to onboard new-to-credit customers using banking surrogate analytics."
      }
    ],
    lenderDisclaimer: "Special subvention rates and zero-cost EMI offers are subject to merchant-lender promotions active at time of billing."
  },
  {
    id: "balance-transfer",
    slug: "balance-transfer",
    title: "Balance Transfer Loans",
    shortDescription: "Transfer your high-interest existing home, personal, or business loans to reduce EMI and save substantial interest.",
    heroHeadline: "Reduce Your Monthly EMIs With Smart Loan Balance Transfer Assistance",
    fullDescription: "Are you paying inflated interest rates on an older home loan, personal loan, or business facility? A loan balance transfer allows you to shift your outstanding principal balance to a new lender offering lower interest margins, better service terms, and the opportunity to bundle an additional top-up loan. Our advisors analyze your ongoing repayment schedule, calculate realistic net interest savings after switching costs, and coordinate the handover process with partner banks.",
    indicativeRate: "From 8.00% p.a. (Save up to 1.5% - 2.5% on APR)",
    tenureRange: "Matching or extending residual loan tenure",
    maxAmount: "Up to Total Outstanding Principal + Additional Top-Up",
    processingTime: "5 – 10 Working Days",
    iconName: "ArrowLeftRight",
    badge: "High Savings",
    keyHighlights: [
      "Substantial interest savings over the remaining tenure of the loan",
      "Instant eligibility for an additional Top-Up loan at attractive mortgage rates",
      "Option to lengthen or compress repayment tenure to match cash flows",
      "Seamless takeover of original title deeds and foreclosure documentation"
    ],
    features: [
      "Available for Home Loans, Loans Against Property, and high-ticket Personal/Business loans",
      "Zero foreclosure penalties on floating-rate home loans from existing bank per RBI mandate",
      "Direct balance settlement between new and old lending institutions",
      "Guidance to ensure net financial gain exceeds any processing and statutory stamp duties"
    ],
    eligibility: {
      ageRange: "21 to 65 years",
      employmentType: "Salaried or Self-Employed individuals",
      minIncome: "Stable current income meeting revised EMI servicing norms",
      minCreditScore: "700+ with spotless repayment history on existing loan (no bounces in 12 months)",
      residence: "Existing loan serviced with an active bank or NBFC in India"
    },
    requiredDocuments: [
      {
        category: "Existing Loan Records",
        items: ["Foreclosure letter / Outstanding balance statement from existing lender", "List of original property documents (LOD) held by current lender", "Past 12 months loan repayment bank account statement"]
      },
      {
        category: "Current Financials",
        items: ["Updated 3 months salary slips or latest 2 years ITR", "Current KYC and address proofs"]
      }
    ],
    steps: [
      "Perform savings calculation comparing your current interest vs partner lender offers",
      "Obtain foreclosure statement and List of Documents (LOD) from your current bank",
      "Submit application to new lender for sanction and takeover cheque issuance",
      "Old bank closes account and transfers original title deeds to the new lender"
    ],
    faqs: [
      {
        question: "How long does a Home Loan balance transfer take in Hyderabad?",
        answer: "Typically 7 to 12 working days. Once the new lender issues sanction, the existing bank provides the payoff amount and hands over title documents directly to the new institution."
      },
      {
        question: "Can I get extra cash alongside my balance transfer?",
        answer: "Yes, you can request an additional Top-Up loan amount at the time of transfer, which is disbursed at home loan interest rates."
      }
    ],
    lenderDisclaimer: "Net interest benefits are subject to residual tenure, applicable processing charges, and credit underwriting of the receiving lender."
  },
  {
    id: "top-up-loans",
    slug: "top-up-loans",
    title: "Top-Up Loans",
    shortDescription: "Additional high-value funding over and above your existing home or mortgage loan at lower interest rates.",
    heroHeadline: "Access Extra Capital On Your Existing Active Home Loan",
    fullDescription: "If you have been diligently servicing a home loan or loan against property for at least 12-24 months, your property's value has likely appreciated while your outstanding debt has reduced. A Top-Up Loan enables you to borrow additional funds against this created equity without mortgaging a second property. Enjoy interest rates nearly identical to home loans, flexible tenures, and minimal documentation.",
    indicativeRate: "From 8.00% p.a. (indicative)",
    tenureRange: "Up to Residual Home Loan Tenure (or 15-20 years)",
    maxAmount: "Up to ₹1 Crore (subject to property equity)",
    processingTime: "48 – 96 Hours",
    iconName: "TrendingUp",
    keyHighlights: [
      "Interest rates far cheaper than unsecured personal or business loans",
      "Minimal documentation since your property title is already vetted",
      "No restriction on end usage: Use for education, wedding, business, or renovation",
      "Flexible repayment aligned with your ongoing primary loan schedule"
    ],
    features: [
      "Fast-track processing for borrowers with impeccable repayment track record",
      "Longer repayment tenure keeps monthly EMIs exceptionally gentle",
      "Disbursement credited directly to your savings or current account",
      "Tax benefits may apply if deployed for home renovation or residential expansion"
    ],
    eligibility: {
      ageRange: "21 to 65 years",
      employmentType: "Existing home loan / mortgage loan customers",
      minIncome: "Sufficient income surplus to comfortably service both base and top-up EMI",
      minCreditScore: "700+",
      residence: "Borrower with existing active property loan in Telangana"
    },
    requiredDocuments: [
      {
        category: "Existing Loan & Income",
        items: ["Latest 12 months loan repayment bank statement (clean track record)", "Latest 3 months salary slips or latest ITR acknowledgment", "Updated residential address proof (if changed)"]
      }
    ],
    steps: [
      "Review current outstanding balance and calculate available equity cushion",
      "Submit top-up request through authorized lender relationship manager",
      "Expedited underwriting based on past repayment performance",
      "Direct disbursement of the incremental funds into your savings account"
    ],
    faqs: [
      {
        question: "Is property re-valuation required for a top-up loan?",
        answer: "If the requested top-up falls within the originally approved valuation cushion, banks often process it quickly. For higher requests, a desktop valuation or brief site visit may be conducted."
      }
    ],
    lenderDisclaimer: "Top-up sanction is at the sole discretion of the lender, evaluated on ongoing payment discipline and current debt-to-income capability."
  },
  {
    id: "medical-loans",
    slug: "medical-loans",
    title: "Medical Loans",
    shortDescription: "Emergency healthcare financing for surgical procedures, critical care, and uncovered hospital treatments.",
    heroHeadline: "Immediate Financial Relief for Critical Healthcare Needs",
    fullDescription: "Medical crises arrive without warning, and standard health insurance policies often leave substantial gaps for uncovered consumables, specialized elective surgeries, robotic procedures, or out-of-pocket hospital advances. Our emergency medical loan guidance connects families in Hyderabad and Telangana with expedited personal credit avenues and healthcare financing desks to ensure immediate patient care takes priority over financial stress.",
    indicativeRate: "From 8.00% p.a. (indicative)",
    tenureRange: "6 to 48 Months",
    maxAmount: "Up to ₹15 Lakhs",
    processingTime: "Express: 12 – 24 Hours priority routing",
    iconName: "HeartPulse",
    badge: "Urgent Priority",
    keyHighlights: [
      "Express turnaround with prioritized desk review for medical emergencies",
      "Zero collateral required: Based on applicant or family co-signer income",
      "Covers hospital bills, medical implants, chemotherapy, IVF, and rehabilitation",
      "Structured EMIs to shield your emergency family savings"
    ],
    features: [
      "Direct disbursement options to hospital billing accounts or patient representative",
      "Minimal digital documentation to avoid bedside paperwork hassle",
      "Flexible tenures allowing easy repayment post-recovery",
      "Guidance for major hospitals in Hyderabad (Banjara Hills, Somajiguda, Secunderabad, Gachibowli)"
    ],
    eligibility: {
      ageRange: "21 to 60 years (Applicant or earning family member)",
      employmentType: "Salaried or Self-Employed relative of patient",
      minIncome: "₹20,000 monthly household income",
      minCreditScore: "650+",
      residence: "Resident of Hyderabad / Secunderabad / Telangana"
    },
    requiredDocuments: [
      {
        category: "Medical & Financial",
        items: ["Hospital admission estimate or treatment quotation / doctor advice slip", "Applicant KYC (Photo ID & Address proof)", "3 months bank statement showing regular earnings"]
      }
    ],
    steps: [
      "Submit urgent requirement with hospital estimate note",
      "Fast-track verification through emergency lender queue",
      "Digital agreement execution",
      "Priority disbursement directly to bank account"
    ],
    faqs: [
      {
        question: "Can an earning son or daughter apply for parents' medical treatment?",
        answer: "Yes, family members with stable monthly income can apply as primary borrowers to finance their parents', spouse's, or children's medical care."
      }
    ],
    lenderDisclaimer: "Medical loan disbursement speed is subject to immediate verification of applicant credentials and lender operational hours."
  }
];
