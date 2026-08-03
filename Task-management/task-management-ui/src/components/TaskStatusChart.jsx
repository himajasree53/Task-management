import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function TaskStatusChart({ stats }) {

    const data = {
        labels: [
            "Completed",
            "Not yet started",
            "In Progress"
        ],
        datasets: [
            {
                label: "Tasks",
                data: [
                    stats.completedTasks,
                    stats.pendingTasks,
                    stats.inProgressTasks
                ],
                backgroundColor: [
                    "#198754", // Completed
                    "#716b6c", // Not yet started
                    "#ffc107"  // In Progress
                ],
                borderColor: [
                    "#ffffff",
                    "#ffffff",
                    "#ffffff"
                ],
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    return (
        <div className="card shadow mt-4">

            <div className="card-body">

                <h4>Task Status</h4>

                <Pie
                    data={data}
                    options={options}
                />

            </div>

        </div>
    );
}

export default TaskStatusChart;