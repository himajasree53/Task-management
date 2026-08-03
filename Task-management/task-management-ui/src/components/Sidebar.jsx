import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
    FaTachometerAlt,
    FaProjectDiagram,
    FaTasks,
    FaUsers,
    FaBell,
    FaFolderOpen,
    FaHistory,
    FaUser,
    FaSignOutAlt,
    FaChartBar,
    FaCalendarAlt
} from "react-icons/fa";

function Sidebar() {

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <div className="sidebar">

            <div className="sidebar-top">

                <h2
                    className="text-white fw-bold text-center"
                    style={{ fontSize: "28px" }}
                >
                    TaskFlow

                </h2>

                <div className="sidebar-menu">

                    <NavLink to="/dashboard">
                        <FaTachometerAlt /> Dashboard
                    </NavLink>

                    <NavLink to="/projects">
                        <FaProjectDiagram /> Projects
                    </NavLink>

                    <NavLink to="/tasks">
                        <FaTasks /> Tasks
                    </NavLink>

                    <NavLink to="/reports">
                        <FaChartBar /> Reports
                    </NavLink>

                    <NavLink to="/calendar">
                        <FaCalendarAlt /> Calendar
                    </NavLink>

                    <NavLink to="/users">
                        <FaUsers /> Users
                    </NavLink>

                    <NavLink to="/notifications">
                        <FaBell /> Notifications
                    </NavLink>

                    <NavLink to="/logs">
                        <FaHistory /> Activity Logs
                    </NavLink>

                    <NavLink to="/profile">
                        <FaUser /> Profile
                    </NavLink>

                </div>

            </div>

            <button
                className="logout-btn"
                onClick={logout}
            >
                <FaSignOutAlt /> Logout
            </button>

        </div>
    );
}

export default Sidebar;