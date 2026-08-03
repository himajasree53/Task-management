package com.taskmanagement.service;

import com.taskmanagement.dto.ProjectRequest;
import com.taskmanagement.dto.ProjectStatsResponse;
import com.taskmanagement.entity.Project;

import java.util.List;

public interface ProjectService {

    Project createProject(ProjectRequest request);

    List<Project> getAllProjects();

    Project getProject(Long id);

    Project updateProject(Long id, ProjectRequest request);

    void deleteProject(Long id);

    ProjectStatsResponse getProjectStats();

    // NEW: Get all high priority projects
    List<Project> getHighPriorityProjects();
}