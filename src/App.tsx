import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ReviewsSection } from './components/common/ReviewsSection';

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
import { AdminLeads } from './pages/AdminLeads';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// 404 NotFound Component
const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-20 text-center">
      <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
        <span className="text-4xl font-extrabold text-secondary font-mono">404</span>
        <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested loan page or resource could not be found. Please check the URL or return to our home page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 rounded-xl bg-secondary text-white text-sm font-bold shadow-md hover:bg-blue-700 transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

// Layout Component inside Router to handle location-based features
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPortal = location.pathname.startsWith('/admin') || location.pathname === '/leads';

  return (
    <div className="min-h-screen flex flex-col bg-white text-darkSlate font-sans selection:bg-secondary selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Dynamic Route View */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<LoanServices />} />
          
          {/* Dynamic slug route for all 12 loans */}
          <Route path="/services/:loanSlug" element={<IndividualLoanDetails />} />
          
          {/* Direct named routes for specific requested loan pages */}
          <Route path="/personal-loan" element={<IndividualLoanDetails directSlug="personal-loans" />} />
          <Route path="/home-loan" element={<IndividualLoanDetails directSlug="home-loans" />} />
          <Route path="/business-loan" element={<IndividualLoanDetails directSlug="business-loans" />} />
          <Route path="/loan-against-property" element={<IndividualLoanDetails directSlug="loan-against-property" />} />
          <Route path="/vehicle-loan" element={<IndividualLoanDetails directSlug="vehicle-loans" />} />
          <Route path="/construction-loan" element={<IndividualLoanDetails directSlug="construction-loans" />} />

          {/* Core utility and enquiry pages */}
          <Route path="/eligibility" element={<CheckEligibility />} />
          <Route path="/check-eligibility" element={<CheckEligibility />} />
          <Route path="/apply" element={<ApplyForLoan />} />
          <Route path="/apply-now" element={<ApplyForLoan />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          {/* Admin Lead Management Portal */}
          <Route path="/admin-leads" element={<AdminLeads />} />
          <Route path="/leads" element={<AdminLeads />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Verified Reviews Section: Displayed across website right above Footer */}
      {!isAdminPortal && <ReviewsSection />}

      {/* Global Floating WhatsApp Contact Trigger */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;
