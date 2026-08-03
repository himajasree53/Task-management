import API from "./api";

// Get all activity logs
export const getLogs = () => {
    return API.get("/logs");
};