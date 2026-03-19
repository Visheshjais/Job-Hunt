import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setLoading, setUser } from "../../redux/authSlice.js";
import { USER_API } from "../../utils/constant.js";
import { Briefcase, Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const [input, setInput] = useState({ email: "", password: "", role: "student" });
  const [showPw, setShowPw] = useState(false);
  const { loading } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const change = e => setInput({ ...input, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center">
              <Briefcase size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl">Job<span className="gradient-text">Hunt</span></span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-white">Welcome back</h1>
          <p className="text-white/40 mt-2 text-sm">Sign in to continue your journey</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 border border-border">
          {/* Role toggle */}
          <div className="flex bg-card rounded-xl p-1 mb-6 border border-border">
            {["student", "recruiter"].map(r => (
              <button
                key={r}
                onClick={() => setInput({ ...input, role: r })}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                  input.role === r ? "bg-brand-gradient text-white shadow-lg" : "text-white/40 hover:text-white/70"
                }`}
              >
                {r === "student" ? "Job Seeker" : "Recruiter"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Email</label>
              <input name="email" type="email" value={input.email} onChange={change}
                placeholder="you@example.com" className="input-field" required />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <input name="password" type={showPw ? "text" : "password"} value={input.password} onChange={change}
                  placeholder="••••••••" className="input-field pr-10" required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2 py-3 mt-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
