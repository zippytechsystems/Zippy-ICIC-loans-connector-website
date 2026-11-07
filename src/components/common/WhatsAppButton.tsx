import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { trackWhatsAppLead } from '../../services/api';

const POPULAR_LOANS = [
  'Personal Loans',
  'Home Loans',
  'Business Loans',
  'Loan Against Property',
  'Vehicle Loans',
  'Construction Loans',
  'Home Renovation Loans',
  'Education Loans'
];

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loanCategory, setLoanCategory] = useState('Personal Loans');
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setShowTooltip(false);
    setIsOpen(true);
    setSubmittedRef(null);
    setError('');
  };

  const handleDirectChat = async () => {
    setIsSubmitting(true);
    try {
      const result = await trackWhatsAppLead({
        fullName: fullName.trim() || 'WhatsApp Visitor Lead',
        mobileNumber: mobileNumber.replace(/\D/g, '') || BRAND_CONFIG.contact.whatsappNumber,
        loanCategory,
        sourceContext: 'WhatsApp Floating Button (Direct)'
      });
      setSubmittedRef(result.referenceId);
      window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
      setTimeout(() => setIsOpen(false), 2500);
    } catch {
      // fallback direct link
      window.open(`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}`, '_blank');
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile && !/^[6-9]\d{9}$/.test(cleanMobile)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const result = await trackWhatsAppLead({
        fullName: fullName.trim() || 'WhatsApp Lead',
        mobileNumber: cleanMobile || BRAND_CONFIG.contact.whatsappNumber,
        loanCategory,
        sourceContext: 'WhatsApp Floating Button Form'
      });

      setSubmittedRef(result.referenceId);
      window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
      setTimeout(() => {
        setIsOpen(false);
        setFullName('');
        setMobileNumber('');
      }, 2500);
    } catch {
      window.open(`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}`, '_blank');
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <aside aria-label="Quick WhatsApp Loan Assistance" className="fixed bottom-6 right-6 z-50 flex items-end flex-col fixed-floating-btn">
        {/* Tooltip Card (shown on hover when modal is closed) */}
        {!isOpen && showTooltip && (
          <div className="mb-3 p-3.5 bg-white rounded-2xl shadow-xl border border-slate-200 text-slate-800 text-xs w-64 animate-in fade-in slide-in-from-bottom-2 duration-200 relative">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Instant Loan Consultation</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Connect directly on WhatsApp with our Hyderabad loan referral coordinator for instant eligibility guidance.
            </p>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>Fast response • Mon - Sat</span>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          type="button"
          onClick={handleOpenModal}
          onMouseEnter={() => setShowTooltip(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          aria-label="Chat on WhatsApp with Zippy ICICI Loan Connector"
        >
          {/* Radar ping ring */}
          <span className="absolute -inset-0.5 rounded-full bg-emerald-400 opacity-75 animate-ping group-hover:opacity-0 -z-10"></span>

          {/* SVG WhatsApp glyph */}
          <svg
            className="w-7 h-7 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>

          {/* Unread badge dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-orange-500 border-2 border-white rounded-full"></span>
        </button>
      </aside>

      {/* Interactive WhatsApp Lead Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white relative">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1.5 transition-all"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 bg-white/20 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-white" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" /> WhatsApp Referral Desk
                </span>
              </div>
              <h3 className="text-lg font-bold">Instant Loan Consultation</h3>
              <p className="text-emerald-100 text-xs mt-1">
                Connect directly with our Hyderabad loan coordinator on WhatsApp.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {submittedRef ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="text-base font-bold text-slate-900">Enquiry Saved to Database!</h4>
                  <p className="text-xs text-slate-600">
                    Your reference ID: <strong className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{submittedRef}</strong>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Opening WhatsApp chat now... You can talk directly with the loan manager.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-slate-400 font-normal">(For verification & callback)</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs text-slate-500 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-r-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none font-mono"
                      />
                    </div>
                    {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Loan Type Needed
                    </label>
                    <select
                      value={loanCategory}
                      onChange={(e) => setLoanCategory(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
                    >
                      {POPULAR_LOANS.map((loan) => (
                        <option key={loan} value={loan}>
                          {loan}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Primary CTA: Start WhatsApp Chat */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving & Connecting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Connect on WhatsApp Now</span>
                      </>
                    )}
                  </button>

                  {/* Quick bypass link */}
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={handleDirectChat}
                      disabled={isSubmitting}
                      className="text-[11px] text-slate-500 hover:text-emerald-700 underline transition-colors"
                    >
                      Or skip details & chat immediately on WhatsApp →
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Modal Footer Note */}
            <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>🔒 100% Secure & Confidential</span>
              <span>Official: +91 6302690251</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
