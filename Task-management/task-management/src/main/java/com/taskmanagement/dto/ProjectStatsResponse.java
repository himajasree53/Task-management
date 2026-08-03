package com.taskmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectStatsResponse {

    private long totalProjects;
    private long completedProjects;
    private long pendingProjects;
    private long inProgressProjects;

}