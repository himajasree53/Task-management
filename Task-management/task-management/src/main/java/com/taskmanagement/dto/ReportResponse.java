package com.taskmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponse {

    private Long totalProjects;
    private Long completedProjects;
    private Long inProgressProjects;
    private Long pendingProjects;

    private Long totalTasks;
    private Long completedTasks;
    private Long pendingTasks;

    private Long highPriorityTasks;
    private Long mediumPriorityTasks;
    private Long lowPriorityTasks;

}