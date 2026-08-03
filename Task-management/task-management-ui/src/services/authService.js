import api from "./api";

export const login = (credentials) => {
    return api.post("/auth/login", credentials);
};

export const register = (user) => {
    return api.post("/auth/register", user);
};