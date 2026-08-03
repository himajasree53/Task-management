import API from "./api";

export const getUsers = () => API.get("/users");

export const getUser = (id) => API.get(`/users/${id}`);

export const updateUser = (id, user) =>
    API.put(`/users/${id}`, user);

export const deleteUser = (id) =>
    API.delete(`/users/${id}`);

export const searchUsers = (name) =>
    API.get(`/users/search?name=${name}`);

export const searchDepartment = (department) =>
    API.get(`/users/department?department=${department}`);