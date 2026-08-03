package com.taskmanagement.controller;

import com.taskmanagement.dto.TaskRequest;
import com.taskmanagement.dto.TaskStatsResponse;
import com.taskmanagement.entity.Task;
import com.taskmanagement.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Task createTask(@RequestBody TaskRequest request) {
        return taskService.createTask(request);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public TaskStatsResponse getTaskStats() {
        return taskService.getTaskStats();
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Task> searchTasks(@RequestParam String keyword) {
        return taskService.searchTasks(keyword);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Task> getTasksByStatus(@PathVariable String status) {
        return taskService.getTasksByStatus(status);
    }

    @GetMapping("/priority/{priority}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Task> getTasksByPriority(@PathVariable String priority) {
        return taskService.getTasksByPriority(priority);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Task> getTasksByUser(@PathVariable Long userId) {
        return taskService.getTasksByUser(userId);
    }

    @GetMapping("/project/{projectId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Task> getTasksByProject(@PathVariable Long projectId) {
        return taskService.getTasksByProject(projectId);
    }

    // Pagination
    @GetMapping("/page")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public Page<Task> getTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy) {

        return taskService.getTasks(page, size, sortBy);
    }

    // Sorting
    @GetMapping("/sort/{field}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Task> sortTasks(@PathVariable String field) {
        return taskService.sortTasks(field);
    }

    @GetMapping("/high-priority")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Task> getHighPriorityTasks() {
        return taskService.getHighPriorityTasks();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Task updateTask(@PathVariable Long id,
                           @RequestBody TaskRequest request) {
        return taskService.updateTask(id, request);
    }

    // Keep this LAST
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public Task getTask(@PathVariable Long id) {
        return taskService.getTask(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "Task Deleted Successfully";
    }
}