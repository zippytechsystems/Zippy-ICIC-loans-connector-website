import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Pages
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { LoanServices } from './pages/LoanServices';
import { IndividualLoanDetails } from './pages/IndividualLoanDetails';
import { CheckEligibility } from './pages/CheckEligibility';
import { ApplyForLoan } from './pages/ApplyForLoan';
import { ContactUs } from './pages/ContactUs';
import { FAQs } from './pages/FAQs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// 404 NotFound Component
const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-20 text-center">
      <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
        <span className="text-4xl font-extrabold text-fintech-royal font-mono">404</span>
        <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested loan page or resource could not be found. Please check the URL or return to our home page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 rounded-xl bg-fintech-royal text-white text-sm font-bold shadow-md hover:bg-blue-700 transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        {/* Navigation */}
        <Navbar />

        {/* Dynamic Route View */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<LoanServices />} />
            <Route path="/services/:loanSlug" element={<IndividualLoanDetails />} />
            <Route path="/eligibility" element={<CheckEligibility />} />
            <Route path="/apply" element={<ApplyForLoan />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Global Floating WhatsApp Contact Trigger */}
        <WhatsAppButton />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
