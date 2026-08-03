import API from "./api";

export const getTasks = () => API.get("/tasks");

export const getTask = (id) => API.get(`/tasks/${id}`);

export const createTask = (task) => API.post("/tasks", task);

export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const searchTasks = (keyword) =>
    API.get(`/tasks/search?keyword=${keyword}`);

export const getTasksByProject = (projectId) =>
    API.get(`/tasks/project/${projectId}`);