import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector(s => s.auth);
  if (!user || user.role !== "recruiter") return <Navigate to="/" replace />;
  return children;
}
