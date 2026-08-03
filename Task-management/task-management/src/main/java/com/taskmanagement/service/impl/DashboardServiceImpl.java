package com.taskmanagement.service.impl;

import com.taskmanagement.dto.DashboardResponse;
import com.taskmanagement.repository.ProjectRepository;
import com.taskmanagement.repository.TaskRepository;
import com.taskmanagement.repository.UserRepository;
import com.taskmanagement.service.DashboardService;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public DashboardServiceImpl(TaskRepository taskRepository,
                                UserRepository userRepository,
                                ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public DashboardResponse getDashboard() {

        // ==========================
        // Project Statistics
        // ==========================
        long totalProjects = projectRepository.count();

        long completedProjects =
                projectRepository.findByStatus("COMPLETED").size();

        long pendingProjects =
                projectRepository.findByStatus("PENDING").size();

        long inProgressProjects =
                projectRepository.findByStatus("IN_PROGRESS").size();

        // ==========================
        // Task Statistics
        // ==========================
        long totalTasks = taskRepository.count();

        long completedTasks =
                taskRepository.findByStatus("COMPLETED").size();

        long pendingTasks =
                taskRepository.findByStatus("PENDING").size();

        long inProgressTasks =
                taskRepository.findByStatus("IN_PROGRESS").size();

        // ==========================
        // Priority Statistics
        // ==========================
        long highPriorityTasks =
                taskRepository.countByPriority("HIGH");

        long mediumPriorityTasks =
                taskRepository.countByPriority("MEDIUM");

        long lowPriorityTasks =
                taskRepository.countByPriority("LOW");

        // ==========================
        // Users
        // ==========================
        long totalUsers = userRepository.count();

        return DashboardResponse.builder()

                // Project Statistics
                .totalProjects(totalProjects)
                .completedProjects(completedProjects)
                .pendingProjects(pendingProjects)
                .inProgressProjects(inProgressProjects)

                // Task Statistics
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .pendingTasks(pendingTasks)
                .inProgressTasks(inProgressTasks)

                // Priority Statistics
                .highPriorityTasks(highPriorityTasks)
                .mediumPriorityTasks(mediumPriorityTasks)
                .lowPriorityTasks(lowPriorityTasks)

                // User Statistics
                .totalUsers(totalUsers)

                .build();
    }
}