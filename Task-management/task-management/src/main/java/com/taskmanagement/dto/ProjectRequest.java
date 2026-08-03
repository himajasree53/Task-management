package com.taskmanagement.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ProjectRequest {

    private String projectName;
    private String description;
    private String status;
    private String priority;
    private LocalDate startDate;
    private LocalDate endDate;

    // Selected User IDs
    private List<Long> memberIds;
}