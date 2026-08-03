import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/authService";
import mitsLogo from "../assets/img.png";

function Login() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(credentials);

            console.log("Login Response:", response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("userId", response.data.id);

            toast.success("Login Successful!");

            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(
                error.response?.data?.message || "Invalid Email or Password"
            );
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "#17375E",
            }}
        >
            <div
                className="card shadow-lg border-0"
                style={{
                    width: "650px",
                    borderRadius: "20px",
                    padding: "40px",
                }}
            >
                {/* Logo */}
                <div className="text-center mb-3">
                    <img
                        src={mitsLogo}
                        alt="MITS Logo"
                        style={{
                            width: "130px",
                            height: "130px",
                            objectFit: "contain",
                        }}
                    />
                </div>

                {/* Heading */}
                <h1
                    className="text-center fw-bold"
                    style={{
                        color: "#2563eb",
                        fontSize: "2.4rem",
                    }}
                >
                    Welcome back, MITS!
                </h1>

                <p
                    className="text-center text-muted mb-4"
                    style={{
                        fontSize: "1.15rem",
                    }}
                >
                    Sign in to manage projects, tasks, team members and
                    deadlines.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg"
                            placeholder="Enter your email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 btn-lg fw-bold"
                    >
                        Login
                    </button>
                </form>

                <hr className="my-4" />

                <div className="text-center">
                    <span className="text-muted">
                        Don't have an account?{" "}
                    </span>

                    <Link
                        to="/register"
                        className="fw-bold text-decoration-none"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;