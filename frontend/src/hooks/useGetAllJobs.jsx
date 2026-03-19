import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllJobs } from "../redux/jobSlice.js";
import { JOB_API } from "../utils/constant.js";

export default function useGetAllJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${JOB_API}/get`, { withCredentials: true });
        if (res.data.success) dispatch(setAllJobs(res.data.jobs));
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);
}
