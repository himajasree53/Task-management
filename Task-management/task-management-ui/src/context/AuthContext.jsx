import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {

        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("role");

        if (token) {
            return {
                id,
                token,
                email,
                role
            };
        }

        return null;
    });

    const login = (userData) => {

        localStorage.setItem("id", userData.id);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("email", userData.email);
        localStorage.setItem("role", userData.role);

        setUser(userData);
    };

    const logout = () => {

        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        setUser(null);

        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}