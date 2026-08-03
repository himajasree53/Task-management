import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Notifications from "./pages/Notifications";
import ActivityLogs from "./pages/ActivityLogs";
import Profile from "./pages/Profile";
import Report from "./pages/Report";
import CalendarPage from "./pages/Calendar";
import ProjectDetails from "./pages/ProjectDetails";

import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            {/* Projects */}
            <Route
                path="/projects"
                element={
                    <PrivateRoute>
                        <Projects />
                    </PrivateRoute>
                }
            />

            {/* Project Details */}
            <Route
                path="/projects/view/:id"
                element={
                    <PrivateRoute>
                        <ProjectDetails />
                    </PrivateRoute>
                }
            />

            {/* Tasks */}
            <Route
                path="/tasks"
                element={
                    <PrivateRoute>
                        <Tasks />
                    </PrivateRoute>
                }
            />

            {/* Calendar */}
            <Route
                path="/calendar"
                element={
                    <PrivateRoute>
                        <CalendarPage />
                    </PrivateRoute>
                }
            />

            {/* Notifications */}
            <Route
                path="/notifications"
                element={
                    <PrivateRoute>
                        <Notifications />
                    </PrivateRoute>
                }
            />

            {/* Profile */}
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />

            {/* Admin / Manager */}
            <Route
                path="/users"
                element={
                    <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
                        <Users />
                    </PrivateRoute>
                }
            />

            <Route
                path="/reports"
                element={
                    <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}>
                        <Report />
                    </PrivateRoute>
                }
            />

            {/* Admin */}
            <Route
                path="/logs"
                element={
                    <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                        <ActivityLogs />
                    </PrivateRoute>
                }
            />

            {/* 404 */}
            <Route
                path="*"
                element={
                    <div className="container mt-5 text-center">
                        <h2>404 - Page Not Found</h2>
                    </div>
                }
            />

        </Routes>
    );
}

export default App;