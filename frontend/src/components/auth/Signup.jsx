import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API } from "../../utils/constant.js";
import { Briefcase, Eye, EyeOff, Loader2, Upload } from "lucide-react";

export default function Signup() {
  const [input, setInput] = useState({ fullname: "", email: "", phoneNumber: "", password: "", role: "student", file: null });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const change = e => {
    if (e.target.name === "file") setInput({ ...input, file: e.target.files[0] });
    else setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(input).forEach(([k, v]) => { if (v) formData.append(k, v); });
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 py-12">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center">
              <Briefcase size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl">Job<span className="gradient-text">Hunt</span></span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-white">Create account</h1>
          <p className="text-white/40 mt-2 text-sm">Join thousands finding their dream jobs</p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-border">
          <div className="flex bg-card rounded-xl p-1 mb-6 border border-border">
            {["student", "recruiter"].map(r => (
              <button key={r} onClick={() => setInput({ ...input, role: r })}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                  input.role === r ? "bg-brand-gradient text-white" : "text-white/40 hover:text-white/70"
                }`}>
                {r === "student" ? "Job Seeker" : "Recruiter"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Full Name</label>
              <input name="fullname" value={input.fullname} onChange={change}
                placeholder="Vishesh Jaiswal" className="input-field" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Email</label>
              <input name="email" type="email" value={input.email} onChange={change}
                placeholder="you@example.com" className="input-field" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Phone Number</label>
              <input name="phoneNumber" value={input.phoneNumber} onChange={change}
                placeholder="9876543210" className="input-field" required />
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

            {/* Profile photo */}
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block">Profile Photo</label>
              <label className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 cursor-pointer hover:border-brand-500/40 transition-all">
                <Upload size={16} className="text-white/30" />
                <span className="text-white/40 text-sm">{input.file ? input.file.name : "Choose photo (optional)"}</span>
                <input name="file" type="file" accept="image/*" onChange={change} className="hidden" />
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2 py-3 mt-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
