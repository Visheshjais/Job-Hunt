import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllApplicants } from "../redux/applicationSlice.js";
import { APPLICATION_API } from "../utils/constant.js";

export default function useGetAppliedJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API}/get`, { withCredentials: true });
        if (res.data.success) dispatch(setAllApplicants(res.data.applications));
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);
}
