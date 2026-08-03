import { useEffect, useState, useCallback } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { toast } from "react-toastify";

function Report() {
    const [report, setReport] = useState({
        totalProjects: 0,
        completedProjects: 0,
        inProgressProjects: 0,
        pendingProjects: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        highPriorityTasks: 0,
        mediumPriorityTasks: 0,
        lowPriorityTasks: 0
    });

    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const loadReport = async () => {
        setLoading(true);
        try {
            const response = await API.get("/reports");
            setReport(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load report summary data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReport();
    }, []);

    const generateReport = useCallback(async () => {
        setDownloading(true);
        try {
            const response = await API.get(
                "/reports/download",
                {
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );

            const link = document.createElement("a");
            link.href = url;
            link.download = `Task_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success("Professional PDF report downloaded successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Unable to generate PDF report");
        } finally {
            setDownloading(false);
        }
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <div className="spinner-border" style={{ color: "#0c1629" }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container-fluid" style={{ backgroundColor: "#f0f3f3", minHeight: "100vh", paddingBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }}>

                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4 pt-3 flex-wrap gap-3">
                    <div>
                        <h2 className="fw-bold mb-1" style={{ color: "#0c1629" }}>Executive Reports</h2>
                        <p className="text-muted mb-0">Download formal system performance and task tracking documents</p>
                    </div>

                    <button
                        className="btn text-white fw-bold shadow-sm px-4 py-2"
                        style={{ backgroundColor: "#0c1629" }}
                        onClick={generateReport}
                        disabled={downloading}
                    >
                        {downloading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Generating PDF...
                            </>
                        ) : (
                            "📥 Download Professional PDF"
                        )}
                    </button>
                </div>

                {/* Quick Metrics Cards */}
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body">
                                <h6 className="fw-semibold" style={{ color: "#0c1629" }}>Total Projects</h6>
                                <h3 className="fw-bold mb-0" style={{ color: "#0c1629" }}>{report.totalProjects}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body">
                                <h6 className="fw-semibold" style={{ color: "#0c1629" }}>Total Tasks</h6>
                                <h3 className="fw-bold mb-0" style={{ color: "#0c1629" }}>{report.totalTasks}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body">
                                <h6 className="fw-semibold" style={{ color: "#0c1629" }}>High Priority Items</h6>
                                <h3 className="fw-bold mb-0" style={{ color: "#0c1629" }}>{report.highPriorityTasks}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Preview Card Container */}
                <div className="card shadow-sm border-0">
                    <div className="card-header py-3" style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>
                        <h5 className="mb-0 fw-bold">📄 Report Preview Structure</h5>
                    </div>
                    <div className="card-body p-4" style={{ backgroundColor: "#ffffff" }}>

                        {/* Project Summary Table */}
                        <div className="mb-4">
                            <h5 className="fw-bold mb-3" style={{ color: "#0c1629" }}>Project Summary</h5>
                            <div className="table-responsive p-0">
                                <table className="table table-hover align-middle mb-0" style={{ backgroundColor: "#d6dce0" }}>
                                    <thead>
                                    <tr style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>
                                        <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Indicator</th>
                                        <th className="text-end" style={{ width: "160px", backgroundColor: "#0c1629", color: "#ffffff" }}>Count</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr style={{ backgroundColor: "#d6dce0" }}>
                                        <td className="fw-semibold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>Total Projects</td>
                                        <td className="text-end fw-bold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{report.totalProjects}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#d6dce0" }}>
                                        <td className="fw-semibold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>Completed Projects</td>
                                        <td className="text-end fw-bold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{report.completedProjects}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#d6dce0" }}>
                                        <td className="fw-semibold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>Projects In Progress</td>
                                        <td className="text-end fw-bold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{report.inProgressProjects}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#d6dce0" }}>
                                        <td className="fw-semibold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>Projects Not Yet Started</td>
                                        <td className="text-end fw-bold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{report.pendingProjects}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Task Summary Table */}
                        <div className="mb-4">
                            <h5 className="fw-bold mb-3" style={{ color: "#0c1629" }}>Task Summary</h5>
                            <div className="table-responsive p-0">
                                <table className="table table-hover align-middle mb-0" style={{ backgroundColor: "#d6dce0" }}>
                                    <thead>
                                    <tr style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>
                                        <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Indicator</th>
                                        <th className="text-end" style={{ width: "160px", backgroundColor: "#0c1629", color: "#ffffff" }}>Count</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr style={{ backgroundColor: "#d6dce0" }}>
                                        <td className="fw-semibold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>Total Tasks</td>
                                        <td className="text-end fw-bold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{report.totalTasks}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#d6dce0" }}>
                                        <td className="fw-semibold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>Completed Tasks</td>
                                        <td className="text-end fw-bold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{report.completedTasks}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#d6dce0" }}>
                                        <td className="fw-semibold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>Tasks Not Yet Started</td>
                                        <td className="text-end fw-bold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{report.pendingTasks}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Priority Breakdown Table */}
                        <div>
                            <h5 className="fw-bold mb-3" style={{ color: "#0c1629" }}>Task Priority Distribution</h5>
                            <div className="table-responsive p-0">
                                <table className="table table-hover align-middle mb-0" style={{ backgroundColor: "#d6dce0" }}>
                                    <thead>
                                    <tr style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>
                                        <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Priority Level</th>
                                        <th className="text-end" style={{ width: "160px", backgroundColor: "#0c1629", color: "#ffffff" }}>Count</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr style={{ backgroundColor: "#d6dce0" }}>
                                        <td className="fw-semibold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>
                                            <span className="badge" style={{ minWidth: "75px", backgroundColor: "#b5c1c8", color: "#0c1629" }}>HIGH</span>
                                        </td>
                                        <td className="text-end fw-bold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{report.highPriorityTasks}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#d6dce0" }}>
                                        <td className="fw-semibold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>
                                            <span className="badge" style={{ minWidth: "75px", backgroundColor: "#d6dce0", color: "#0c1629" }}>MEDIUM</span>
                                        </td>
                                        <td className="text-end fw-bold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{report.mediumPriorityTasks}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#d6dce0" }}>
                                        <td className="fw-semibold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>
                                            <span className="badge" style={{ minWidth: "75px", backgroundColor: "#f0f3f3", color: "#0c1629" }}>LOW</span>
                                        </td>
                                        <td className="text-end fw-bold" style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{report.lowPriorityTasks}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    );
}

export default Report;