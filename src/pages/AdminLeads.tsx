import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Lock,
  Search,
  RefreshCw,
  Download,
  Phone,
  MessageSquare,
  PlusCircle,
  Database,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  X,
  Briefcase,
  Users,
  GraduationCap,
  MapPin,
  Trash2,
  Eye,
  LogOut,
  Sparkles,
  Building2
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { BRAND_CONFIG } from '../config/brandConfig';
import type { DsaApplication, DsaHiringMetrics } from '../services/api';
import {
  fetchDsaApplications,
  submitDsaApplication,
  updateDsaApplicationStatus,
  deleteDsaApplication
} from '../services/api';

interface Lead {
  id: number;
  reference_id: string;
  full_name: string;
  mobile_number: string;
  email: string | null;
  city: string;
  loan_category: string;
  required_amount: string | number;
  employment_type: string;
  monthly_income: string | number | null;
  additional_info: string | null;
  source_context: string;
  status: string;
  created_at: string;
}

interface Metrics {
  total: number;
  whatsappLeads: number;
  today: number;
}

const DEFAULT_PIN = 'Zippy@2026';

interface AdminLeadsProps {
  defaultTab?: 'dsa_hiring' | 'leads';
}

export const AdminLeads: React.FC<AdminLeadsProps> = ({ defaultTab = 'dsa_hiring' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'dsa_hiring' | 'leads') || defaultTab;

  const [activeTab, setActiveTab] = useState<'dsa_hiring' | 'leads'>(initialTab);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // ==========================================
  // DSA HIRING STATE
  // ==========================================
  const [dsaApplications, setDsaApplications] = useState<DsaApplication[]>([]);
  const [dsaMetrics, setDsaMetrics] = useState<DsaHiringMetrics>({
    total: 0,
    newApplicants: 0,
    shortlisted: 0,
    today: 0,
    experienced: 0
  });
  const [isLoadingDsa, setIsLoadingDsa] = useState(false);
  const [dsaSearchTerm, setDsaSearchTerm] = useState('');
  const [dsaFilterStatus, setDsaFilterStatus] = useState<string>('all');
  const [dsaFilterExperience, setDsaFilterExperience] = useState<string>('all');
  const [selectedApplicant, setSelectedApplicant] = useState<DsaApplication | null>(null);

  // Manual Add DSA Candidate Modal
  const [showAddDsaModal, setShowAddDsaModal] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateMobile, setCandidateMobile] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateQualification, setCandidateQualification] = useState('Graduate (Any Stream)');
  const [candidateExperience, setCandidateExperience] = useState('Fresher (Ready to Learn)');
  const [candidateLocation, setCandidateLocation] = useState('Hyderabad (Near Nacharam / Uppal)');
  const [candidateNotes, setCandidateNotes] = useState('');
  const [isSavingCandidate, setIsSavingCandidate] = useState(false);

  // ==========================================
  // LOAN LEADS STATE
  // ==========================================
  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({ total: 0, whatsappLeads: 0, today: 0 });
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState<'all' | 'whatsapp' | 'website'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Manual Add Lead Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadMobile, setNewLeadMobile] = useState('');
  const [newLeadCategory, setNewLeadCategory] = useState('Personal Loans');
  const [newLeadAmount, setNewLeadAmount] = useState('');
  const [newLeadCity, setNewLeadCity] = useState('Hyderabad');
  const [newLeadNotes, setNewLeadNotes] = useState('');
  const [isAddingLead, setIsAddingLead] = useState(false);

  // Initialize and check authentication
  useEffect(() => {
    const authSession = sessionStorage.getItem('zippy_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const handleTabChange = (tab: 'dsa_hiring' | 'leads') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN || pinInput === 'M.Linga@123' || pinInput === 'zippy123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('zippy_admin_auth', 'true');
      setPinError('');
      loadAllData();
    } else {
      setPinError('Incorrect Access PIN. Please enter authorized admin credentials.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('zippy_admin_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const loadAllData = () => {
    fetchDsaData();
    fetchLeadsData();
  };

  // ==========================================
  // DSA HIRING DATA FETCH & ACTIONS
  // ==========================================
  const fetchDsaData = async () => {
    setIsLoadingDsa(true);
    try {
      const data = await fetchDsaApplications('Zippy@2026');
      setDsaApplications(data.applications);
      setDsaMetrics(data.metrics);
    } catch (err) {
      console.warn('DSA hiring fetch error:', err);
    } finally {
      setIsLoadingDsa(false);
    }
  };

  const handleDsaStatusUpdate = async (appId: string, newStatus: string) => {
    setDsaApplications((prev) =>
      prev.map((app) => (app.application_id === appId ? { ...app, status: newStatus } : app))
    );
    if (selectedApplicant && selectedApplicant.application_id === appId) {
      setSelectedApplicant((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    await updateDsaApplicationStatus(appId, newStatus, 'Zippy@2026');
    fetchDsaData();
  };

  const handleDsaDelete = async (appId: string, candidateName: string) => {
    if (!window.confirm(`Are you sure you want to remove application for "${candidateName}" (${appId})?`)) {
      return;
    }
    setDsaApplications((prev) => prev.filter((a) => a.application_id !== appId));
    if (selectedApplicant && selectedApplicant.application_id === appId) {
      setSelectedApplicant(null);
    }
    await deleteDsaApplication(appId, 'Zippy@2026');
    fetchDsaData();
  };

  const handleManualAddDsaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || candidateName.trim().length < 3) {
      alert('Please enter candidate full name (min 3 chars)');
      return;
    }
    const cleanMobile = candidateMobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSavingCandidate(true);
    try {
      await submitDsaApplication({
        fullName: candidateName.trim(),
        mobileNumber: cleanMobile,
        email: candidateEmail.trim() || undefined,
        qualification: candidateQualification,
        experience: candidateExperience,
        location: candidateLocation,
        notes: candidateNotes.trim() ? `[Admin Entry] ${candidateNotes.trim()}` : '[Manual Admin Entry]',
        role: 'Zippy DSA Loans Executive'
      });
      setShowAddDsaModal(false);
      setCandidateName('');
      setCandidateMobile('');
      setCandidateEmail('');
      setCandidateNotes('');
      await fetchDsaData();
    } catch {
      alert('Failed to register DSA applicant. Please try again.');
    } finally {
      setIsSavingCandidate(false);
    }
  };

  const exportDsaToCSV = () => {
    if (dsaApplications.length === 0) return;
    const headers = [
      'Application ID',
      'Candidate Name',
      'Mobile Number',
      'Email',
      'Qualification',
      'Loan Experience',
      'Location',
      'Position',
      'Status',
      'Notes',
      'Applied Date & Time'
    ];

    const rows = dsaApplications.map((a) => [
      `"${a.application_id}"`,
      `"${a.full_name}"`,
      `"${a.mobile_number}"`,
      `"${a.email || ''}"`,
      `"${a.qualification}"`,
      `"${a.experience}"`,
      `"${a.location}"`,
      `"${a.role}"`,
      `"${a.status}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
      `"${a.created_at}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zippy_dsa_hiring_applicants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDsaApplications = dsaApplications.filter((app) => {
    if (dsaFilterStatus !== 'all' && app.status !== dsaFilterStatus) return false;
    if (dsaFilterExperience === 'fresher' && !app.experience?.toLowerCase().includes('fresher')) return false;
    if (dsaFilterExperience === 'experienced' && app.experience?.toLowerCase().includes('fresher')) return false;

    if (dsaSearchTerm) {
      const q = dsaSearchTerm.toLowerCase();
      return (
        app.application_id?.toLowerCase().includes(q) ||
        app.full_name?.toLowerCase().includes(q) ||
        app.mobile_number?.includes(q) ||
        app.email?.toLowerCase().includes(q) ||
        app.location?.toLowerCase().includes(q) ||
        app.qualification?.toLowerCase().includes(q) ||
        app.experience?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // ==========================================
  // LOAN LEADS DATA FETCH & ACTIONS
  // ==========================================
  const fetchLeadsData = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/enquiry.php?action=leads&key=Zippy@2026');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.enquiries)) {
          setLeads(data.enquiries);
          if (data.metrics) {
            setMetrics(data.metrics);
          }
        }
      }
    } catch (err) {
      console.warn('Backend fetch error:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleStatusUpdate = async (refId: string, newStatus: string) => {
    try {
      await fetch('/api/enquiry.php?action=update_status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referenceId: refId, status: newStatus, key: 'Zippy@2026' })
      });
      setLeads((prev) =>
        prev.map((l) => (l.reference_id === refId ? { ...l, status: newStatus } : l))
      );
    } catch {
      setLeads((prev) =>
        prev.map((l) => (l.reference_id === refId ? { ...l, status: newStatus } : l))
      );
    }
  };

  const handleManualAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadMobile.trim() || newLeadMobile.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setIsAddingLead(true);
    try {
      const res = await fetch('/api/whatsapp_lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newLeadName.trim() || 'WhatsApp Lead',
          mobileNumber: newLeadMobile.replace(/\D/g, ''),
          loanCategory: newLeadCategory,
          requiredAmount: Number(newLeadAmount) || 0,
          city: newLeadCity,
          additionalInfo: newLeadNotes,
          sourceContext: 'Manual WhatsApp Entry'
        })
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewLeadName('');
        setNewLeadMobile('');
        setNewLeadAmount('');
        setNewLeadNotes('');
        fetchLeadsData();
      }
    } catch {
      alert('Failed to register lead. Please check database connection.');
    } finally {
      setIsAddingLead(false);
    }
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return;
    const headers = [
      'Reference ID',
      'Full Name',
      'Mobile Number',
      'Email',
      'City',
      'Loan Category',
      'Required Amount (INR)',
      'Employment Type',
      'Source Context',
      'Status',
      'Date & Time'
    ];

    const rows = leads.map((l) => [
      `"${l.reference_id}"`,
      `"${l.full_name}"`,
      `"${l.mobile_number}"`,
      `"${l.email || ''}"`,
      `"${l.city}"`,
      `"${l.loan_category}"`,
      `"${l.required_amount}"`,
      `"${l.employment_type}"`,
      `"${l.source_context}"`,
      `"${l.status}"`,
      `"${l.created_at}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zippy_loan_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const isWa = lead.source_context?.toLowerCase().includes('whatsapp');
    if (filterSource === 'whatsapp' && !isWa) return false;
    if (filterSource === 'website' && isWa) return false;
    if (filterStatus !== 'all' && lead.status !== filterStatus) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        lead.reference_id?.toLowerCase().includes(q) ||
        lead.full_name?.toLowerCase().includes(q) ||
        lead.mobile_number?.includes(q) ||
        lead.loan_category?.toLowerCase().includes(q) ||
        lead.city?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // ==========================================
  // LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4 py-16">
        <SEOHead
          title="Admin Dashboard & Hiring Portal | Zippy DSA Loans"
          description="Internal Management Desk for DSA Hiring and Loan Enquiries"
        />
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
              <Briefcase className="w-7 h-7 text-accent" />
            </div>
            <h1 className="text-xl font-black text-slate-900">Zippy Admin Dashboard</h1>
            <p className="text-xs text-slate-500">
              DSA Hiring Management & Customer Leads Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Access PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Access PIN"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none font-mono"
                autoFocus
              />
              {pinError && <p className="text-xs text-red-500 mt-1.5 font-medium">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div className="text-center pt-2 text-[11px] text-slate-400">
            <span>Zippy Enterprises Private Limited • Nacharam Hub</span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED DASHBOARD VIEW
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Admin Dashboard - DSA Hiring & Leads | Zippy DSA Loans"
        description="Internal Admin Control Center for DSA Executive Hiring and Loan Applications"
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header & Tab Navigation */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-500/10 text-accent rounded-2xl border border-amber-500/20">
                <Building2 className="w-6 h-6 text-accent" />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Zippy Admin Dashboard
                  </h1>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider rounded-full">
                    Live System Active
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Zippy Enterprises Private Limited • Sneha Apartments, HMT Nagar, Nacharam
                </p>
              </div>
            </div>

            {/* Quick Global Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {activeTab === 'dsa_hiring' ? (
                <>
                  <button
                    onClick={() => setShowAddDsaModal(true)}
                    className="px-3.5 py-2 bg-gradient-to-r from-accent to-amber-600 hover:from-amber-600 hover:to-accent text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ Add DSA Candidate</span>
                  </button>
                  <button
                    onClick={exportDsaToCSV}
                    disabled={dsaApplications.length === 0}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Applicants CSV</span>
                  </button>
                  <button
                    onClick={fetchDsaData}
                    disabled={isLoadingDsa}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                    title="Refresh DSA Applications"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingDsa ? 'animate-spin text-accent' : ''}`} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ Add WhatsApp Lead</span>
                  </button>
                  <button
                    onClick={exportLeadsToCSV}
                    disabled={leads.length === 0}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Leads CSV</span>
                  </button>
                  <button
                    onClick={fetchLeadsData}
                    disabled={isLoadingLeads}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                    title="Refresh leads database"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingLeads ? 'animate-spin text-emerald-600' : ''}`} />
                  </button>
                </>
              )}

              <button
                onClick={handleLogout}
                className="p-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl transition-colors cursor-pointer"
                title="Lock / Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab Navigation Buttons */}
          <div className="flex items-center gap-2 border-t border-slate-100 pt-4 overflow-x-auto">
            <button
              onClick={() => handleTabChange('dsa_hiring')}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'dsa_hiring'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Briefcase className={`w-4 h-4 ${activeTab === 'dsa_hiring' ? 'text-accent' : 'text-slate-500'}`} />
              <span>DSA Hiring (Job Applications)</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'dsa_hiring'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {dsaApplications.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('leads')}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'leads'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Database className={`w-4 h-4 ${activeTab === 'leads' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Loan Enquiries & Leads</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'leads'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {leads.length}
              </span>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* TAB 1: DSA HIRING DASHBOARD                                            */}
        {/* ===================================================================== */}
        {activeTab === 'dsa_hiring' && (
          <div className="space-y-6">
            {/* Hiring Notice Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-accent flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span>Active Recruitment Drive: Zippy DSA Loans Executive</span>
                    <span className="px-2 py-0.2 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">5 Openings</span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    All candidates who apply via the website job vacancy widget or manual walk-in are listed below in real-time.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-[11px] text-slate-500">Office: Nacharam Hub</span>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Applicants</span>
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Users className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{dsaMetrics.total}</span>
                  <span className="text-[11px] text-slate-400">Total job applications</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">New (Pending Review)</span>
                  <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                    <Clock className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-600">{dsaMetrics.newApplicants}</span>
                  <span className="text-[11px] text-amber-700 font-medium">Awaiting HR call</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Shortlisted / Interviewing</span>
                  <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-purple-600">{dsaMetrics.shortlisted}</span>
                  <span className="text-[11px] text-purple-700 font-medium">Selected for interview</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Experienced Candidates</span>
                  <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Briefcase className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-600">{dsaMetrics.experienced}</span>
                  <span className="text-[11px] text-emerald-700 font-medium">DSA / Bank loan experience</span>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={dsaSearchTerm}
                  onChange={(e) => setDsaSearchTerm(e.target.value)}
                  placeholder="Search by candidate name, phone, App ID, location..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => setDsaFilterExperience('all')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      dsaFilterExperience === 'all'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Candidates
                  </button>
                  <button
                    onClick={() => setDsaFilterExperience('experienced')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      dsaFilterExperience === 'experienced'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Experienced Only
                  </button>
                  <button
                    onClick={() => setDsaFilterExperience('fresher')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      dsaFilterExperience === 'fresher'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Freshers
                  </button>
                </div>

                <select
                  value={dsaFilterStatus}
                  onChange={(e) => setDsaFilterStatus(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 outline-none cursor-pointer"
                >
                  <option value="all">All Application Statuses</option>
                  <option value="NEW">NEW (Pending)</option>
                  <option value="REVIEWING">REVIEWING</option>
                  <option value="SHORTLISTED">SHORTLISTED</option>
                  <option value="INTERVIEW_SCHEDULED">INTERVIEW SCHEDULED</option>
                  <option value="HIRED">HIRED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">App ID</th>
                      <th className="py-3 px-4">Candidate Details</th>
                      <th className="py-3 px-4">Experience & Degree</th>
                      <th className="py-3 px-4">Preferred Location</th>
                      <th className="py-3 px-4">Hiring Status</th>
                      <th className="py-3 px-4">Applied Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {isLoadingDsa ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-500">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-accent mb-2" />
                          Loading DSA Hiring applications...
                        </td>
                      </tr>
                    ) : filteredDsaApplications.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-500">
                          <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="font-semibold text-slate-700">No DSA Job Applications Found</p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            When applicants fill the job application form on the website, their details will appear here immediately.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredDsaApplications.map((app) => {
                        const cleanPhone = app.mobile_number.replace(/\D/g, '');
                        const candidateWaUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                          `Hello ${app.full_name}, thank you for applying for the Zippy DSA Loans Executive vacancy (Ref: ${app.application_id}) at Zippy Enterprises Private Limited, Nacharam. We reviewed your profile and would like to invite you for an interview. Are you available for a discussion?`
                        )}`;

                        return (
                          <tr key={app.application_id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                              <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px]">
                                {app.application_id}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{app.full_name}</span>
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                                <span>+91 {app.mobile_number}</span>
                                {app.email && (
                                  <>
                                    <span className="text-slate-300">•</span>
                                    <span className="truncate max-w-[140px]" title={app.email}>{app.email}</span>
                                  </>
                                )}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-800 flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${app.experience?.toLowerCase().includes('fresher') ? 'bg-amber-400' : 'bg-emerald-500'}`}></span>
                                <span>{app.experience}</span>
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {app.qualification}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="text-slate-700 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate max-w-[150px]" title={app.location}>{app.location}</span>
                              </div>
                              {app.notes && (
                                <div className="text-[10px] text-slate-400 italic truncate max-w-[150px] mt-0.5" title={app.notes}>
                                  "{app.notes}"
                                </div>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <select
                                value={app.status || 'NEW'}
                                onChange={(e) => handleDsaStatusUpdate(app.application_id, e.target.value)}
                                className={`px-2 py-1 text-[11px] font-bold rounded-lg border outline-none cursor-pointer ${
                                  app.status === 'NEW'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : app.status === 'REVIEWING'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : app.status === 'SHORTLISTED'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : app.status === 'INTERVIEW_SCHEDULED'
                                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                    : app.status === 'HIRED'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}
                              >
                                <option value="NEW">NEW (Pending)</option>
                                <option value="REVIEWING">REVIEWING</option>
                                <option value="SHORTLISTED">SHORTLISTED</option>
                                <option value="INTERVIEW_SCHEDULED">INTERVIEW SCHEDULED</option>
                                <option value="HIRED">HIRED</option>
                                <option value="REJECTED">REJECTED</option>
                              </select>
                            </td>

                            <td className="py-3.5 px-4 text-[11px] text-slate-500 whitespace-nowrap">
                              {new Date(app.created_at).toLocaleString('en-IN', {
                                dateStyle: 'short',
                                timeStyle: 'short'
                              })}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedApplicant(app)}
                                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all"
                                  title="View Full Application Profile"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {cleanPhone && (
                                  <a
                                    href={candidateWaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg transition-all"
                                    title="WhatsApp candidate with interview invite"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </a>
                                )}

                                {cleanPhone && (
                                  <a
                                    href={`tel:+91${cleanPhone}`}
                                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
                                    title="Call candidate"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                )}

                                <button
                                  onClick={() => handleDsaDelete(app.application_id, app.full_name)}
                                  className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-lg transition-all"
                                  title="Delete application"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 2: LOAN LEADS & DATABASE                                          */}
        {/* ===================================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Database Notice Header */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Database className="w-5 h-5" />
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">Enquiries & Leads Database</h2>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                    Live Hostinger MySQL
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Active Database: <strong className="text-slate-800">u914601002_zippy_loans</strong> | Mirror:{' '}
                  <strong className="text-slate-800">u914601002_Zippyloansdata</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://mintcream-coyote-409919.hostingersite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>phpMyAdmin</span>
                </a>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enquiries</span>
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Database className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{metrics.total || leads.length}</span>
                  <span className="text-[11px] text-slate-400">in MySQL database</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">WhatsApp Leads</span>
                  <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-600">
                    {metrics.whatsappLeads || leads.filter((l) => l.source_context?.toLowerCase().includes('whatsapp')).length}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">WhatsApp direct clicks</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Website Form Leads</span>
                  <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-purple-600">
                    {leads.filter((l) => !l.source_context?.toLowerCase().includes('whatsapp')).length}
                  </span>
                  <span className="text-[11px] text-slate-400">Full applications</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Leads</span>
                  <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                    <Clock className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-600">{metrics.today || 0}</span>
                  <span className="text-[11px] text-amber-700 font-medium">New today</span>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by Ref ID, name, mobile, city..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => setFilterSource('all')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      filterSource === 'all'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Sources
                  </button>
                  <button
                    onClick={() => setFilterSource('whatsapp')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                      filterSource === 'whatsapp'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp Only</span>
                  </button>
                  <button
                    onClick={() => setFilterSource('website')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      filterSource === 'website'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Website Form
                  </button>
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="DISBURSED">DISBURSED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Ref ID</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Loan Requirement</th>
                      <th className="py-3 px-4">Lead Source</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date / Time</th>
                      <th className="py-3 px-4 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {isLoadingLeads ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-500">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600 mb-2" />
                          Loading enquiries from Hostinger MySQL database...
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-500">
                          <Database className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="font-semibold text-slate-700">No loan enquiries found matching your filter</p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Any new enquiries from WhatsApp or the website will appear here automatically.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const isWa = lead.source_context?.toLowerCase().includes('whatsapp');
                        const cleanPhone = lead.mobile_number.replace(/\D/g, '');
                        const customerWaUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                          `Hello ${lead.full_name}, thank you for contacting Zippy DSA Loans regarding ${lead.loan_category} (Ref: ${lead.reference_id}). How can we assist you today?`
                        )}`;

                        return (
                          <tr key={lead.reference_id || lead.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                              <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                                {lead.reference_id}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-900">{lead.full_name}</div>
                              <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                                <span>+91 {lead.mobile_number}</span>
                                <span className="text-slate-300">•</span>
                                <span>{lead.city}</span>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-medium text-slate-800">{lead.loan_category}</div>
                              <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                                {Number(lead.required_amount) > 0
                                  ? `₹${Number(lead.required_amount).toLocaleString('en-IN')}`
                                  : 'Amount on discussion'}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              {isWa ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200">
                                  <MessageSquare className="w-2.5 h-2.5" />
                                  <span>WhatsApp</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-[10px] border border-blue-200">
                                  <FileText className="w-2.5 h-2.5" />
                                  <span>Website Form</span>
                                </span>
                              )}
                              <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[120px]" title={lead.source_context}>
                                {lead.source_context}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <select
                                value={lead.status || 'NEW'}
                                onChange={(e) => handleStatusUpdate(lead.reference_id, e.target.value)}
                                className={`px-2 py-1 text-[11px] font-bold rounded-lg border outline-none cursor-pointer ${
                                  lead.status === 'NEW'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : lead.status === 'CONTACTED'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : lead.status === 'IN_PROGRESS'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : lead.status === 'DISBURSED'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                              >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="DISBURSED">DISBURSED</option>
                                <option value="REJECTED">REJECTED</option>
                              </select>
                            </td>

                            <td className="py-3.5 px-4 text-[11px] text-slate-500 whitespace-nowrap">
                              {new Date(lead.created_at).toLocaleString('en-IN', {
                                dateStyle: 'short',
                                timeStyle: 'short'
                              })}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {cleanPhone && cleanPhone !== BRAND_CONFIG.contact.whatsappNumber && (
                                  <a
                                    href={customerWaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg transition-all"
                                    title="Chat with customer on WhatsApp"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                {cleanPhone && cleanPhone !== BRAND_CONFIG.contact.whatsappNumber && (
                                  <a
                                    href={`tel:+91${cleanPhone}`}
                                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
                                    title="Call customer"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Database Sync Notice */}
            <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between text-xs text-emerald-900 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Dual Database Synchronization Active:</strong> All WhatsApp and website leads are stored in{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded font-mono text-emerald-800">u914601002_zippy_loans</code> and mirrored to{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded font-mono text-emerald-800">u914601002_Zippyloansdata</code>.
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold">
                Server: srv1555.hstgr.io (Port 3306)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* MODAL 1: VIEW APPLICANT FULL PROFILE MODAL                            */}
      {/* ===================================================================== */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-slate-900 via-[#0B1E38] to-slate-900 p-6 text-white flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/30">
                  DSA Candidate Profile
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  {selectedApplicant.full_name}
                </h3>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Ref: {selectedApplicant.application_id}
                </p>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Role & Status Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Target Position</span>
                  <div className="font-bold text-sm text-slate-900">{selectedApplicant.role}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Status</span>
                  <select
                    value={selectedApplicant.status}
                    onChange={(e) => handleDsaStatusUpdate(selectedApplicant.application_id, e.target.value)}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="NEW">NEW</option>
                    <option value="REVIEWING">REVIEWING</option>
                    <option value="SHORTLISTED">SHORTLISTED</option>
                    <option value="INTERVIEW_SCHEDULED">INTERVIEW SCHEDULED</option>
                    <option value="HIRED">HIRED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Contact Information</h4>
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Mobile (WhatsApp):</span>
                    <strong className="text-slate-900 font-mono text-xs">+91 {selectedApplicant.mobile_number}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Email:</span>
                    <strong className="text-slate-900 text-xs">{selectedApplicant.email || 'Not provided'}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-[10px] block">Current Hyderabad Location:</span>
                    <strong className="text-slate-900 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{selectedApplicant.location}</span>
                    </strong>
                  </div>
                </div>
              </div>

              {/* Professional Profile */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Candidate Background</h4>
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Highest Qualification:</span>
                    <strong className="text-slate-900 text-xs flex items-center gap-1 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-accent" />
                      <span>{selectedApplicant.qualification}</span>
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Loan / Sales Experience:</span>
                    <strong className="text-slate-900 text-xs flex items-center gap-1 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{selectedApplicant.experience}</span>
                    </strong>
                  </div>
                </div>
              </div>

              {/* Candidate Notes */}
              {selectedApplicant.notes && (
                <div className="space-y-1">
                  <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Candidate Notes / Message</h4>
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-slate-800 leading-relaxed">
                    {selectedApplicant.notes}
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>Applied On: {new Date(selectedApplicant.created_at).toLocaleString('en-IN')}</span>
                <span>Branch: Nacharam, Hyderabad</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`https://wa.me/91${selectedApplicant.mobile_number.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedApplicant.full_name}, thank you for applying for the Zippy DSA Loans Executive vacancy (Ref: ${selectedApplicant.application_id}) at Zippy Enterprises Private Limited, Nacharam. We reviewed your profile and would like to invite you for an interview. Are you available for a discussion?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Invite on WhatsApp</span>
                </a>

                <a
                  href={`tel:+91${selectedApplicant.mobile_number.replace(/\D/g, '')}`}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Candidate</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: MANUAL ADD DSA CANDIDATE                                      */}
      {/* ===================================================================== */}
      {showAddDsaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 via-[#0B1E38] to-slate-900 p-5 text-white flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase">
                  Recruitment Desk
                </span>
                <h3 className="font-bold text-base mt-1">Add Candidate to DSA Hiring</h3>
                <p className="text-xs text-slate-400">Register walk-in, call, or referral candidate</p>
              </div>
              <button
                onClick={() => setShowAddDsaModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddDsaSubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Candidate Full Name *</label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Anand Sharma"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">10-Digit Mobile *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={candidateMobile}
                    onChange={(e) => setCandidateMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="candidate@gmail.com"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Highest Qualification</label>
                  <select
                    value={candidateQualification}
                    onChange={(e) => setCandidateQualification(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white"
                  >
                    <option value="Graduate (Any Stream)">Graduate (Any Stream)</option>
                    <option value="Post Graduate (MBA / M.Com / MCA)">Post Graduate (MBA / M.Com)</option>
                    <option value="Intermediate / Diploma">Intermediate / Diploma</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Loan Experience</label>
                  <select
                    value={candidateExperience}
                    onChange={(e) => setCandidateExperience(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent bg-white"
                  >
                    <option value="Fresher (Ready to Learn)">Fresher (Ready to Learn)</option>
                    <option value="6 Months - 1 Year (Bank / DSA)">6 Months - 1 Year</option>
                    <option value="1 - 3 Years (DSA Loans Executive)">1 - 3 Years (DSA Loans)</option>
                    <option value="3+ Years Senior Loan Consultant">3+ Years Senior</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Candidate Location / Area</label>
                <input
                  type="text"
                  value={candidateLocation}
                  onChange={(e) => setCandidateLocation(e.target.value)}
                  placeholder="e.g. Nacharam, Uppal, Habsiguda, Tarnaka..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Remarks / Interview Notes</label>
                <textarea
                  rows={2}
                  value={candidateNotes}
                  onChange={(e) => setCandidateNotes(e.target.value)}
                  placeholder="Attended walk-in at Nacharam branch, interested in personal loan desk..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSavingCandidate}
                className="w-full py-2.5 bg-gradient-to-r from-accent to-amber-600 hover:from-amber-600 hover:to-accent text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSavingCandidate ? 'Saving Candidate...' : 'Add Candidate to DSA Hiring Desk'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: MANUAL ADD WHATSAPP LOAN LEAD                                 */}
      {/* ===================================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Add New WhatsApp Enquiry</h3>
                <p className="text-xs text-slate-400 mt-0.5">Quickly register enquiry into Hostinger MySQL database</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Anand Sharma"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">10-Digit Mobile Number *</label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={newLeadMobile}
                  onChange={(e) => setNewLeadMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Loan Category</label>
                  <select
                    value={newLeadCategory}
                    onChange={(e) => setNewLeadCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Personal Loans">Personal Loans</option>
                    <option value="Home Loans">Home Loans</option>
                    <option value="Business Loans">Business Loans</option>
                    <option value="Loan Against Property">Loan Against Property</option>
                    <option value="Vehicle Loans">Vehicle Loans</option>
                    <option value="Construction Loans">Construction Loans</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={newLeadAmount}
                    onChange={(e) => setNewLeadAmount(e.target.value)}
                    placeholder="e.g. 500000"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={newLeadCity}
                  onChange={(e) => setNewLeadCity(e.target.value)}
                  placeholder="Hyderabad"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Loan Requirement</label>
                <textarea
                  rows={2}
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  placeholder="Customer contacted on WhatsApp requesting home loan options..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isAddingLead}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isAddingLead ? 'Saving to Database...' : 'Save Enquiry in Database'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
