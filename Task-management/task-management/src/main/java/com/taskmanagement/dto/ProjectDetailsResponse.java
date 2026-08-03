package com.taskmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDetailsResponse {

    private Long id;

    private String projectName;

    private String description;

    private String status;

    private String priority;

    private LocalDate startDate;

    private LocalDate endDate;

    private List<UserResponse> members;

    private List<TaskResponse> tasks;

    private long totalTasks;

    private long completedTasks;

    private long pendingTasks;

    private long inProgressTasks;
}