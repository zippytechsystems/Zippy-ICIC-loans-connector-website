import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  CheckCircle,
  X,
  Send,
  Building2,
  Sparkles,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';

export const JobVacancyWidget: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  // Form states
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [qualification, setQualification] = useState('Graduate (Any Stream)');
  const [experience, setExperience] = useState('Fresher (Ready to Learn)');
  const [location, setLocation] = useState('Hyderabad (Near Nacharam / Uppal / East)');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSubmitted(false);
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || fullName.trim().length < 3) {
      setError('Please enter your full name (minimum 3 characters)');
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile || !/^[6-9]\d{9}$/.test(cleanMobile)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    const generatedAppId = `ZIP-JOB-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAppId(generatedAppId);

    // Construct professional WhatsApp Job Application message
    const waMessage = 
`*Job Application - Zippy DSA Loans Executive*
Company: *Zippy Enterprises Private Limited*
Application ID: *${generatedAppId}*
Position: *Zippy DSA Loans Executive (5 Openings)*
Office: Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana

*Applicant Details:*
• Name: ${fullName.trim()}
• Mobile: +91 ${cleanMobile}
${email.trim() ? `• Email: ${email.trim()}\n` : ''}• Qualification: ${qualification}
• Experience: ${experience}
• Preferred Location: ${location}
${notes.trim() ? `• Additional Info: ${notes.trim()}\n` : ''}
Hello Hiring Team, I am submitting my application for the Zippy DSA Loans Executive vacancy at Zippy Enterprises Private Limited. Please review my profile.`;

    const chatUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

    // Store in localStorage for reference
    try {
      const stored = JSON.parse(localStorage.getItem('zippy_job_applications') || '[]');
      stored.push({
        appId: generatedAppId,
        name: fullName.trim(),
        mobile: cleanMobile,
        role: 'Zippy DSA Loans Executive',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('zippy_job_applications', JSON.stringify(stored));
    } catch {
      // ignore
    }

    // Open WhatsApp
    try {
      window.open(chatUrl, '_blank', 'noopener,noreferrer');
    } catch (popupErr) {
      console.info('Auto popup restricted. Fallback button active.', popupErr);
    }

    setSubmitted(true);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. FLOATING SIDE WIDGET (Docked at Bottom-Left of Screen) */}
      {/* ======================================================== */}
      <aside 
        aria-label="Job Vacancy Notice"
        className="fixed bottom-6 left-4 sm:left-6 z-40 max-w-[320px] sm:max-w-[340px] transition-all duration-300"
      >
        {isMinimized ? (
          // Minimized Pill
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white border border-amber-500/40 shadow-2xl backdrop-blur-md cursor-pointer transition-all hover:scale-105 active:scale-95 group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-accent" />
              <span>Jobs: Only 5 Openings Left!</span>
            </span>
            <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
          </button>
        ) : (
          // Expanded Side Card
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B1E38] to-slate-950 p-4 sm:p-5 border-2 border-amber-500/50 shadow-2xl shadow-black/60 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Top Close / Minimize control */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider border border-amber-400/40 animate-pulse">
                <Sparkles className="w-2.5 h-2.5 text-accent" />
                <span>Urgent Hiring Alert</span>
              </span>

              <button
                onClick={() => setIsMinimized(true)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                title="Minimize hiring alert"
                aria-label="Minimize hiring alert"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Company & Role Headline */}
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-accent uppercase tracking-wider flex items-center gap-1">
                <Building2 className="w-3 h-3 text-accent" />
                <span>Zippy Enterprises Private Limited</span>
              </p>
              <h4 className="text-sm sm:text-base font-black text-white leading-tight">
                Zippy DSA Loans Executive Jobs
              </h4>
              <p className="text-xs text-slate-300 font-medium">
                🔥 <strong className="text-emerald-400">Only 5 Jobs Are Available!</strong>
              </p>
              <p className="text-[11px] text-slate-400 leading-snug">
                Join our Nacharam branch. Attractive incentive + salary for dynamic loan executives.
              </p>
            </div>

            {/* Action Button: Fill Form */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={handleOpenModal}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-accent to-amber-600 hover:from-amber-600 hover:to-accent text-white font-extrabold text-xs shadow-md shadow-amber-500/30 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Fill Form (Apply Now)</span>
              </button>

              <button
                onClick={() => setIsMinimized(true)}
                className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                title="Later"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </aside>


      {/* ======================================================== */}
      {/* 2. INTERACTIVE JOB APPLICATION MODAL                      */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl p-6 sm:p-8 text-white overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              // Success Screen
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-lg">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-1">
                    Application Registered
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Thank You, {fullName}!
                  </h3>
                  <p className="text-xs text-slate-300 mt-2">
                    Your application for <strong className="text-white">Zippy DSA Loans Executive</strong> at <strong className="text-white">Zippy Enterprises Private Limited</strong> has been recorded.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 font-mono text-xs text-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Application Reference:</span>
                  <strong className="text-accent text-sm">{appId}</strong>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Our HR team from our Nacharam office (Sneha Apartments, HMT Nagar) will contact you shortly for the interview schedule.
                </p>

                <div className="pt-2">
                  <button
                    onClick={handleCloseModal}
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              // Job Application Form
              <div className="space-y-5">
                {/* Header */}
                <div className="space-y-1 pr-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider border border-amber-400/40">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span>Hiring • Only 5 Jobs Available</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Apply: Zippy DSA Loans Executive
                  </h3>
                  <p className="text-xs text-accent font-semibold">
                    Zippy Enterprises Private Limited
                  </p>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1 pt-1">
                    <MapPin className="w-3 h-3 text-orange-400" />
                    <span>Office: Sneha Apartments, HMT Nagar, Nacharam, 500076, Hyderabad, Telangana</span>
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>

                  {/* Mobile & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Mobile Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-accent outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-accent outline-none"
                      />
                    </div>
                  </div>

                  {/* Qualification & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Highest Qualification
                      </label>
                      <select
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-accent outline-none"
                      >
                        <option value="Graduate (Any Stream)">Graduate (Any Stream)</option>
                        <option value="Post Graduate (MBA / M.Com / MCA)">Post Graduate (MBA / M.Com / MCA)</option>
                        <option value="Intermediate / Diploma">Intermediate / Diploma</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Loan / Sales Experience
                      </label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-accent outline-none"
                      >
                        <option value="Fresher (Ready to Learn)">Fresher (Ready to Learn)</option>
                        <option value="6 Months - 1 Year (Bank / DSA)">6 Months - 1 Year (Bank / DSA)</option>
                        <option value="1 - 3 Years (DSA Loans Executive)">1 - 3 Years (DSA Loans Executive)</option>
                        <option value="3+ Years Senior Loan Consultant">3+ Years Senior Loan Consultant</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Your Current Location / Area in Hyderabad
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nacharam, Uppal, Habsiguda, Tarnaka, LB Nagar..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Brief Note / Why are you interested? (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us about yourself or your previous work..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-accent outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-accent via-amber-500 to-amber-600 hover:from-amber-600 hover:to-accent text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Application (Fill Form)</span>
                    </button>
                    <p className="text-[10px] text-slate-400 text-center mt-2">
                      Immediate Joining • Attractive Salary + Performance Incentives • 5 Vacancies Only
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
