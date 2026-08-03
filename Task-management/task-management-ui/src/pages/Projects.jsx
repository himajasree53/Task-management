import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import ProjectForm from "../components/ProjectForm";


function Projects() {

    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const response = await API.get("/projects");
            setProjects(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProject = async (id) => {

        if (!window.confirm("Are you sure you want to delete this project?"))
            return;

        try {

            await API.delete(`/projects/${id}`);

            loadProjects();

        } catch (error) {

            console.log(error);

        }
    };

    // --------------------
    // ADD PROJECT
    // --------------------

    const openAddModal = () => {

        setSelectedProject(null);

        setShowModal(true);

    };

    // --------------------
    // EDIT PROJECT
    // --------------------

    const openEditModal = (project) => {

        setSelectedProject(project);

        setShowModal(true);

    };

    // --------------------
    // SAVE PROJECT
    // --------------------

    const saveProject = async (project) => {

        try {

            if (selectedProject) {

                await API.put(
                    `/projects/${selectedProject.id}`,
                    project
                );

            } else {

                await API.post(
                    "/projects",
                    project
                );

            }

            setShowModal(false);
            setSelectedProject(null);

            if (selectedProject) {
                setMessage("✅ Project updated successfully!");
            } else {
                setMessage("✅ Project added successfully!");
            }

            loadProjects();

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } catch (error) {

            console.log(error);

        }

    };

    const closeModal = () => {

        setShowModal(false);

        setSelectedProject(null);

    };

    // --------------------
    // PRIORITY BADGE
    // --------------------

    const renderPriorityBadge = (priorityStr, completed) => {

        if (completed || !priorityStr) {

            return (
                <span className="text-muted">
                    N/A
                </span>
            );

        }

        const priority = priorityStr.toUpperCase();

        let bg = "#f0f3f3";

        if (priority === "HIGH")
            bg = "#b5c1c8";

        if (priority === "MEDIUM")
            bg = "#d6dce0";

        return (

            <span
                className="badge"
                style={{
                    backgroundColor: bg,
                    color: "#0c1629",
                    minWidth: "75px"
                }}
            >

                {priority}

            </span>

        );

    };

    // --------------------
    // STATUS BADGE
    // --------------------

    const renderStatusBadge = (status) => {

        if (!status) return null;

        status = status.toUpperCase();

        let label = status;

        if (status === "PENDING")
            label = "Not Yet Started";

        if (status === "IN_PROGRESS")
            label = "In Progress";

        if (status === "COMPLETED")
            label = "Completed";

        return (

            <span
                className="badge"
                style={{
                    backgroundColor: "#b5c1c8",
                    color: "#0c1629",
                    minWidth: "120px"
                }}
            >

                {label}

            </span>

        );

    };

    const filteredProjects = projects.filter(project =>

        project.projectName
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        project.description
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <Layout>

            <div
                className="container-fluid"
                style={{
                    backgroundColor: "#f0f3f3",
                    minHeight: "100vh",
                    paddingBottom: "30px"
                }}
            >

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2
                        className="fw-bold"
                        style={{ color: "#0c1629" }}
                    >
                        Project Management
                    </h2>

                    <button
                        className="btn text-white fw-bold"
                        style={{ backgroundColor: "#0c1629" }}
                        onClick={openAddModal}
                    >
                        + Add Project
                    </button>

                </div>

                <div className="mb-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Project..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        style={{
                            maxWidth:"400px",
                            background:"#fff",
                            color:"#0c1629"
                        }}
                    />

                </div>

                <div className="card shadow border-0">

                    <div className="card-body table-responsive p-0">

                        <table
                            className="table table-hover mb-0"
                        >

                            <thead>

                            <tr
                                style={{
                                    background:"#0c1629",
                                    color:"#fff"
                                }}
                            >

                                <th>ID</th>
                                <th>Project</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Members</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th width="220">
                                    Action
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {

                                filteredProjects.length>0 ?

                                    filteredProjects.map(project=>{

                                        const completed =
                                            project.status==="COMPLETED";

                                        return(

                                            <tr key={project.id}>

                                                <td>{project.id}</td>

                                                <td>

                                                    <strong>

                                                        {project.projectName}

                                                    </strong>

                                                </td>

                                                <td>

                                                    {project.description}

                                                </td>

                                                <td>

                                                    {renderStatusBadge(project.status)}

                                                </td>

                                                <td>

                                                    {renderPriorityBadge(
                                                        project.priority,
                                                        completed
                                                    )}

                                                </td>

                                                <td>

                                                    {

                                                        project.members &&
                                                        project.members.length>0

                                                            ?

                                                            project.members
                                                                .map(m=>m.fullName)
                                                                .join(", ")

                                                            :

                                                            "N/A"

                                                    }

                                                </td>

                                                <td>

                                                    {project.startDate || "N/A"}

                                                </td>

                                                <td>

                                                    {project.endDate || "N/A"}

                                                </td>

                                                <td>

                                                    <div
                                                        className="d-flex gap-2"
                                                    >

                                                        <Link
                                                            to={`/projects/view/${project.id}`}
                                                            className="btn btn-sm"
                                                            style={{
                                                                background:"#b5c1c8",
                                                                color:"#0c1629"
                                                            }}
                                                        >

                                                            View

                                                        </Link>

                                                        <button
                                                            className="btn btn-sm"
                                                            style={{
                                                                background:"#d6dce0",
                                                                color:"#0c1629"
                                                            }}
                                                            onClick={()=>
                                                                openEditModal(project)
                                                            }
                                                        >

                                                            Edit

                                                        </button>

                                                        <button
                                                            className="btn btn-sm"
                                                            style={{
                                                                background:"#dc3545",
                                                                color:"#fff"
                                                            }}
                                                            onClick={()=>
                                                                deleteProject(project.id)
                                                            }
                                                        >

                                                            Delete

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )

                                    })

                                    :

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="text-center p-4"
                                        >

                                            No Projects Found

                                        </td>

                                    </tr>

                            }

                            </tbody>

                        </table>

                    </div>

                </div>
                {/* Add / Edit Project Modal */}
                {showModal && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="modal-backdrop fade show"
                            onClick={closeModal}
                        ></div>

                        {/* Modal */}
                        <div
                            className="modal fade show"
                            style={{ display: "block" }}
                            tabIndex="-1"
                        >
                            <div className="modal-dialog modal-xl modal-dialog-centered">
                                <div
                                    className="modal-content"
                                    style={{
                                        borderRadius: "12px",
                                        border: "none"
                                    }}
                                >
                                    <div
                                        className="modal-header"
                                        style={{
                                            backgroundColor: "#0c1629",
                                            color: "#fff"
                                        }}
                                    >
                                        <h5 className="modal-title">
                                            {selectedProject
                                                ? "Edit Project"
                                                : "Add Project"}
                                        </h5>

                                        <button
                                            type="button"
                                            className="btn-close btn-close-white"
                                            onClick={closeModal}
                                        ></button>
                                    </div>

                                    <div
                                        className="modal-body"
                                        style={{
                                            backgroundColor: "#f8f9fa"
                                        }}
                                    >
                                        <ProjectForm
                                            selectedProject={selectedProject}
                                            onSave={saveProject}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </Layout>
    );

}

export default Projects;