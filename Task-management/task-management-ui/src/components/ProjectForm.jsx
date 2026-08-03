import { useState, useEffect } from "react";
import API from "../services/api";

function ProjectForm({ onSave, selectedProject }) {

    const [users, setUsers] = useState([]);

    const [project, setProject] = useState({
        projectName: "",
        description: "",
        status: "PENDING",
        priority: "LOW",
        startDate: "",
        endDate: "",
        memberIds: []
    });

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {

        if (selectedProject) {

            setProject({
                ...selectedProject,
                priority: selectedProject.priority || "LOW",
                memberIds:
                    selectedProject.members?.map(user => user.id) || []
            });

        }

    }, [selectedProject]);

    const loadUsers = async () => {

        try {

            const response = await API.get("/users");

            setUsers(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setProject({
            ...project,
            [e.target.name]: e.target.value
        });

    };

    const handleMembersChange = (e) => {

        const values = Array.from(
            e.target.selectedOptions,
            option => Number(option.value)
        );

        setProject({
            ...project,
            memberIds: values
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(project);

        setProject({
            projectName: "",
            description: "",
            status: "PENDING",
            priority: "LOW",
            startDate: "",
            endDate: "",
            memberIds: []
        });

    };

    return (

        <div className="card shadow">

            <div className="card-header">

                <h4>

                    {selectedProject
                        ? "Edit Project"
                        : "Add Project"}

                </h4>

            </div>

            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">

                            Project Name

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="projectName"
                            value={project.projectName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Description

                        </label>

                        <textarea
                            className="form-control"
                            rows="3"
                            name="description"
                            value={project.description}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">Status</label>

                        <select
                            className="form-select"
                            name="status"
                            value={project.status}
                            onChange={handleChange}
                        >

                            <option value="PENDING">
                                Not Yet Started
                            </option>

                            <option value="IN_PROGRESS">
                                In Progress
                            </option>

                            <option value="COMPLETED">
                                Completed
                            </option>

                        </select>

                    </div>

                    <div className="row mt-3">

                        <div className="col-md-6">

                            <label className="form-label">Start Date</label>

                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                value={project.startDate}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">End Date</label>

                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={project.endDate}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="mt-3">

                        <label className="form-label">

                            Assign Members

                        </label>

                        <select
                            multiple
                            className="form-select"
                            value={project.memberIds}
                            onChange={handleMembersChange}
                            style={{ height: "180px" }}
                        >

                            {users.map(user => (

                                <option
                                    key={user.id}
                                    value={user.id}
                                >

                                    {user.fullName} ({user.role})

                                </option>

                            ))}

                        </select>

                        <small className="text-muted">

                            Hold Ctrl (Windows) or Cmd (Mac) to select multiple users.

                        </small>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary mt-4"
                    >

                        {selectedProject
                            ? "Update Project"
                            : "Save Project"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default ProjectForm;