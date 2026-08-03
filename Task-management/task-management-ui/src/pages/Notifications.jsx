import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

import {
    getNotifications,
    markAsRead,
    sendNotification
} from "../services/notificationService";

function Notifications() {

    const userId = localStorage.getItem("id");

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        userId: "",
        title: "",
        message: ""
    });

    useEffect(() => {

        if (userId) {
            loadNotifications();
        }

    }, []);

    const loadNotifications = async () => {

        setLoading(true);

        try {

            const response = await getNotifications(userId);

            setNotifications(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load notifications!");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await sendNotification(form);

            toast.success("Notification sent successfully!");

            setForm({
                userId: "",
                title: "",
                message: ""
            });

            loadNotifications();

        } catch (error) {

            console.log(error);

            toast.error("Unable to send notification!");

        }

    };

    const readNotification = async (id) => {

        try {

            await markAsRead(id);

            toast.success("Notification marked as read!");

            loadNotifications();

        } catch (error) {

            console.log(error);

            toast.error("Unable to update notification!");

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

                    <h2 className="fw-bold" style={{ color: "#0c1629" }}>Notifications</h2>

                    <button
                        className="btn text-white fw-bold"
                        style={{ backgroundColor: "#727a84" }}
                        onClick={loadNotifications}
                    >
                        Refresh
                    </button>

                </div>

                <div className="card shadow mb-4 border-0" style={{ backgroundColor: "#ffffff" }}>

                    <div className="card-body">

                        <h4 className="mb-3 fw-bold" style={{ color: "#0c1629" }}>
                            Send Notification
                        </h4>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="form-label fw-semibold" style={{ color: "#0c1629" }}>
                                    User ID
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="userId"
                                    value={form.userId}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label fw-semibold" style={{ color: "#0c1629" }}>
                                    Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label fw-semibold" style={{ color: "#0c1629" }}>
                                    Message
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                                    required
                                ></textarea>

                            </div>

                            <button
                                className="btn text-white fw-bold"
                                style={{ backgroundColor: "#0c1629" }}
                            >
                                Send Notification
                            </button>

                        </form>

                    </div>

                </div>

                <div className="card shadow border-0" style={{ backgroundColor: "#d6dce0" }}>

                    <div className="card-header py-3" style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>

                        <h5 className="mb-0 fw-bold">

                            My Notifications

                        </h5>

                    </div>

                    <div className="card-body">

                        {notifications.length === 0 ? (

                            <div className="alert border-0 text-center py-3" style={{ backgroundColor: "#b5c1c8", color: "#0c1629" }}>

                                No notifications found.

                            </div>

                        ) : (

                            notifications.map(notification => (

                                <div
                                    key={notification.id}
                                    className="card mb-3 border-0 shadow-sm"
                                    style={{ backgroundColor: "#ffffff" }}
                                >

                                    <div className="card-body">

                                        <h5 className="fw-bold" style={{ color: "#0c1629" }}>

                                            {notification.title || "Notification"}

                                        </h5>

                                        <p className="mb-2" style={{ color: "#0c1629" }}>

                                            {notification.message}

                                        </p>

                                        <small className="text-muted">

                                            {notification.createdAt}

                                        </small>

                                        <div className="mt-3">

                                            {notification.read ? (

                                                <span className="badge" style={{ backgroundColor: "#b5c1c8", color: "#0c1629", fontWeight: "600" }}>

                                                    Read

                                                </span>

                                            ) : (

                                                <>

                                                    <span className="badge me-3" style={{ backgroundColor: "#727a84", color: "#ffffff", fontWeight: "600" }}>

                                                        Unread

                                                    </span>

                                                    <button
                                                        className="btn btn-sm text-white fw-bold"
                                                        style={{ backgroundColor: "#0c1629" }}
                                                        onClick={() =>
                                                            readNotification(notification.id)
                                                        }
                                                    >
                                                        Mark as Read
                                                    </button>

                                                </>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Notifications;