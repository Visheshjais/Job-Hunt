import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchQuery: "",
    searchedQuery: "",
    filterJobs: [],
  },
  reducers: {
    setAllJobs:      (state, action) => { state.allJobs = action.payload; },
    setAllAdminJobs: (state, action) => { state.allAdminJobs = action.payload; },
    setSingleJob:    (state, action) => { state.singleJob = action.payload; },
    setSearchQuery:  (state, action) => { state.searchQuery = action.payload; },
    setSearchedQuery:(state, action) => { state.searchedQuery = action.payload; },
    setFilterJobs:   (state, action) => { state.filterJobs = action.payload; },
  },
});

export const { setAllJobs, setAllAdminJobs, setSingleJob, setSearchQuery, setSearchedQuery, setFilterJobs } = jobSlice.actions;
export default jobSlice.reducer;
