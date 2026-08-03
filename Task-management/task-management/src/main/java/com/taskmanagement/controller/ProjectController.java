package com.taskmanagement.controller;

import com.taskmanagement.dto.ProjectRequest;
import com.taskmanagement.dto.ProjectStatsResponse;
import com.taskmanagement.entity.Project;
import com.taskmanagement.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public Project createProject(@RequestBody ProjectRequest request) {
        return projectService.createProject(request);
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/stats")
    public ProjectStatsResponse getProjectStats() {
        return projectService.getProjectStats();
    }

    @GetMapping("/high-priority")
    public List<Project> getHighPriorityProjects() {
        return projectService.getHighPriorityProjects();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectService.getProject(id);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id,
                                 @RequestBody ProjectRequest request) {
        return projectService.updateProject(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return "Project Deleted Successfully";
    }
}