import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <Link className="navbar-brand" to="/dashboard">
                    Task Management
                </Link>

                <div className="navbar-nav">

                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>

                    <Link className="nav-link" to="/projects">
                        Projects
                    </Link>

                    <Link className="nav-link" to="/tasks">
                        Tasks
                    </Link>

                    <Link className="nav-link" to="/users">
                        Users
                    </Link>

                    <Link className="nav-link" to="/notifications">
                        Notifications
                    </Link>

                    <button
                        className="btn btn-danger ms-3"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;