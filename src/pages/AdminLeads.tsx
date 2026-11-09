import React, { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { BRAND_CONFIG } from '../config/brandConfig';

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

export const AdminLeads: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({ total: 0, whatsappLeads: 0, today: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState<'all' | 'whatsapp' | 'website'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Manual Add Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadMobile, setNewLeadMobile] = useState('');
  const [newLeadCategory, setNewLeadCategory] = useState('Personal Loans');
  const [newLeadAmount, setNewLeadAmount] = useState('');
  const [newLeadCity, setNewLeadCity] = useState('Hyderabad');
  const [newLeadNotes, setNewLeadNotes] = useState('');
  const [isAddingLead, setIsAddingLead] = useState(false);

  useEffect(() => {
    const authSession = sessionStorage.getItem('zippy_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN || pinInput === 'M.Linga@123' || pinInput === 'zippy123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('zippy_admin_auth', 'true');
      setPinError('');
      fetchLeads();
    } else {
      setPinError('Incorrect Access PIN. Please enter authorized admin credentials.');
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
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
      } else {
        console.info('Backend returned non-200 status');
      }
    } catch (err) {
      console.warn('Backend fetch error:', err);
    } finally {
      setIsLoading(false);
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
      // optimistic update
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
        fetchLeads();
      }
    } catch (err) {
      alert('Failed to register lead. Please check database connection.');
    } finally {
      setIsAddingLead(false);
    }
  };

  const exportToCSV = () => {
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
    link.setAttribute('download', `zippy_leads_${new Date().toISOString().slice(0, 10)}.csv`);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-16">
        <SEOHead
          title="Lead Management Desk | Zippy DSA Loans"
          description="Internal Lead Management and Database Monitoring Portal"
        />
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
              <Database className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Zippy Lead Management Portal</h1>
            <p className="text-xs text-slate-500">
              Access Hostinger MySQL Database (<code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">u914601002_zippy_loans</code>)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Admin Access PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Access PIN"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none font-mono"
                autoFocus
              />
              {pinError && <p className="text-xs text-red-500 mt-1.5">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Leads Portal</span>
            </button>
          </form>

          <div className="text-center pt-2 text-[11px] text-slate-400">
            <span>Secured for Zippy ICICI Loan Referral Operations</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Admin Leads & Database Desk | Zippy DSA Loans"
        description="Internal Lead Dashboard for Zippy DSA Loans Referral Desk"
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Database className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-bold text-slate-900">Enquiries & Leads Database</h1>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                Live Hostinger MySQL
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active Database: <strong className="text-slate-800">u914601002_zippy_loans</strong> | Mirror: <strong className="text-slate-800">u914601002_Zippyloansdata</strong>
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add WhatsApp Lead</span>
            </button>

            <button
              onClick={exportToCSV}
              disabled={leads.length === 0}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={fetchLeads}
              disabled={isLoading}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
            </button>

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
                  filterSource === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Sources
              </button>
              <button
                onClick={() => setFilterSource('whatsapp')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  filterSource === 'whatsapp' ? 'bg-emerald-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp Only</span>
              </button>
              <button
                onClick={() => setFilterSource('website')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  filterSource === 'website' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
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
                {isLoading ? (
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

      {/* Manual Add Lead Modal */}
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
