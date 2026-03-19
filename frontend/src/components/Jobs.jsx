import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar.jsx";
import Footer from "./shared/Footer.jsx";
import JobCard from "./JobCard.jsx";
import useGetAllJobs from "../hooks/useGetAllJobs.jsx";
import { Search, SlidersHorizontal, X } from "lucide-react";

const FILTERS = {
  "Job Type":    ["Full Time", "Part Time", "Remote", "Internship", "Contract"],
  "Experience":  ["0-1 Years", "1-3 Years", "3-5 Years", "5+ Years"],
  "Salary":      ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10+ LPA"],
};

export default function Jobs() {
  useGetAllJobs();
  const { allJobs } = useSelector(s => s.job);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    let jobs = allJobs;
    if (search) {
      jobs = jobs.filter(j =>
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.description.toLowerCase().includes(search.toLowerCase()) ||
        j.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selected["Job Type"]) {
      jobs = jobs.filter(j => j.jobType?.toLowerCase().includes(selected["Job Type"].toLowerCase()));
    }
    setFiltered(jobs);
  }, [search, selected, allJobs]);

  const toggleFilter = (cat, val) => {
    setSelected(prev => ({ ...prev, [cat]: prev[cat] === val ? undefined : val }));
  };

  const clearAll = () => setSelected({});
  const activeCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-4xl text-white mb-2">
              All <span className="gradient-text">Jobs</span>
            </h1>
            <p className="text-white/40">{allJobs.length} opportunities available</p>
          </div>

          {/* Search + Filter bar */}
          <div className="flex gap-3 mb-8">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search jobs, companies, locations..."
                className="input-field pl-10"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm font-semibold ${
                activeCount > 0
                  ? "bg-brand-500/10 border-brand-500/40 text-brand-400"
                  : "glass-card border-border text-white/60 hover:text-white hover:border-brand-500/20"
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>
            {activeCount > 0 && (
              <button onClick={clearAll} className="px-4 py-3 rounded-xl border border-border text-white/40 hover:text-white/70 text-sm transition-all">
                Clear
              </button>
            )}
          </div>

          <div className="flex gap-8">
            {/* Sidebar filters */}
            {showFilter && (
              <div className="w-64 shrink-0">
                <div className="glass-card rounded-2xl p-5 border border-border sticky top-24 space-y-6">
                  <h3 className="font-display font-semibold text-white text-sm">Filter Jobs</h3>
                  {Object.entries(FILTERS).map(([cat, opts]) => (
                    <div key={cat}>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">{cat}</p>
                      <div className="space-y-2">
                        {opts.map(opt => (
                          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                              selected[cat] === opt
                                ? "bg-brand-gradient border-brand-500"
                                : "border-border group-hover:border-brand-500/40"
                            }`}>
                              {selected[cat] === opt && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <input type="radio" name={cat} value={opt} className="hidden" onChange={() => toggleFilter(cat, opt)} />
                            <span className={`text-sm transition-colors ${selected[cat] === opt ? "text-white" : "text-white/50 group-hover:text-white/70"}`}>
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jobs grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-white/30 font-medium">No jobs found</p>
                  <p className="text-white/20 text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <>
                  <p className="text-white/40 text-sm mb-5">{filtered.length} jobs found</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filtered.map(job => <JobCard key={job._id} job={job} />)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
