import React, { useState, useMemo, useEffect } from 'react';
import { config } from '../config';
import {
  deleteRsvp,
  resetDemoData,
  isFirebaseReady,
  saveRsvp,
  subscribeToRsvps,
} from '../services/db';
import {
  signInAdmin,
  signOutAdmin,
  subscribeToAuth,
  getCurrentUser,
} from '../services/auth';
import {
  Lock,
  Download,
  Search,
  Filter,
  Trash2,
  Users,
  Shirt,
  Calendar,
  Crown,
  Zap,
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  Database,
  Edit2,
  UserPlus,
  X,
  Save,
  Loader2,
  Mail,
  KeyRound,
  AlertCircle,
  LogOut,
  Shield,
  Sparkles,
} from 'lucide-react';

export default function AdminView({ rsvps: propRsvps = [], onBackToHome }) {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [authChecking, setAuthChecking] = useState(isFirebaseReady);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Real-time Firestore RSVPs for authenticated admin
  const [adminRsvps, setAdminRsvps] = useState([]);
  const [syncError, setSyncError] = useState(null);

  // Subscribe to Firebase Auth state
  useEffect(() => {
    if (!isFirebaseReady) {
      setAuthChecking(false);
      return;
    }

    const unsubAuth = subscribeToAuth((user) => {
      setCurrentUser(user);
      setAuthChecking(false);
      if (!user) {
        setAdminRsvps([]);
      }
    });

    return () => {
      if (unsubAuth) unsubAuth();
    };
  }, []);

  // Real-time subscription to Firestore RSVPs when authenticated
  useEffect(() => {
    // In Firebase mode, only listen if authenticated
    if (isFirebaseReady && !currentUser) {
      setAdminRsvps([]);
      return;
    }

    const unsubscribe = subscribeToRsvps(
      (list) => {
        setAdminRsvps(list || []);
        setSyncError(null);
      },
      (err) => {
        console.error('AdminView Firestore subscription error:', err);
        setSyncError(err.message || 'Failed to sync with Cloud Firestore.');
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [currentUser]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [jerseyFilter, setJerseyFilter] = useState('all');

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const result = await signInAdmin(email, password);
      if (!result.success) {
        setLoginError(result.error || 'Failed to authenticate.');
      } else {
        setEmail('');
        setPassword('');
        setLoginError('');
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setLoginError(err.message || 'An unexpected error occurred during sign in.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOutAdmin();
      setCurrentUser(null);
      setAdminRsvps([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Edit / Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRsvp, setEditingRsvp] = useState(null);
  const [modalForm, setModalForm] = useState({
    name: '',
    team: 'bride',
    preferredDate: config.dates[0]?.id || '2027-01-28',
    needsJersey: true,
    jerseySize: 'M',
  });
  const [modalSaving, setModalSaving] = useState(false);
  const [modalError, setModalError] = useState('');

  const handleOpenAdd = () => {
    setEditingRsvp(null);
    setModalError('');
    setModalForm({
      name: '',
      team: 'bride',
      preferredDate: config.dates[0]?.id || '2027-01-28',
      needsJersey: true,
      jerseySize: 'M',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rsvp) => {
    setEditingRsvp(rsvp);
    setModalError('');
    setModalForm({
      name: rsvp.name || '',
      team: rsvp.team || 'bride',
      preferredDate: rsvp.preferredDate || config.dates[0]?.id || '2027-01-28',
      needsJersey: Boolean(rsvp.needsJersey),
      jerseySize: rsvp.jerseySize && rsvp.jerseySize !== 'None' ? rsvp.jerseySize : 'M',
    });
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    if (!modalForm.name.trim()) {
      setModalError('Please enter the guest full name.');
      return;
    }

    setModalSaving(true);
    setModalError('');

    try {
      const payload = {
        ...modalForm,
        name: modalForm.name.trim(),
        id: editingRsvp?.id,
      };

      const result = await saveRsvp(payload);
      if (result.success) {
        setIsModalOpen(false);
        setEditingRsvp(null);
      } else {
        setModalError(result.error || 'Failed to save changes to Firestore.');
      }
    } catch (err) {
      console.error('Error saving RSVP in admin:', err);
      setModalError(err.message || 'An error occurred while saving.');
    } finally {
      setModalSaving(false);
    }
  };

  const handleDelete = async (docId, name) => {
    if (window.confirm(`Are you sure you want to remove RSVP for "${name}" from Cloud Firestore?`)) {
      const result = await deleteRsvp(docId);
      if (!result.success) {
        alert(result.error || 'Failed to delete RSVP from cloud database.');
      }
    }
  };

  // Determine effective RSVPs list
  // When Firebase is active, use adminRsvps (real-time authenticated Firestore)
  // When in offline fallback mode, fallback to propRsvps / local store
  const effectiveRsvps = isFirebaseReady ? adminRsvps : (adminRsvps.length ? adminRsvps : propRsvps);

  // Summary Metrics calculations
  const totalGuests = effectiveRsvps.length;
  const brideCount = effectiveRsvps.filter((r) => r.team === 'bride').length;
  const groomCount = effectiveRsvps.filter((r) => r.team === 'groom').length;

  const dateCounts = useMemo(() => {
    const counts = {};
    config.dates.forEach((d) => {
      counts[d.id] = effectiveRsvps.filter((r) => r.preferredDate === d.id).length;
    });
    return counts;
  }, [effectiveRsvps]);

  const jerseyStats = useMemo(() => {
    const sizeMap = {
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
      '3XL': 0,
    };
    let totalJerseysNeeded = 0;
    let noJerseyCount = 0;

    effectiveRsvps.forEach((r) => {
      if (r.needsJersey && r.jerseySize && r.jerseySize !== 'None') {
        totalJerseysNeeded++;
        if (sizeMap[r.jerseySize] !== undefined) {
          sizeMap[r.jerseySize]++;
        } else {
          sizeMap[r.jerseySize] = (sizeMap[r.jerseySize] || 0) + 1;
        }
      } else {
        noJerseyCount++;
      }
    });

    return { sizeMap, totalJerseysNeeded, noJerseyCount };
  }, [effectiveRsvps]);

  // Filtered RSVPs
  const filteredRsvps = useMemo(() => {
    return effectiveRsvps.filter((r) => {
      const matchesSearch = r.name?.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesTeam = teamFilter === 'all' || r.team === teamFilter;
      const matchesDate = dateFilter === 'all' || r.preferredDate === dateFilter;
      const matchesJersey =
        jerseyFilter === 'all' ||
        (jerseyFilter === 'needed' && r.needsJersey) ||
        (jerseyFilter === 'none' && !r.needsJersey);

      return matchesSearch && matchesTeam && matchesDate && matchesJersey;
    });
  }, [effectiveRsvps, searchQuery, teamFilter, dateFilter, jerseyFilter]);

  // Export to CSV
  const handleExportCsv = () => {
    const headers = ['Player Name', 'Squad', 'Preferred Date', 'Needs Jersey', 'Jersey Size', 'Last Updated', 'Source'];
    const rows = filteredRsvps.map((r) => [
      `"${r.name || ''}"`,
      r.team === 'bride' ? 'Team Amritha (Rose)' : 'Team Sanjay (Gold)',
      r.preferredDate || '',
      r.needsJersey ? 'Yes' : 'No',
      r.needsJersey ? r.jerseySize : 'None',
      r.updatedAt || r.createdAt || '',
      r.source || (r.isCloud ? 'cloud' : 'local'),
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `TurfDay_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Initial Auth Check Spinner
  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <Loader2 className="h-8 w-8 animate-spin text-amber-400 mb-3" />
        <p className="text-xs text-slate-400 font-serif">Checking organizer authorization...</p>
      </div>
    );
  }

  // FIREBASE EMAIL / PASSWORD LOGIN SCREEN
  if (isFirebaseReady && !currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-amber-500 selection:text-slate-950">
        <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Golden Glow */}
          <div className="absolute -top-16 -right-16 h-40 w-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-amber-400 border border-slate-700 shadow-md mb-4">
            <Shield className="h-7 w-7 text-amber-400" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-black text-white font-serif">Organizer Portal</h2>
            <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">
              Sign in with your authorized Firebase organizer account to view guest lists, jersey orders, and live Firestore responses.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3.5 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{loginError}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-amber-400" />
                <span>Organizer Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginError('');
                }}
                placeholder="organizer@wedding.com"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-3 px-4 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-amber-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
                placeholder="••••••••••••"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-3 px-4 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Sign In as Organizer</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-800 pt-4 text-center">
            <button
              onClick={onBackToHome}
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Public Invitation</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD (OR FALLBACK MODE)
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Return to Public Site"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-base font-extrabold flex items-center gap-2">
                <span>Organizer Dashboard</span>
                <span className="text-[10px] font-bold uppercase rounded bg-amber-500/20 text-amber-300 px-2 py-0.5 border border-amber-400/30">
                  ADMIN
                </span>
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Database className="h-3 w-3" />
                  {isFirebaseReady ? 'Live Firestore Sync (amritha-sanjay)' : 'Local Fallback Store'}
                </span>
                {currentUser?.email && (
                  <>
                    <span className="text-slate-600">•</span>
                    <span className="text-amber-300 font-medium truncate max-w-[180px] sm:max-w-none">
                      {currentUser.email}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 text-xs font-bold shadow-sm transition-colors"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Add Guest</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {isFirebaseReady && currentUser ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-950 hover:text-rose-200 border border-slate-700 transition-colors"
                title="Sign out of organizer session"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Sync Error Alert Banner */}
      {syncError && (
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-3">
          <div className="mx-auto max-w-6xl flex items-center justify-between text-xs text-rose-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
              <span>
                <strong>Firestore Sync Warning:</strong> {syncError}. Ensure your Firestore Security Rules allow read access for authenticated admins.
              </span>
            </div>
            <button
              onClick={() => setSyncError(null)}
              className="text-rose-500 hover:text-rose-800 font-bold ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-6">
        {/* SUMMARY CARDS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Card 1: Total Guests */}
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Guests</span>
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalGuests}</div>
              <p className="text-[11px] text-slate-400 mt-1">Confirmed RSVP responses</p>
            </div>
          </div>

          {/* Card 2: Team Amritha (Rose) */}
          <div className="rounded-2xl bg-gradient-to-b from-rose-50/70 to-white p-4 shadow-sm border border-rose-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-rose-800 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider font-serif">Team Amritha</span>
              <div className="rounded-xl bg-rose-100 p-2 text-rose-700">
                <Crown className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-rose-950">{brideCount}</div>
              <p className="text-[11px] text-rose-600 font-semibold mt-1">
                {totalGuests > 0 ? `${Math.round((brideCount / totalGuests) * 100)}% of total squad` : '0%'}
              </p>
            </div>
          </div>

          {/* Card 3: Team Sanjay (Gold) */}
          <div className="rounded-2xl bg-gradient-to-b from-amber-50/70 to-white p-4 shadow-sm border border-amber-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-800 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider font-serif">Team Sanjay</span>
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-950">{groomCount}</div>
              <p className="text-[11px] text-amber-700 font-semibold mt-1">
                {totalGuests > 0 ? `${Math.round((groomCount / totalGuests) * 100)}% of total squad` : '0%'}
              </p>
            </div>
          </div>

          {/* Card 4: Total Jerseys Needed */}
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Jerseys Needed</span>
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                <Shirt className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-950">
                {jerseyStats.totalJerseysNeeded}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {jerseyStats.noJerseyCount} guests opted out
              </p>
            </div>
          </div>
        </div>

        {/* VENDOR JERSEY TALLY SECTION */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Shirt className="h-4 w-4 text-emerald-600" />
                <span>Jersey Order Breakdown by Size</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Exact tallies ready for vendor printing and packaging.
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1 text-xs font-bold self-start sm:self-auto">
              Total Order: {jerseyStats.totalJerseysNeeded} pieces
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {Object.entries(jerseyStats.sizeMap).map(([size, count]) => (
              <div
                key={size}
                className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-center transition-all hover:border-amber-400"
              >
                <span className="block text-[11px] font-bold text-slate-500">Size</span>
                <span className="block text-base font-black text-slate-900">{size}</span>
                <span className="block text-xs font-bold text-emerald-700 mt-1 bg-emerald-100/70 rounded-md py-0.5">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guest name..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Squad Filter */}
            <div>
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-medium text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none"
              >
                <option value="all">All Squads ({totalGuests})</option>
                <option value="bride">Team Amritha ({brideCount})</option>
                <option value="groom">Team Sanjay ({groomCount})</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-medium text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none"
              >
                <option value="all">All Dates ({totalGuests})</option>
                {config.dates.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.shortDate} ({dateCounts[d.id] || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Jersey Filter */}
            <div>
              <select
                value={jerseyFilter}
                onChange={(e) => setJerseyFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-medium text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none"
              >
                <option value="all">All Jersey Statuses</option>
                <option value="needed">Needs Jersey ({jerseyStats.totalJerseysNeeded})</option>
                <option value="none">No Jersey ({jerseyStats.noJerseyCount})</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESPONSIVE GUEST TABLE */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Live RSVP List ({filteredRsvps.length} matching)
            </h3>
            <span className="text-[11px] text-slate-400">
              Auto-updating via Cloud Firestore
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Guest Name</th>
                  <th className="py-3 px-4">Squad</th>
                  <th className="py-3 px-4">Event Date</th>
                  <th className="py-3 px-4">Jersey</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredRsvps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No matching RSVP records found.
                    </td>
                  </tr>
                ) : (
                  filteredRsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <span>{rsvp.name}</span>
                        {rsvp.source === 'cloud' && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" title="Cloud Verified" />
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {rsvp.team === 'bride' ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-800">
                            <Crown className="h-3 w-3 text-rose-600" />
                            <span>Team Amritha</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                            <Sparkles className="h-3 w-3 text-amber-600" />
                            <span>Team Sanjay</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-semibold">
                        {rsvp.preferredDate}
                      </td>
                      <td className="py-3.5 px-4">
                        {rsvp.needsJersey ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-200">
                            <Shirt className="h-3 w-3 text-emerald-600" />
                            <span>Size: {rsvp.jerseySize}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">No Jersey</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {rsvp.updatedAt
                          ? new Date(rsvp.updatedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Recent'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(rsvp)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                            title="Edit RSVP"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(rsvp.id, rsvp.name)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            title="Delete RSVP"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* EDIT / ADD GUEST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-500" />
                <span>{editingRsvp ? 'Edit Guest RSVP' : 'Add Guest to Match Sheet'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {modalError && (
              <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={modalForm.name}
                  onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3 text-xs font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Squad
                  </label>
                  <select
                    value={modalForm.team}
                    onChange={(e) => setModalForm({ ...modalForm, team: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3 text-xs font-semibold text-slate-900 focus:outline-none"
                  >
                    <option value="bride">Team Amritha (Rose)</option>
                    <option value="groom">Team Sanjay (Gold)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <select
                    value={modalForm.preferredDate}
                    onChange={(e) => setModalForm({ ...modalForm, preferredDate: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3 text-xs font-semibold text-slate-900 focus:outline-none"
                  >
                    {config.dates.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.shortDate} ({d.dayName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Jersey Needed?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setModalForm({ ...modalForm, needsJersey: true })}
                    className={`rounded-xl py-2 px-3 text-xs font-bold border transition-all ${
                      modalForm.needsJersey
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    Yes (Needs Jersey)
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalForm({ ...modalForm, needsJersey: false })}
                    className={`rounded-xl py-2 px-3 text-xs font-bold border transition-all ${
                      !modalForm.needsJersey
                        ? 'border-slate-700 bg-slate-100 text-slate-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    No Jersey
                  </button>
                </div>
              </div>

              {modalForm.needsJersey && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Jersey Size
                  </label>
                  <select
                    value={modalForm.jerseySize}
                    onChange={(e) => setModalForm({ ...modalForm, jerseySize: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 px-3 text-xs font-semibold text-slate-900 focus:outline-none"
                  >
                    {config.jerseySizeChart.map((s) => (
                      <option key={s.size} value={s.size}>
                        Size {s.size} (Chest: {s.chest}cm)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-6 flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={modalSaving}
                  className="rounded-xl border border-slate-300 bg-white py-2 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalSaving}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 py-2 px-5 text-xs font-bold text-white shadow-md shadow-rose-900/20 disabled:opacity-50"
                >
                  {modalSaving ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>{editingRsvp ? 'Save Changes' : 'Add Guest'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
