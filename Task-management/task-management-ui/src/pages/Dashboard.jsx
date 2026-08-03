import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

// Pie chart colors kept as requested: Completed = Green, Total = Blue, In Progress = Yellow, Not Yet Started = Grey
const PIE_COLORS = [
    "#28a745", // Completed - Green
    "#6c757d", // Not Yet Started - Grey
    "#ffc107"  // In Progress - Yellow
];

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        totalProjects: 0,
        completedProjects: 0,
        pendingProjects: 0,
        inProgressProjects: 0,

        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        inProgressTasks: 0,

        totalUsers: 0
    });

    const [tasks, setTasks] = useState([]);
    const [highPriorityTasks, setHighPriorityTasks] = useState([]);
    const [highPriorityProjects, setHighPriorityProjects] = useState([]);

    useEffect(() => {
        loadDashboard();
        loadTasks();
        loadHighPriorityTasks();
        loadHighPriorityProjects();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await API.get("/dashboard");
            setDashboard(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadTasks = async () => {
        try {
            const response = await API.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadHighPriorityTasks = async () => {
        try {
            const response = await API.get("/tasks/high-priority");
            setHighPriorityTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadHighPriorityProjects = async () => {
        try {
            const response = await API.get("/projects/high-priority");
            setHighPriorityProjects(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const projectChartData = [
        {
            name: "Completed",
            value: dashboard.completedProjects
        },
        {
            name: "Not Yet Started",
            value: dashboard.pendingProjects
        },
        {
            name: "In Progress",
            value: dashboard.inProgressProjects
        }
    ];

    const taskChartData = [
        {
            name: "Completed",
            value: dashboard.completedTasks
        },
        {
            name: "Not Yet Started",
            value: dashboard.pendingTasks
        },
        {
            name: "In Progress",
            value: dashboard.inProgressTasks
        }
    ];

    const taskUsageCompletionData = [
        {
            name: "Completed",
            tasks: dashboard.completedTasks
        },
        {
            name: "In Progress",
            tasks: dashboard.inProgressTasks
        },
        {
            name: "Not Yet Started",
            tasks: dashboard.pendingTasks
        }
    ];

    const renderPriorityBadge = (priorityStr, isCompleted) => {
        if (isCompleted || !priorityStr) {
            return <span className="text-muted">N/A</span>;
        }

        const priority = priorityStr.toUpperCase();

        return (
            <span
                className="badge"
                style={{
                    minWidth: "75px",
                    display: "inline-block",
                    textAlign: "center",
                    backgroundColor: priority === "HIGH" ? "#727a84" : priority === "MEDIUM" ? "#b5c1c8" : "#d6dce0",
                    color: "#0c1629"
                }}
            >
                {priority}
            </span>
        );
    };

    return (

        <Layout>

            {/* Webpage background set to #f0f3f3 */}
            <div className="container-fluid" style={{ backgroundColor: "#f0f3f3", minHeight: "100vh", paddingBottom: "2rem" }}>

                <h2 className="mb-4 fw-bold" style={{ color: "#0c1629" }}>
                    Dashboard
                </h2>

                {/* Dashboard metric cards with light blue background where black was previously used */}
                <div className="row g-4">

                    <div className="col-lg-3 col-md-6">
                        <div className="card shadow border-0 text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body text-center">
                                <h6 style={{ color: "#0c1629" }}>Total Projects</h6>
                                <h2 className="fw-bold">{dashboard.totalProjects}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card shadow border-0 text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body text-center">
                                <h6 style={{ color: "#0c1629" }}>Completed Projects</h6>
                                <h2 className="fw-bold">{dashboard.completedProjects}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card shadow border-0 text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body text-center">
                                <h6 style={{ color: "#0c1629" }}>Projects Not Yet Started</h6>
                                <h2 className="fw-bold">{dashboard.pendingProjects}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card shadow border-0 text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body text-center">
                                <h6 style={{ color: "#0c1629" }}>In Progress Projects</h6>
                                <h2 className="fw-bold">{dashboard.inProgressProjects}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card shadow border-0 text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body text-center">
                                <h6 style={{ color: "#0c1629" }}>Total Tasks</h6>
                                <h2 className="fw-bold">{dashboard.totalTasks}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card shadow border-0 text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body text-center">
                                <h6 style={{ color: "#0c1629" }}>Completed Tasks</h6>
                                <h2 className="fw-bold">{dashboard.completedTasks}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card shadow border-0 text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body text-center">
                                <h6 style={{ color: "#0c1629" }}>Tasks Not Yet Started</h6>
                                <h2 className="fw-bold">{dashboard.pendingTasks}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="card shadow border-0 text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                            <div className="card-body text-center">
                                <h6 style={{ color: "#0c1629" }}>In Progress Tasks</h6>
                                <h2 className="fw-bold">{dashboard.inProgressTasks}</h2>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mt-5 g-4">

                    <div className="col-lg-4">
                        <div className="card shadow h-100 border-0">
                            <div className="card-header text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                                <h5 className="mb-0 fs-6 fw-bold">Project Status Chart</h5>
                            </div>
                            <div className="card-body" style={{ height: "280px", backgroundColor: "#ffffff" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={projectChartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={70}
                                            innerRadius={25}
                                            label
                                        >
                                            {projectChartData.map((item, index) => (
                                                <Cell key={index} fill={PIE_COLORS[index]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card shadow h-100 border-0">
                            <div className="card-header text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                                <h5 className="mb-0 fs-6 fw-bold">Task Status Chart</h5>
                            </div>
                            <div className="card-body" style={{ height: "280px", backgroundColor: "#ffffff" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={taskChartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={70}
                                            innerRadius={25}
                                            label
                                        >
                                            {taskChartData.map((item, index) => (
                                                <Cell key={index} fill={PIE_COLORS[index]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card shadow h-100 border-0">
                            <div className="card-header text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                                <h5 className="mb-0 fs-6 fw-bold">Task Usage & Completion</h5>
                            </div>
                            <div className="card-body" style={{ height: "280px", backgroundColor: "#ffffff" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={taskUsageCompletionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                        <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                                        <Tooltip />
                                        <Bar dataKey="tasks">
                                            {taskUsageCompletionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mt-5">

                    <div className="col-lg-6">

                        <div className="card shadow border-0">

                            <div className="card-header text-dark" style={{ backgroundColor: "#b5c1c8" }}>

                                <h5 className="mb-0">
                                    Project Summary
                                </h5>

                            </div>

                            <div className="card-body" style={{ backgroundColor: "#ffffff" }}>

                                <table className="table table-bordered">

                                    <tbody>

                                    <tr>
                                        <th>Total Projects</th>
                                        <td>{dashboard.totalProjects}</td>
                                    </tr>

                                    <tr>
                                        <th>Completed Projects</th>
                                        <td>{dashboard.completedProjects}</td>
                                    </tr>

                                    <tr>
                                        <th>Projects Not Yet Started</th>
                                        <td>{dashboard.pendingProjects}</td>
                                    </tr>

                                    <tr>
                                        <th>In Progress Projects</th>
                                        <td>{dashboard.inProgressProjects}</td>
                                    </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-6">

                        <div className="card shadow border-0">

                            <div className="card-header text-dark" style={{ backgroundColor: "#b5c1c8" }}>

                                <h5 className="mb-0">
                                    Task Summary
                                </h5>

                            </div>

                            <div className="card-body" style={{ backgroundColor: "#ffffff" }}>

                                <table className="table table-bordered">

                                    <tbody>

                                    <tr>
                                        <th>Total Tasks</th>
                                        <td>{dashboard.totalTasks}</td>
                                    </tr>

                                    <tr>
                                        <th>Completed Tasks</th>
                                        <td>{dashboard.completedTasks}</td>
                                    </tr>

                                    <tr>
                                        <th>Tasks Not Yet Started</th>
                                        <td>{dashboard.pendingTasks}</td>
                                    </tr>

                                    <tr>
                                        <th>In Progress Tasks</th>
                                        <td>{dashboard.inProgressTasks}</td>
                                    </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow mt-5 border-0">

                    <div className="card-header text-dark" style={{ backgroundColor: "#b5c1c8" }}>

                        <h5 className="mb-0">
                            Recent Tasks
                        </h5>

                    </div>

                    <div className="card-body table-responsive" style={{ backgroundColor: "#ffffff" }}>

                        <table className="table table-hover">

                            <thead>

                            <tr>

                                <th>Task</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Due Date</th>

                            </tr>

                            </thead>

                            <tbody>

                            {tasks.slice(0, 5).map(task => {
                                const isTaskCompleted = task.status === "COMPLETED" || task.status === "Completed";
                                return (
                                    <tr key={task.id}>

                                        <td>{task.title}</td>

                                        <td>
                                            {renderPriorityBadge(task.priority, isTaskCompleted)}
                                        </td>

                                        <td>
                                            {task.status === "PENDING"
                                                ? "Not yet started"
                                                : task.status === "IN_PROGRESS"
                                                    ? "In Progress"
                                                    : task.status}
                                        </td>

                                        <td>{task.dueDate || "N/A"}</td>

                                    </tr>
                                );
                            })}

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="row mt-5 mb-4">

                    <div className="col-lg-6">

                        <div className="card shadow border-0">

                            <div className="card-header text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                                <h5 className="mb-0">
                                    Upcoming High Priority Tasks
                                </h5>
                            </div>

                            <div className="card-body table-responsive" style={{ backgroundColor: "#ffffff" }}>

                                <table className="table table-striped">

                                    <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Priority</th>
                                        <th>Due Date</th>
                                    </tr>
                                    </thead>

                                    <tbody>

                                    {highPriorityTasks.length > 0 ? (

                                        highPriorityTasks.map(task => (

                                            <tr key={task.id}>
                                                <td>{task.title}</td>

                                                <td>
                                                    {renderPriorityBadge(task.priority, false)}
                                                </td>

                                                <td>{task.dueDate || "N/A"}</td>
                                            </tr>

                                        ))

                                    ) : (

                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                No High Priority Tasks
                                            </td>
                                        </tr>

                                    )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-6">

                        <div className="card shadow border-0">

                            <div className="card-header text-dark" style={{ backgroundColor: "#b5c1c8" }}>
                                <h5 className="mb-0">
                                    Upcoming High Priority Projects
                                </h5>
                            </div>

                            <div className="card-body table-responsive" style={{ backgroundColor: "#ffffff" }}>

                                <table className="table table-striped">

                                    <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Priority</th>
                                        <th>End Date</th>
                                    </tr>
                                    </thead>

                                    <tbody>

                                    {highPriorityProjects.length > 0 ? (

                                        highPriorityProjects.map(project => {
                                            const isProjCompleted = project.status === "COMPLETED" || project.status === "Completed";
                                            return (
                                                <tr key={project.id}>
                                                    <td>{project.projectName}</td>

                                                    <td>
                                                        {renderPriorityBadge(project.priority, isProjCompleted)}
                                                    </td>

                                                    <td>{project.endDate || "N/A"}</td>
                                                </tr>
                                            );
                                        })

                                    ) : (

                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                No High Priority Projects
                                            </td>
                                        </tr>

                                    )}

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

export default Dashboard;