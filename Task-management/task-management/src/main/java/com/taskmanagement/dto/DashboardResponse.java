package com.taskmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    // ==========================
    // Project Statistics
    // ==========================
    private long totalProjects;
    private long completedProjects;
    private long pendingProjects;
    private long inProgressProjects;

    // ==========================
    // Task Statistics
    // ==========================
    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
    private long inProgressTasks;

    // ==========================
    // Priority Statistics
    // ==========================
    private long highPriorityTasks;
    private long mediumPriorityTasks;
    private long lowPriorityTasks;

    // ==========================
    // User Statistics
    // ==========================
    private long totalUsers;
}