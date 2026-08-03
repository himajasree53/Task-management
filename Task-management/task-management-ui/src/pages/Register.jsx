import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import mitsuLogo from "../assets/img.png";


function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "USER"
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await register(form);

            alert("Registration Successful");

            navigate("/");

        } catch (err) {

            alert("Registration Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">

                                Register

                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>Full Name</label>

                                    <input
                                        className="form-control"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Role</label>

                                    <select
                                        className="form-control"
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                    >
                                        <option value="USER">USER</option>
                                        <option value="SUPERVISOR">SUPERVISOR</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    Register
                                </button>

                            </form>

                            <p className="text-center mt-3">

                                Already have an account?

                                <Link to="/">
                                    {" "}Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;