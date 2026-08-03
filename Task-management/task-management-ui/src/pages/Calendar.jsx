import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import API from "../services/api";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, Button, Form } from "react-bootstrap";

const localizer = momentLocalizer(moment);

function CalendarPage() {

    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);

    const [view, setView] = useState("month");
    const [date, setDate] = useState(new Date());

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "MEDIUM",
        status: "PENDING",
        dueDate: "",
        assignedUserId: ""
    });

    useEffect(() => {
        loadEvents();
        loadUsers();
    }, []);

    const loadEvents = async () => {
        try {
            const response = await API.get("/tasks");

            const data = response.data.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate,

                assignedUserId: task.assignedUser?.id || "",

                start: new Date(task.dueDate),
                end: new Date(task.dueDate)
            }));

            setEvents(data);

        } catch (err) {
            console.log(err);
        }
    };

    const loadUsers = async () => {
        try {
            const response = await API.get("/users");
            setUsers(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSelectSlot = ({ start }) => {
        setEditingId(null);

        setTask({
            title: "",
            description: "",
            priority: "MEDIUM",
            status: "PENDING",
            dueDate: moment(start).format("YYYY-MM-DD"),
            assignedUserId: ""
        });

        setShowModal(true);
    };

    const handleSelectEvent = (event) => {
        setEditingId(event.id);

        setTask({
            title: event.title,
            description: event.description,
            priority: event.priority,
            status: event.status,
            dueDate: event.dueDate,
            assignedUserId: event.assignedUserId
        });

        setShowModal(true);
    };

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const saveTask = async () => {
        if (task.title.trim() === "") {
            alert("Please enter title");
            return;
        }

        if (task.assignedUserId === "") {
            alert("Please select user");
            return;
        }

        try {
            const payload = {
                ...task,
                assignedUserId: Number(task.assignedUserId)
            };

            if (editingId) {
                await API.put(`/tasks/${editingId}`, payload);
            } else {
                await API.post("/tasks", payload);
            }

            setShowModal(false);
            setEditingId(null);

            loadEvents();

        } catch (err) {
            console.log(err);
            alert("Unable to save task");
        }
    };

    const deleteTask = async () => {
        if (!editingId) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/tasks/${editingId}`);

            setShowModal(false);
            setEditingId(null);

            loadEvents();

        } catch (err) {
            console.log(err);
            alert("Unable to delete task.");
        }
    };

    const eventStyleGetter = (event) => {
        return {
            style: {
                backgroundColor: "#b5c1c8",
                color: "#0c1629",
                borderRadius: "4px",
                border: "none",
                padding: "2px 5px",
                fontSize: "0.8rem",
                fontWeight: "600"
            }
        };
    };

    // Google Calendar style: Highlight today's entire cell background softly
    const dayPropGetter = (date) => {
        const today = new Date();
        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        if (isToday) {
            return {
                style: {
                    backgroundColor: "#e8eff2" // Soft Google Calendar-like highlight tone matching the theme
                }
            };
        }
        return {};
    };

    return (
        <Layout>
            {/* Custom CSS Overrides */}
            <style>{`
                .rbc-month-row {
                    min-height: 60px !important;
                }
                .rbc-date-cell {
                    padding-right: 8px !important;
                    padding-top: 4px !important;
                    font-size: 0.85rem;
                    color: #0c1629;
                }
                .rbc-header {
                    padding: 6px 0 !important;
                    font-size: 0.85rem;
                    background-color: #0c1629 !important;
                    color: #ffffff !important;
                }
                .rbc-row-content {
                    min-height: 50px !important;
                }
                .rbc-off-range-bg {
                    background-color: #e3e7e8;
                }
                .rbc-month-view, .rbc-time-view, .rbc-agenda-view {
                    border-color: #b5c1c8 !important;
                }
                .rbc-day-bg + .rbc-day-bg {
                    border-left: 1px solid #d6dce0;
                }
                .rbc-month-row + .rbc-month-row {
                    border-top: 1px solid #d6dce0;
                }

                /* Google Calendar style: Circular blue badge for today's date number */
                .rbc-today .rbc-button-link {
                    background-color: #0c1629 !important;
                    color: #ffffff !important;
                    border-radius: 50%;
                    width: 26px;
                    height: 26px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }

                .rbc-toolbar button {
                    background-color: #b5c1c8 !important;
                    border: 1px solid #b5c1c8 !important;
                    color: #0c1629 !important;
                    font-weight: 600;
                }
                .rbc-toolbar button.rbc-active {
                    background-color: #0c1629 !important;
                    color: #ffffff !important;
                    border-color: #0c1629 !important;
                }
                .rbc-toolbar button:hover {
                    background-color: #727a84 !important;
                    color: #ffffff !important;
                }
            `}</style>

            <div className="container-fluid" style={{ backgroundColor: "#f0f3f3", minHeight: "100vh", paddingBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
                <div className="pt-3 mb-4">
                    <h2 className="fw-bold" style={{ color: "#0c1629" }}>
                        Task Calendar
                    </h2>
                </div>

                <div
                    style={{
                        height: "520px",
                        background: "#d6dce0",
                        padding: "15px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                >
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"

                        selectable
                        popup

                        toolbar

                        view={view}
                        date={date}

                        views={{
                            month: true,
                            week: true,
                            day: true,
                            agenda: true
                        }}

                        onView={(newView) => setView(newView)}
                        onNavigate={(newDate) => setDate(newDate)}
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={handleSelectEvent}
                        eventPropGetter={eventStyleGetter}
                        dayPropGetter={dayPropGetter}

                        style={{
                            height: "100%",
                            color: "#0c1629"
                        }}
                    />
                </div>

                {/* Add / Edit Task Modal */}
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    centered
                >
                    <Modal.Header closeButton style={{ backgroundColor: "#0c1629", color: "#ffffff" }}>
                        <Modal.Title className="fw-bold">
                            {editingId ? "Edit Task" : "Add New Task"}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ backgroundColor: "#f0f3f3", color: "#0c1629" }}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={task.title}
                                    onChange={handleChange}
                                    placeholder="Enter task title"
                                    style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={task.description}
                                    onChange={handleChange}
                                    placeholder="Enter task description"
                                    style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Priority</Form.Label>
                                <Form.Select
                                    name="priority"
                                    value={task.priority}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                                >
                                    <option value="HIGH">High</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="LOW">Low</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={task.status}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Assign User</Form.Label>
                                <Form.Select
                                    name="assignedUserId"
                                    value={task.assignedUserId}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                                >
                                    <option value="">
                                        Select User
                                    </option>
                                    {users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.fullName}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Due Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dueDate"
                                    value={task.dueDate}
                                    onChange={handleChange}
                                    style={{ backgroundColor: "#ffffff", color: "#0c1629", borderColor: "#b5c1c8" }}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer style={{ backgroundColor: "#f0f3f3", borderTop: "1px solid #d6dce0" }}>
                        <Button
                            className="btn text-dark fw-bold"
                            style={{ backgroundColor: "#b5c1c8", border: "none" }}
                            onClick={() => {
                                setShowModal(false);
                                setEditingId(null);
                            }}
                        >
                            Cancel
                        </Button>

                        {editingId && (
                            <Button
                                className="btn text-dark fw-bold"
                                style={{ backgroundColor: "#b5c1c8", border: "none" }}
                                onClick={deleteTask}
                            >
                                Delete
                            </Button>
                        )}

                        <Button
                            className="btn text-white fw-bold"
                            style={{ backgroundColor: "#0c1629", border: "none" }}
                            onClick={saveTask}
                        >
                            {editingId ? "Update Task" : "Save Task"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Layout>
    );
}

export default CalendarPage;