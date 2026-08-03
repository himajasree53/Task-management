import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="app-layout">
            {/* Mobile Overlay */}
            {sidebarOpen && window.innerWidth < 992 && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={sidebarOpen ? "sidebar-open" : "sidebar-close"}>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div
                className={`main-content ${
                    sidebarOpen ? "content-shift" : "content-full"
                }`}
            >
                {/* Topbar */}
                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Page */}
                <main className="page-content">{children}</main>
            </div>
        </div>
    );
}

export default Layout;