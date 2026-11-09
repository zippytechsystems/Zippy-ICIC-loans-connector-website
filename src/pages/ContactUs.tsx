import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
  ShieldCheck
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';
import { openWhatsAppWithTracking } from '../services/api';
import { SEOHead } from '../components/common/SEOHead';

export const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Loan Information Request');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 3) {
      errs.name = 'Please enter your name (min 3 characters)';
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile || !/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobile = 'Enter a valid 10-digit Indian mobile number';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Please enter a message (at least 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      <SEOHead
        title="Contact Us | Genuine DSA Loans Office Hyderabad & Telangana"
        description="Visit Zippy DSA Loans at 4-1-19 Sneha Apartments, HMT Nagar, Nacharam, Hyderabad. Connect via phone or WhatsApp for genuine loan referral assistance."
        keywords="Contact Zippy DSA Loans Hyderabad, DSA Office Nacharam, 4-1-19 Sneha Apartments HMT Nagar, Loan Assistance Hyderabad, Loan Enquiry Telangana"
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-fintech-navy to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 inline-block mb-3">
            Customer Support & Consultation
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Contact Our Assistance Desk
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Have questions regarding loan eligibility, documentation, or bank referral procedures? We are here to assist you across Hyderabad and Telangana.
          </p>
        </div>
      </section>

      {/* Contact Channels Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Business & Channel Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Identity Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-fintech-royal block mb-1">
                  Business Entity
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {BRAND_CONFIG.brandName}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {BRAND_CONFIG.legalEntityName}
                </p>
              </div>

              <div className="space-y-4 pt-3 border-t border-slate-100 text-sm">
                
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-fintech-royal flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-xs uppercase tracking-wider">
                      Genuine DSA Office Address
                    </strong>
                    <span className="text-slate-900 text-sm font-bold block">4-1-19, Sneha Apartments, HMT Nagar</span>
                    <span className="text-slate-700 text-sm block">Nacharam, Hyderabad, Telangana - 500076</span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Landmark: Sneha Apartments, HMT Nagar Main Hub, Nacharam
                    </span>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      ✓ Direct Walk-ins Welcome (Mon – Sat: 9:30 AM – 6:30 PM)
                    </span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-fintech-royal flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-xs uppercase tracking-wider">
                      Phone Assistance
                    </strong>
                    <a
                      href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
                      className="text-slate-900 hover:text-fintech-royal font-bold text-sm block"
                    >
                      {BRAND_CONFIG.contact.phoneDisplay}
                    </a>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Direct consultation during business hours
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-xs uppercase tracking-wider">
                      WhatsApp Messaging
                    </strong>
                    <button
                      type="button"
                      onClick={() => openWhatsAppWithTracking({
                        loanCategory: 'General Loan Enquiry',
                        sourceContext: 'Contact Us Page (WhatsApp Card)',
                        city: 'Hyderabad'
                      })}
                      className="text-emerald-700 hover:underline font-bold text-sm block text-left cursor-pointer"
                    >
                      +91 {BRAND_CONFIG.contact.whatsappNumber.slice(2)}
                    </button>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Fast responses for eligibility queries
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-fintech-royal flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-xs uppercase tracking-wider">
                      Official Email
                    </strong>
                    <a
                      href={`mailto:${BRAND_CONFIG.contact.email}`}
                      className="text-slate-900 hover:text-fintech-royal font-medium text-sm block"
                    >
                      {BRAND_CONFIG.contact.email}
                    </a>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      General inquiries & partner communications
                    </span>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold text-xs uppercase tracking-wider">
                      Working Hours
                    </strong>
                    <span className="text-slate-700 text-xs">{BRAND_CONFIG.contact.businessHours}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Coverage Areas Tag Cloud */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                Key Localities Covered in Telangana
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {BRAND_CONFIG.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out. Our customer assistance coordinator will get back to you promptly at your provided mobile number or email address.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-fintech-royal text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-fintech-royal">
                    Online Message Desk
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below and an advisor will respond to your enquiry.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Anand Varma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Mobile & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal"
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.mobile}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject / Loan Interest
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal bg-white"
                  >
                    <option value="Loan Information Request">General Loan Information Request</option>
                    <option value="Home Loan in Hyderabad">Home Loan in Hyderabad</option>
                    <option value="Personal Loan Query">Personal Loan Query</option>
                    <option value="Business Loan / MSME">Business Loan / MSME</option>
                    <option value="Loan Against Property">Loan Against Property</option>
                    <option value="Balance Transfer Enquiry">Balance Transfer & Interest Reduction</option>
                    <option value="Referral Partnership Enquiry">Lender / Channel Collaboration</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message / Query <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we assist you with your loan requirements?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-fintech-royal resize-none"
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-500 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Privacy Guarantee */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    We do not share your contact details with non-affiliated marketing parties. No banking OTPs or passwords will ever be requested.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-fintech-royal to-blue-700 hover:from-blue-700 hover:to-fintech-navy shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </>
  );
};
