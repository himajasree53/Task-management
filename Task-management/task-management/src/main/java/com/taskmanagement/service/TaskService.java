package com.taskmanagement.service;

import com.taskmanagement.dto.TaskRequest;
import com.taskmanagement.dto.TaskStatsResponse;
import com.taskmanagement.entity.Task;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TaskService {

    Task createTask(TaskRequest request);

    List<Task> getAllTasks();

    Task getTask(Long id);

    Task updateTask(Long id, TaskRequest request);

    void deleteTask(Long id);

    TaskStatsResponse getTaskStats();

    List<Task> searchTasks(String keyword);

    List<Task> getTasksByStatus(String status);

    List<Task> getTasksByPriority(String priority);

    // ADD THIS METHOD
    List<Task> getHighPriorityTasks();

    List<Task> getTasksByUser(Long userId);

    List<Task> getTasksByProject(Long projectId);

    Page<Task> getTasks(int page, int size, String sortBy);

    List<Task> sortTasks(String sortBy);
}