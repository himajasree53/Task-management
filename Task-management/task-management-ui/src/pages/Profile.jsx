import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        setLoading(true);
        try {
            // ✅ Fetch using the secure /me endpoint matching the token context
            const response = await api.get("/users/me");
            setUser(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load profile details!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "80vh" }}
                >
                    <div className="spinner-border" role="status" style={{ color: "#0c1629" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container-fluid" style={{ backgroundColor: "#f0f3f3", minHeight: "100vh", paddingBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
                <div className="row justify-content-center pt-4">
                    <div className="col-md-6">
                        <div className="card shadow border-0" style={{ backgroundColor: "#d6dce0" }}>
                            <div className="card-header text-center py-3" style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>
                                <h3 className="fw-bold mb-0">User Profile</h3>
                            </div>
                            <div className="card-body p-4" style={{ backgroundColor: "#d6dce0" }}>
                                {user ? (
                                    <div style={{ color: "#0c1629" }}>
                                        {/* ✅ Safe optional chaining prevents crashes */}
                                        <div className="mb-3">
                                            <label className="fw-bold" style={{ color: "#727a84" }}>Full Name:</label>
                                            <p className="fs-5 fw-semibold mb-0">{user?.fullName || "N/A"}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-bold" style={{ color: "#727a84" }}>Email Address:</label>
                                            <p className="fs-5 fw-semibold mb-0">{user?.email || "N/A"}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-bold" style={{ color: "#727a84" }}>Department:</label>
                                            <p className="fs-5 fw-semibold mb-0">{user?.department || "N/A"}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-bold" style={{ color: "#727a84" }}>Role:</label>
                                            <p className="fs-5 mb-0">
                                                <span className="badge px-3 py-2" style={{ backgroundColor: "#b5c1c8", color: "#0c1629", fontWeight: "600" }}>
                                                    {user?.role || "USER"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4" style={{ color: "#0c1629" }}>
                                        No profile data found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;