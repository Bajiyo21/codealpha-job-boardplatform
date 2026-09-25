import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Bell, User, PlusCircle, Building, FileText, Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getNotifications, markNotificationsRead } from "../services/coreService";
import Button from "./ui/Button";
import Container from "./ui/Container";

export default function Navbar() {
  const { user, logout, isCandidate, isEmployer } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      if (res.data) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unread_count || 0);
      }
    } catch (err) {
      console.warn("Notifications fetch error:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markNotificationsRead();
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {}
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800 text-white transition-all">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span>Career<span className="text-blue-500">Nest</span></span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/jobs" className="hover:text-white transition">Find Jobs</Link>
            <Link to="/companies" className="hover:text-white transition">Companies</Link>
            <Link to="/about" className="hover:text-white transition">About Us</Link>
          </nav>

          {/* Right Action Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Notification Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700/60"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 text-left z-50">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                        <h4 className="font-semibold text-white text-sm">Notifications</h4>
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllRead}
                            className="text-xs text-blue-400 hover:underline"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-slate-400 py-4 text-center">No notifications yet.</p>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`p-3 rounded-xl border text-xs transition ${
                                n.is_read
                                  ? "bg-slate-900/50 border-slate-800/50 text-slate-400"
                                  : "bg-blue-950/30 border-blue-800/50 text-slate-200 font-medium"
                              }`}
                            >
                              <div className="font-semibold text-slate-100">{n.title}</div>
                              <p className="mt-1 text-slate-300">{n.message}</p>
                              <span className="text-[10px] text-slate-500 mt-1 block">
                                {new Date(n.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Role Quick Actions */}
                {isEmployer ? (
                  <Link to="/jobs/create" className="hidden sm:inline-flex">
                    <Button variant="primary" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs py-2">
                      <PlusCircle className="w-4 h-4 mr-1.5" /> Post Job
                    </Button>
                  </Link>
                ) : (
                  <Link to="/resume-builder" className="hidden sm:inline-flex">
                    <Button variant="outline" className="text-xs border-slate-700 text-slate-200 hover:bg-slate-800 py-2">
                      <FileText className="w-4 h-4 mr-1.5 text-blue-400" /> Resume Builder
                    </Button>
                  </Link>
                )}

                {/* Dashboard Button */}
                <Link to={isEmployer ? "/employer/dashboard" : "/candidate/dashboard"}>
                  <Button variant="ghost" className="text-slate-200 hover:bg-slate-800 border border-slate-700/50">
                    <LayoutDashboard size={16} className="mr-2 text-blue-400" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                </Link>

                {/* User Avatar & Logout */}
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-700/60 transition"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-slate-300 hover:text-white">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 shadow-md shadow-blue-600/30">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4 space-y-3">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-white">Home</Link>
            <Link to="/jobs" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-white">Find Jobs</Link>
            <Link to="/companies" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-white">Companies</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-white">About Us</Link>
            {isCandidate && (
              <Link to="/resume-builder" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-blue-400 font-medium">Resume Builder</Link>
            )}
            {isEmployer && (
              <Link to="/jobs/create" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-blue-400 font-medium">+ Post a Job</Link>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}