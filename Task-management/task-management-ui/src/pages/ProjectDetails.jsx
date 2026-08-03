import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/projectService";
import { getTasksByProject } from "../services/taskService";

function ProjectDetails() {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadProject();
        loadTasks();
    }, [id]);

    const loadProject = async () => {
        try {
            const res = await getProjectById(id);
            setProject(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadTasks = async () => {
        try {
            const res = await getTasksByProject(id);
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!project) {
        return (
            <div className="container mt-4">
                <h4>Loading...</h4>
            </div>
        );
    }

    const isCompleted = project.status === "COMPLETED" || project.status === "Completed";

    return (
        <div className="container-fluid mt-4">

            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">{project.projectName}</h3>
                </div>

                <div className="card-body">

                    <p>
                        <strong>Description:</strong> {project.description || "No description provided."}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        <span
                            className={
                                isCompleted
                                    ? "badge bg-success"
                                    : project.status === "IN_PROGRESS" || project.status === "In Progress"
                                        ? "badge bg-warning text-dark"
                                        : "badge bg-secondary"
                            }
                        >
                            {project.status === "PENDING"
                                ? "Not Yet Started"
                                : project.status === "IN_PROGRESS"
                                    ? "In Progress"
                                    : project.status}
                        </span>
                    </p>

                    <p>
                        <strong>Priority:</strong>{" "}
                        {isCompleted || !project.priority ? (
                            <span className="text-muted">N/A (Completed)</span>
                        ) : (
                            <span
                                className={
                                    project.priority === "HIGH"
                                        ? "badge bg-danger"
                                        : project.priority === "MEDIUM"
                                            ? "badge bg-warning text-dark"
                                            : "badge bg-info text-dark"
                                }
                            >
                                {project.priority}
                            </span>
                        )}
                    </p>

                    <p>
                        <strong>Start Date:</strong> {project.startDate || "N/A"}
                    </p>

                    <p>
                        <strong>End Date:</strong> {project.endDate || "N/A"}
                    </p>

                </div>
            </div>

            <div className="card shadow">

                <div className="card-header bg-warning">
                    <h3 className="mb-0 text-dark">Project Tasks</h3>
                </div>

                <div className="card-body">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">
                        <tr>
                            <th>Task</th>
                            <th>Assigned User</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>

                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>
                                        {task.assignedUser
                                            ? task.assignedUser.fullName
                                            : "Not Assigned"}
                                    </td>
                                    <td>
                                        <span
                                            className={
                                                task.status === "COMPLETED" || task.status === "Completed"
                                                    ? "badge bg-success"
                                                    : task.status === "IN_PROGRESS" || task.status === "In Progress"
                                                        ? "badge bg-warning text-dark"
                                                        : "badge bg-secondary"
                                            }
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No Tasks Found
                                </td>
                            </tr>
                        )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default ProjectDetails;