import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function ProjectStatusChart({ stats = {} }) {

    const data = {
        labels: ["Completed", "Not Yet Started", "In Progress"],
        datasets: [
            {
                label: "Projects",
                data: [
                    stats.completedProjects || 0,
                    stats.pendingProjects || 0,
                    stats.inProgressProjects || 0
                ],
                backgroundColor: [
                    "#198754", // Completed - Green
                    "#6c757d", // Pending / Not Started - Gray
                    "#ffc107"  // In Progress - Yellow
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    };

    return (
        <div className="card shadow mt-4">

            <div className="card-body">

                <h4>Project Status</h4>

                <Bar
                    data={data}
                    options={options}
                />

            </div>

        </div>
    );
}

export default ProjectStatusChart;