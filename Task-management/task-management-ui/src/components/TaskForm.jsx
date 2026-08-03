import { useEffect, useState } from "react";
import API from "../services/api";

function TaskForm({ onSave, selectedTask }) {

    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "PENDING",
        priority: "LOW",
        dueDate: "",
        projectId: "",
        assignedUserId: ""
    });

    useEffect(() => {
        loadProjects();
        loadUsers();
    }, []);

    useEffect(() => {

        if (selectedTask) {

            setTask({
                title: selectedTask.title || "",
                description: selectedTask.description || "",
                status: selectedTask.status || "PENDING",
                priority: selectedTask.priority || "LOW",
                dueDate: selectedTask.dueDate || "",
                projectId: selectedTask.project?.id || "",
                assignedUserId: selectedTask.assignedUser?.id || ""
            });

        }

    }, [selectedTask]);

    const loadProjects = async () => {

        try {

            const response = await API.get("/projects");
            setProjects(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadUsers = async () => {

        try {

            const response = await API.get("/users");
            setUsers(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setTask({
            ...task,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(task);

        setTask({
            title: "",
            description: "",
            status: "PENDING",
            priority: "LOW",
            dueDate: "",
            projectId: "",
            assignedUserId: ""
        });

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label className="form-label">

                    Title

                </label>

                <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">

                    Description

                </label>

                <textarea
                    rows="3"
                    className="form-control"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                />

            </div>

            <div className="row">

                <div className="col-md-6 mb-3">

                    <label className="form-label">

                        Status

                    </label>

                    <select
                        className="form-select"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                    >

                        <option value="PENDING">
                            Not yet started
                        </option>

                        <option value="IN_PROGRESS">
                            In Progress
                        </option>

                        <option value="COMPLETED">
                            Completed
                        </option>

                    </select>

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">

                        Due Date

                    </label>

                    <input
                        type="date"
                        className="form-control"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <div className="row">

                <div className="col-md-6 mb-3">

                    <label className="form-label">

                        Project

                    </label>

                    <select
                        className="form-select"
                        name="projectId"
                        value={task.projectId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Project
                        </option>

                        {projects.map(project => (

                            <option
                                key={project.id}
                                value={project.id}
                            >

                                {project.projectName}

                            </option>

                        ))}

                    </select>

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">

                        Assign User

                    </label>

                    <select
                        className="form-select"
                        name="assignedUserId"
                        value={task.assignedUserId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select User
                        </option>

                        {users.map(user => (

                            <option
                                key={user.id}
                                value={user.id}
                            >

                                {user.fullName}

                            </option>

                        ))}

                    </select>

                </div>

            </div>

            <button
                type="submit"
                className="btn btn-primary mt-3"
            >

                {selectedTask
                    ? "Update Task"
                    : "Save Task"}

            </button>

        </form>

    );

}

export default TaskForm;