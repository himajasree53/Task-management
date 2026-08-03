import mitsuLogo from "../assets/img.png";

function Topbar({ sidebarOpen, setSidebarOpen }) {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    return (
        <div
            className="topbar shadow-sm bg-white d-flex align-items-center justify-content-between px-4"
            style={{ height: "90px" }}
        >
            {/* Mobile Menu */}
            <button
                className="btn btn-outline-primary d-lg-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>

            {/* Left Section - Logo + Title */}
            <div className="d-flex align-items-center flex-grow-1">

                <img
                    src={mitsuLogo}
                    alt="MITS Logo"
                    style={{
                        width: "65px",      // Increase size here
                        height: "65px",
                        objectFit: "contain",
                        marginRight: "18px"
                    }}
                />

                <h3
                    className="fw-bold mb-0"
                    style={{ color: "#222" }}
                >
                    Task and Project Management System
                </h3>

            </div>

            {/* User Profile */}
            <div
                className="d-flex align-items-center px-4 py-2"
                style={{
                    borderRadius: "50px",
                    background: "#fff",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.12)"
                }}
            >
                <i
                    className="bi bi-person-circle"
                    style={{
                        fontSize: "3rem",
                        color: "#222",
                        marginRight: "15px"
                    }}
                ></i>

                <div>
                    <h5 className="mb-0 fw-bold">
                        {email}
                    </h5>

                    <small className="text-muted">
                        {(role || "").replace("ROLE_", "")}
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Topbar;