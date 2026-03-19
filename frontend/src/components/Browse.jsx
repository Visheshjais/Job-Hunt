import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar.jsx";
import Footer from "./shared/Footer.jsx";
import JobCard from "./JobCard.jsx";
import useGetAllJobs from "../hooks/useGetAllJobs.jsx";
import { Search } from "lucide-react";

export default function Browse() {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector(s => s.job);

  const filtered = searchedQuery
    ? allJobs.filter(j =>
        j.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        j.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchedQuery.toLowerCase())
      )
    : allJobs;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="section-container">
          <div className="mb-10">
            {searchedQuery && (
              <div className="flex items-center gap-2 mb-3">
                <Search size={14} className="text-brand-400" />
                <span className="text-brand-400 text-sm">Search results for</span>
                <span className="badge-pink">{searchedQuery}</span>
              </div>
            )}
            <h1 className="font-display font-bold text-4xl text-white">
              {searchedQuery ? "Search" : "Browse"} <span className="gradient-text">Results</span>
            </h1>
            <p className="text-white/40 mt-2">{filtered.length} jobs found</p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-white/20" />
              </div>
              <p className="text-white/30 font-medium text-lg">No results found</p>
              <p className="text-white/20 text-sm mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(job => <JobCard key={job._id} job={job} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
