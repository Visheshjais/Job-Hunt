import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice.js";
import Navbar from "./shared/Navbar.jsx";
import Footer from "./shared/Footer.jsx";
import useGetAllJobs from "../hooks/useGetAllJobs.jsx";
import LatestJobs from "./LatestJobs.jsx";
import { Search, Zap, Shield, TrendingUp, Star } from "lucide-react";

const CATEGORIES = ["Frontend Developer", "Backend Developer", "Data Science", "UI/UX Designer", "DevOps", "Product Manager", "Full Stack", "Mobile Developer"];

export default function Home() {
  useGetAllJobs();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-500/12 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="section-container relative text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8 border border-brand-500/20 animate-fade-up">
            <Zap size={13} className="text-brand-400" />
            <span className="text-xs font-semibold text-white/70">Over 10,000 jobs posted this month</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Find Your{" "}
            <span className="gradient-text">Dream Career</span>
            <br />
            <span className="text-white/70">Without The Hassle</span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Connect with top companies, discover opportunities that match your skills, and land the job you've always wanted.
          </p>

          {/* Search */}
          <div className="flex gap-3 max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && search()}
                placeholder="Job title, company, or skill..."
                className="input-field pl-10"
              />
            </div>
            <button onClick={search} className="btn-glow px-6 whitespace-nowrap">
              Search Jobs
            </button>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { dispatch(setSearchedQuery(cat)); navigate("/browse"); }}
                className="badge-purple cursor-pointer hover:bg-violet-500/25 transition-all text-xs py-1.5 px-3"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10K+", label: "Active Jobs",      icon: TrendingUp },
              { value: "5K+",  label: "Companies",        icon: Shield },
              { value: "50K+", label: "Job Seekers",      icon: Star },
              { value: "95%",  label: "Placement Rate",   icon: Zap },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="glass-card rounded-2xl p-6 text-center border border-border hover:border-brand-500/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-brand-gradient/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} className="text-brand-400" />
                </div>
                <div className="font-display font-bold text-3xl gradient-text">{value}</div>
                <div className="text-white/40 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <LatestJobs />

      <Footer />
    </div>
  );
}
