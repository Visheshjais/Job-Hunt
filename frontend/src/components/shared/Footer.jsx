import { Link } from "react-router-dom";
import { Briefcase, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                <Briefcase size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Job<span className="gradient-text">Hunt</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              The modern job portal connecting talent with opportunity. Find your dream career today.
            </p>
            <div className="flex gap-4 mt-6">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 glass-card rounded-lg flex items-center justify-center text-white/40 hover:text-brand-400 hover:border-brand-500/30 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-white/80 mb-4">For Job Seekers</h4>
            <ul className="space-y-3">
              {["Browse Jobs", "Companies", "Profile", "Applied Jobs"].map(item => (
                <li key={item}><a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-white/80 mb-4">For Recruiters</h4>
            <ul className="space-y-3">
              {["Post a Job", "Manage Companies", "View Applicants", "Dashboard"].map(item => (
                <li key={item}><a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© 2025 JobHunt. All rights reserved.</p>
          <p className="text-white/20 text-xs">Built with React + Node.js + MongoDB</p>
        </div>
      </div>
    </footer>
  );
}
