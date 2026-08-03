import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role"); // Assuming you store the user's role in localStorage upon login

    // 1. Check if user is logged in
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // 2. Check if specific roles are required and if the user has permission
    if (allowedRoles && allowedRoles.length > 0) {
        // Normalize role check (handling with or without ROLE_ prefix)
        const hasPermission = allowedRoles.some(
            (role) => userRole === role || userRole === role.replace("ROLE_", "")
        );

        if (!hasPermission) {
            // Redirect unauthorized users to dashboard or a dedicated 403 page
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
}

export default PrivateRoute;