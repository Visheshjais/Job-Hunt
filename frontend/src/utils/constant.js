const BASE = import.meta.env.VITE_API_URL || "/api";

export const USER_API          = `${BASE}/v1/user`;
export const JOB_API           = `${BASE}/v1/job`;
export const APPLICATION_API   = `${BASE}/v1/application`;
export const COMPANY_API       = `${BASE}/v1/company`;
