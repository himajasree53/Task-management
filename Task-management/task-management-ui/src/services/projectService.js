import API from "./api";

export const getProjects = () =>
    API.get("/projects");

export const createProject = (project) =>
    API.post("/projects", project);

export const updateProject = (id, project) =>
    API.put(`/projects/${id}`, project);

export const deleteProject = (id) =>
    API.delete(`/projects/${id}`);

export const getProjectById = (id) =>
    API.get(`/projects/${id}`);

export const getProjectStats = () =>
    API.get("/projects/stats");

export const getHighPriorityProjects = () =>
    API.get("/projects/high-priority");