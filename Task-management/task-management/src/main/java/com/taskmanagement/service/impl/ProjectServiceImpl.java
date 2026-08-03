package com.taskmanagement.service.impl;

import com.taskmanagement.dto.ProjectRequest;
import com.taskmanagement.dto.ProjectStatsResponse;
import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.User;
import com.taskmanagement.exception.ResourceNotFoundException;
import com.taskmanagement.repository.ProjectRepository;
import com.taskmanagement.repository.UserRepository;
import com.taskmanagement.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository,
                              UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Project createProject(ProjectRequest request) {

        List<User> members = userRepository.findAllById(request.getMemberIds());

        Project project = Project.builder()
                .projectName(request.getProjectName())
                .description(request.getDescription())
                .status(request.getStatus())
                .priority(request.getPriority())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .members(members)
                .build();

        return projectRepository.save(project);
    }

    @Override
    public List<Project> getAllProjects() {
        List<Project> projects = projectRepository.findAll();

        // Sort: Moves COMPLETED projects to the end of the list
        return projects.stream()
                .sorted(Comparator.comparing(p ->
                        "COMPLETED".equalsIgnoreCase(p.getStatus()) ? 1 : 0
                ))
                .collect(Collectors.toList());
    }

    @Override
    public Project getProject(Long id) {

        return projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Project not found with id : " + id));
    }

    @Override
    public List<Project> getHighPriorityProjects() {
        // Filter projects in memory so calculated dynamic HIGH priority is respected
        return projectRepository.findAll().stream()
                .filter(p -> "HIGH".equalsIgnoreCase(p.getPriority()))
                .sorted(Comparator.comparing(Project::getEndDate, Comparator.nullsLast(Comparator.naturalOrder())))
                .collect(Collectors.toList());
    }

    @Override
    public Project updateProject(Long id, ProjectRequest request) {

        Project project = getProject(id);

        List<User> members = userRepository.findAllById(request.getMemberIds());

        project.setProjectName(request.getProjectName());
        project.setDescription(request.getDescription());
        project.setStatus(request.getStatus());
        project.setPriority(request.getPriority());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());
        project.setMembers(members);

        return projectRepository.save(project);
    }

    @Override
    public void deleteProject(Long id) {

        Project project = getProject(id);

        projectRepository.delete(project);
    }

    @Override
    public ProjectStatsResponse getProjectStats() {

        long total = projectRepository.count();

        long completed = projectRepository.countByStatus("COMPLETED");

        long pending = projectRepository.countByStatus("PENDING");

        long progress = projectRepository.countByStatus("IN_PROGRESS");

        return ProjectStatsResponse.builder()
                .totalProjects(total)
                .completedProjects(completed)
                .pendingProjects(pending)
                .inProgressProjects(progress)
                .build();
    }
}