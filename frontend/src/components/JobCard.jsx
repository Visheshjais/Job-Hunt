import { useNavigate } from "react-router-dom";
import { MapPin, Clock, DollarSign, Briefcase, BookmarkPlus } from "lucide-react";

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const daysAgo = Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24));

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="glass-card rounded-2xl p-6 border border-border hover:border-brand-500/30 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-500/5 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center overflow-hidden">
            {job.company?.logo
              ? <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-cover" />
              : <Briefcase size={18} className="text-white/30" />
            }
          </div>
          <div>
            <p className="font-semibold text-white/90 text-sm">{job.company?.name}</p>
            <div className="flex items-center gap-1 text-white/40 text-xs mt-0.5">
              <MapPin size={11} />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        <button
          onClick={e => e.stopPropagation()}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-white/30 hover:text-brand-400 hover:border-brand-500/30 transition-all"
        >
          <BookmarkPlus size={14} />
        </button>
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-brand-300 transition-colors line-clamp-1">
        {job.title}
      </h3>
      <p className="text-white/40 text-sm line-clamp-2 mb-4">{job.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="badge-pink">{job.position} Positions</span>
        <span className="badge-purple">{job.jobType}</span>
        <span className="badge-green">₹{job.salary} LPA</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-1 text-white/30 text-xs">
          <Clock size={11} />
          <span>{daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</span>
        </div>
        <span className="text-brand-400 text-xs font-semibold group-hover:text-brand-300 transition-colors">
          View Details →
        </span>
      </div>
    </div>
  );
}
