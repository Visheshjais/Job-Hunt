import { useSelector } from "react-redux";
import JobCard from "./JobCard.jsx";
import { TrendingUp } from "lucide-react";

export default function LatestJobs() {
  const { allJobs } = useSelector(s => s.job);

  return (
    <section className="py-20">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient/15 flex items-center justify-center">
            <TrendingUp size={16} className="text-brand-400" />
          </div>
          <span className="text-brand-400 text-sm font-semibold uppercase tracking-wider">Latest Openings</span>
        </div>
        <h2 className="font-display font-bold text-4xl text-white mb-2">
          Trending <span className="gradient-text">Jobs</span>
        </h2>
        <p className="text-white/40 mb-10">Fresh opportunities added daily</p>

        {allJobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={24} className="text-white/20" />
            </div>
            <p className="text-white/30 font-medium">No jobs posted yet</p>
            <p className="text-white/20 text-sm mt-1">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allJobs.slice(0, 6).map(job => <JobCard key={job._id} job={job} />)}
          </div>
        )}
      </div>
    </section>
  );
}
