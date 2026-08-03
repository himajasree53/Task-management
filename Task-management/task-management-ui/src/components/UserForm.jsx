import { useEffect, useState } from "react";

function UserForm({ selectedUser, onSave }) {

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "USER",
        department: ""
    });

    useEffect(() => {

        if (selectedUser) {

            setUser({
                fullName: selectedUser.fullName || "",
                email: selectedUser.email || "",
                password: "",
                role: selectedUser.role || "USER",
                department: selectedUser.department || ""
            });

        }

    }, [selectedUser]);

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();
        onSave(user);

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label>Full Name</label>

                <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={user.fullName}
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
                    value={user.email}
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
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                />

            </div>

            <div className="row">

                <div className="col-md-6">

                    <label>Role</label>

                    <select
                        className="form-select"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUPERVISOR">SUPERVISOR</option>
                        <option value="USER">USER</option>
                    </select>

                </div>

                <div className="col-md-6">

                    <label>Department</label>

                    <input
                        type="text"
                        className="form-control"
                        name="department"
                        value={user.department}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <button
                type="submit"
                className="btn btn-primary mt-4"
            >
                Save User
            </button>

        </form>

    );

}

export default UserForm;