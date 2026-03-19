import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllAdminJobs } from "../redux/jobSlice.js";
import { JOB_API } from "../utils/constant.js";

export default function useGetAllAdminJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${JOB_API}/getadminjobs`, { withCredentials: true });
        if (res.data.success) dispatch(setAllAdminJobs(res.data.jobs));
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);
}
