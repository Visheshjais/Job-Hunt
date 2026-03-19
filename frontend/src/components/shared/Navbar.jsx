import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../../redux/authSlice.js";
import { USER_API } from "../../utils/constant.js";
import { Briefcase, LogOut, User, ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const logout = async () => {
    try {
      const res = await axios.get(`${USER_API}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged out successfully");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border">
      <div className="section-container flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
            <Briefcase size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl">
            Job<span className="gradient-text">Hunt</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {user?.role === "recruiter" ? (
            <>
              <Link to="/admin/companies" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Companies</Link>
              <Link to="/admin/jobs"      className="text-white/60 hover:text-white transition-colors text-sm font-medium">Jobs</Link>
            </>
          ) : (
            <>
              <Link to="/"       className="text-white/60 hover:text-white transition-colors text-sm font-medium">Home</Link>
              <Link to="/jobs"   className="text-white/60 hover:text-white transition-colors text-sm font-medium">Jobs</Link>
              <Link to="/browse" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Browse</Link>
            </>
          )}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login"  className="btn-outline text-sm py-2 px-4">Login</Link>
              <Link to="/signup" className="btn-glow text-sm py-2 px-4">Get Started</Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2 glass-card rounded-xl px-3 py-2 hover:border-brand-500/30 transition-all"
              >
                <img
                  src={user.profile?.profilePhoto || `https://ui-avatars.com/api/?name=${user.fullname}&background=ff2d8d&color=fff`}
                  alt={user.fullname}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-white/80">{user.fullname}</span>
                <ChevronDown size={14} className="text-white/40" />
              </button>

              {dropOpen && (
                <div className="absolute right-0 top-12 w-52 glass-card rounded-xl p-2 shadow-2xl border border-border z-50">
                  <Link
                    to="/profile"
                    onClick={() => setDropOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-white/70 hover:text-white transition-all"
                  >
                    <User size={14} /> View Profile
                  </Link>
                  <button
                    onClick={() => { setDropOpen(false); logout(); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-500/10 text-sm text-white/70 hover:text-brand-400 transition-all w-full"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white/60" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-card border-t border-border px-4 py-4 space-y-3">
          {user?.role === "recruiter" ? (
            <>
              <Link to="/admin/companies" onClick={() => setMenuOpen(false)} className="block text-white/70 hover:text-white py-2">Companies</Link>
              <Link to="/admin/jobs"      onClick={() => setMenuOpen(false)} className="block text-white/70 hover:text-white py-2">Jobs</Link>
            </>
          ) : (
            <>
              <Link to="/"       onClick={() => setMenuOpen(false)} className="block text-white/70 hover:text-white py-2">Home</Link>
              <Link to="/jobs"   onClick={() => setMenuOpen(false)} className="block text-white/70 hover:text-white py-2">Jobs</Link>
              <Link to="/browse" onClick={() => setMenuOpen(false)} className="block text-white/70 hover:text-white py-2">Browse</Link>
            </>
          )}
          {!user ? (
            <div className="flex gap-3 pt-2">
              <Link to="/login"  onClick={() => setMenuOpen(false)} className="btn-outline text-sm py-2 px-4 flex-1 text-center">Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn-glow text-sm py-2 px-4 flex-1 text-center">Sign Up</Link>
            </div>
          ) : (
            <button onClick={() => { setMenuOpen(false); logout(); }} className="flex items-center gap-2 text-brand-400 py-2">
              <LogOut size={14} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
