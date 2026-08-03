import API from "./api";

export const getNotifications = (userId) =>
    API.get(`/notifications/${userId}`);

export const markAsRead = (id) =>
    API.put(`/notifications/${id}/read`);

export const sendNotification = (notification) =>
    API.post("/notifications", notification);