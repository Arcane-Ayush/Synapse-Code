import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">Checking auth…</div>
    );
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
