import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import UserForm from "../components/UserForm";
import { toast } from "react-toastify";

import {
    getUsers,
    updateUser,
    deleteUser,
    searchUsers,
    searchDepartment
} from "../services/userService";

function Users() {

    const [users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [department, setDepartment] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        setLoading(true);

        try {

            const response = await getUsers();
            setUsers(response.data);

        } catch (error) {

            console.log(error);
            toast.error("Failed to load users!");

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = async () => {

        try {

            if (searchName.trim() !== "") {

                const response = await searchUsers(searchName);
                setUsers(response.data);

            } else if (department.trim() !== "") {

                const response = await searchDepartment(department);
                setUsers(response.data);

            } else {

                loadUsers();

            }

        } catch (error) {

            console.log(error);
            toast.error("Search failed!");

        }

    };

    const editUser = (user) => {

        setSelectedUser(user);
        setShowForm(true);

    };

    const saveUser = async (user) => {

        try {

            await updateUser(selectedUser.id, user);

            toast.success("User updated successfully!");

            setShowForm(false);
            setSelectedUser(null);

            loadUsers();

        } catch (error) {

            console.log(error);
            toast.error("Unable to update user!");

        }

    };

    const removeUser = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await deleteUser(id);

            toast.success("User deleted successfully!");

            loadUsers();

        } catch (error) {

            console.log(error);
            toast.error("Unable to delete user!");

        }

    };

    if (loading) {

        return (

            <Layout>

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "80vh" }}
                >

                    <div className="spinner-border" style={{ color: "#0c1629" }}>

                        <span className="visually-hidden">
                            Loading...
                        </span>

                    </div>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="container-fluid" style={{ backgroundColor: "#f0f3f3", minHeight: "100vh", paddingBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }}>

                <div className="d-flex justify-content-between align-items-center mb-4 pt-3">

                    <h2 className="fw-bold" style={{ color: "#0c1629" }}>User Management</h2>

                </div>

                <div className="row mb-4 align-items-center">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={(e) =>
                                setSearchName(e.target.value)
                            }
                            style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                        />

                    </div>

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Department"
                            value={department}
                            onChange={(e) =>
                                setDepartment(e.target.value)
                            }
                            style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                        />

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn text-white fw-bold w-100"
                            style={{ backgroundColor: "#0c1629" }}
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn text-white fw-bold w-100"
                            style={{ backgroundColor: "#727a84" }}
                            onClick={() => {

                                setSearchName("");
                                setDepartment("");

                                loadUsers();

                            }}
                        >
                            Refresh
                        </button>

                    </div>

                </div>

                {showForm && (

                    <div className="modal d-block">

                        <div className="modal-dialog">

                            <div className="modal-content">

                                <div className="modal-header" style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>

                                    <h5 className="modal-title">

                                        Edit User

                                    </h5>

                                    <button
                                        className="btn-close btn-close-white"
                                        onClick={() => {

                                            setShowForm(false);
                                            setSelectedUser(null);

                                        }}
                                    ></button>

                                </div>

                                <div className="modal-body" style={{ backgroundColor: "#f0f3f3" }}>

                                    <UserForm
                                        selectedUser={selectedUser}
                                        onSave={saveUser}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                )}

                <div className="card shadow border-0">
                    <div className="card-body table-responsive p-0">
                        <table className="table table-hover mb-0" style={{ backgroundColor: "#d6dce0" }}>

                            <thead>

                            <tr style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>

                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>ID</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Full Name</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Email</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Department</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Role</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }} width="180">Actions</th>

                            </tr>

                            </thead>

                            <tbody>

                            {users.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-4"
                                        style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}
                                    >
                                        No Users Found
                                    </td>

                                </tr>

                            ) : (

                                users.map(user => (

                                    <tr key={user.id} style={{ backgroundColor: "#d6dce0" }}>

                                        <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{user.id}</td>

                                        <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }} className="fw-semibold">{user.fullName}</td>

                                        <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{user.email}</td>

                                        <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{user.department}</td>

                                        <td style={{ backgroundColor: "#d6dce0" }}>

                                            <span
                                                style={{
                                                    width: "170px",
                                                    height: "36px",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "20px",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    color: "#0c1629",
                                                    backgroundColor: "#b5c1c8"
                                                }}
                                            >
                                                {(user.role || "").replace("ROLE_", "")}
                                            </span>

                                        </td>

                                        <td style={{ backgroundColor: "#d6dce0" }}>

                                            <div className="d-flex gap-1">
                                                <button
                                                    className="btn btn-sm text-dark fw-bold"
                                                    style={{ backgroundColor: "#b5c1c8" }}
                                                    onClick={() => editUser(user)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm text-dark fw-bold"
                                                    style={{ backgroundColor: "#b5c1c8" }}
                                                    onClick={() => removeUser(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>

        </Layout>

    );

}

export default Users;