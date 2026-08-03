import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    searchTasks
} from "../services/taskService";

function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {

        setLoading(true);

        try {

            const response = await getTasks();
            setTasks(response.data);

        } catch (error) {

            console.log(error);
            toast.error("Failed to load tasks!");

        } finally {

            setLoading(false);

        }

    };

    const saveTask = async (task) => {

        try {

            if (selectedTask) {

                await updateTask(selectedTask.id, task);
                toast.success("Task updated successfully!");

            } else {

                await createTask(task);
                toast.success("Task created successfully!");

            }

            setSelectedTask(null);
            setShowForm(false);

            loadTasks();

        } catch (error) {

            console.log(error);
            toast.error("Something went wrong!");

        }

    };

    const editTask = (task) => {

        setSelectedTask(task);
        setShowForm(true);

    };

    const removeTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {

            await deleteTask(id);

            toast.success("Task deleted successfully!");

            loadTasks();

        } catch (error) {

            console.log(error);
            toast.error("Unable to delete task!");

        }

    };

    const handleSearch = async () => {

        if (keyword.trim() === "") {

            loadTasks();
            return;

        }

        try {

            const response = await searchTasks(keyword);

            setTasks(response.data);

        } catch (error) {

            console.log(error);
            toast.error("Search failed!");

        }

    };

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
                    backgroundColor: priority === "HIGH" ? "#b5c1c8" : priority === "MEDIUM" ? "#d6dce0" : "#f0f3f3",
                    color: "#0c1629"
                }}
            >
                {priority}
            </span>
        );
    };

    const renderStatusBadge = (statusStr) => {
        let bg = "#b5c1c8";
        let text = "#0c1629";
        let label = statusStr;

        const isCompleted = statusStr === "COMPLETED" || statusStr === "Completed";
        const isInProgress = statusStr === "IN_PROGRESS" || statusStr === "In Progress";

        if (isCompleted) {
            label = "Completed";
        } else if (isInProgress) {
            label = "In Progress";
        } else {
            label = "Not Yet Started";
        }

        return (
            <span
                className="badge text-center"
                style={{
                    backgroundColor: bg,
                    color: text,
                    minWidth: "115px",
                    display: "inline-block"
                }}
            >
                {label}
            </span>
        );
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

    // Ensure completed tasks sit at the bottom of the table
    const sortedTasks = [...tasks].sort((a, b) => {
        const isACompleted = a.status === "COMPLETED" || a.status === "Completed";
        const isBCompleted = b.status === "COMPLETED" || b.status === "Completed";

        if (isACompleted && !isBCompleted) return 1;
        if (!isACompleted && isBCompleted) return -1;
        return 0;
    });

    return (

        <Layout>

            <div className="container-fluid" style={{ backgroundColor: "#f0f3f3", minHeight: "100vh", paddingBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }}>

                <div className="d-flex justify-content-between align-items-center mb-4 pt-3">

                    <h2 className="fw-bold" style={{ color: "#0c1629" }}>Task Management</h2>

                    <button
                        className="btn text-white fw-bold"
                        style={{ backgroundColor: "#0c1629" }}
                        onClick={() => {
                            setSelectedTask(null);
                            setShowForm(true);
                        }}
                    >
                        + Add Task
                    </button>

                </div>

                <div className="row mb-4 align-items-center">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Task..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
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
                                setKeyword("");
                                loadTasks();
                            }}
                        >
                            Refresh
                        </button>

                    </div>

                </div>

                {showForm && (

                    <div className="modal d-block">

                        <div className="modal-dialog modal-lg">

                            <div className="modal-content">

                                <div className="modal-header" style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>

                                    <h5 className="modal-title">

                                        {selectedTask
                                            ? "Edit Task"
                                            : "Add Task"}

                                    </h5>

                                    <button
                                        className="btn-close btn-close-white"
                                        onClick={() => {

                                            setShowForm(false);
                                            setSelectedTask(null);

                                        }}
                                    ></button>

                                </div>

                                <div className="modal-body" style={{ backgroundColor: "#f0f3f3" }}>

                                    <TaskForm
                                        selectedTask={selectedTask}
                                        onSave={saveTask}
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
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Title</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Project</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Assigned User</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Status</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Priority</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>Due Date</th>
                                <th style={{ backgroundColor: "#0c1629", color: "#ffffff" }} width="180">Action</th>

                            </tr>

                            </thead>

                            <tbody>

                            {sortedTasks.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center py-4"
                                        style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}
                                    >
                                        No Tasks Found
                                    </td>

                                </tr>

                            ) : (

                                sortedTasks.map(task => {
                                    const isCompleted = task.status === "COMPLETED" || task.status === "Completed";

                                    return (

                                        <tr key={task.id} style={{ backgroundColor: "#d6dce0" }}>

                                            <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{task.id}</td>

                                            <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }} className="fw-semibold">{task.title}</td>

                                            <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{task.project?.projectName || task.projectName || "N/A"}</td>

                                            <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{task.assignedUser?.fullName || task.userName || "Unassigned"}</td>

                                            <td style={{ backgroundColor: "#d6dce0" }}>
                                                {renderStatusBadge(task.status)}
                                            </td>

                                            <td style={{ backgroundColor: "#d6dce0" }}>
                                                {renderPriorityBadge(task.priority, isCompleted)}
                                            </td>

                                            <td style={{ backgroundColor: "#d6dce0", color: "#0c1629" }}>{task.dueDate || "N/A"}</td>

                                            <td style={{ backgroundColor: "#d6dce0" }}>

                                                <div className="d-flex gap-1">
                                                    <button
                                                        className="btn btn-sm text-dark fw-bold"
                                                        style={{ backgroundColor: "#b5c1c8" }}
                                                        onClick={() => editTask(task)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-sm text-dark fw-bold"
                                                        style={{ backgroundColor: "#b5c1c8" }}
                                                        onClick={() => removeTask(task.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>

                                            </td>

                                        </tr>

                                    );
                                })

                            )}

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>

        </Layout>

    );

}

export default Tasks;