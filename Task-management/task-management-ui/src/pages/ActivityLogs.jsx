import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getLogs } from "../services/activityLogService";

function ActivityLogs() {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const response = await getLogs();
            setLogs(response.data);
        } catch (error) {
            console.log(error);
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

                <div className="pt-3 mb-4">
                    <h2 className="fw-bold" style={{ color: "#0c1629" }}>
                        Activity Logs
                    </h2>
                </div>

                <div className="card shadow border-0">
                    <div className="card-body table-responsive p-0">
                        <table className="table table-hover mb-0" style={{ backgroundColor: "#d6dce0" }}>

                            <thead>

                            <tr style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>

                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>ID</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Action</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Performed By</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Date & Time</th>

                            </tr>

                            </thead>

                            <tbody>

                            {logs.length > 0 ? (

                                logs.map(log => (

                                    <tr key={log.id} style={{ backgroundColor: "#d6dce0" }}>

                                        <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{log.id}</td>

                                        <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }} className="fw-semibold">{log.action}</td>

                                        <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{log.performedBy}</td>

                                        <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{log.performedAt}</td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center py-4"
                                        style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}
                                    >
                                        No Activity Logs Found
                                    </td>

                                </tr>

                            )}

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>

        </Layout>

    );

}

export default ActivityLogs;