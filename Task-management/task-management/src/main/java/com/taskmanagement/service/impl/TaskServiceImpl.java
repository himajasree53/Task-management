package com.taskmanagement.service.impl;

import com.taskmanagement.dto.TaskRequest;
import com.taskmanagement.dto.TaskStatsResponse;
import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.Task;
import com.taskmanagement.entity.User;
import com.taskmanagement.exception.ResourceNotFoundException;
import com.taskmanagement.repository.ProjectRepository;
import com.taskmanagement.repository.TaskRepository;
import com.taskmanagement.repository.UserRepository;
import com.taskmanagement.service.ActivityLogService;
import com.taskmanagement.service.EmailService;
import com.taskmanagement.service.NotificationService;
import com.taskmanagement.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;
    private final ActivityLogService activityLogService;

    public TaskServiceImpl(TaskRepository taskRepository,
                           ProjectRepository projectRepository,
                           UserRepository userRepository,
                           NotificationService notificationService,
                           EmailService emailService,
                           ActivityLogService activityLogService) {

        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.emailService = emailService;
        this.activityLogService = activityLogService;
    }

    @Override
    public Task createTask(TaskRequest request) {

        User user = userRepository.findById(request.getAssignedUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Project project = null;

        if (request.getProjectId() != null) {
            project = projectRepository.findById(request.getProjectId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Project not found"));
        }

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .priority(request.getPriority())
                .dueDate(request.getDueDate())
                .project(project)
                .assignedUser(user)
                .build();

        Task savedTask = taskRepository.save(task);

        notificationService.createNotification(
                user.getId(),
                "You have been assigned a new task: " + savedTask.getTitle()
        );

        if (user.getEmail() != null && !user.getEmail().isBlank()) {

            emailService.sendEmail(
                    user.getEmail(),
                    "New Task Assigned",
                    "Hello " + user.getFullName()
                            + ",\n\nYou have been assigned a new task:\n"
                            + savedTask.getTitle()
            );
        }

        activityLogService.saveLog(
                "Created Task: " + savedTask.getTitle(),
                user.getFullName()
        );

        return savedTask;
    }

    @Override
    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();

        // Sort: COMPLETED tasks go to the bottom of the list
        return tasks.stream()
                .sorted(Comparator.comparing(t ->
                        "COMPLETED".equalsIgnoreCase(t.getStatus()) ? 1 : 0
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<Task> getHighPriorityTasks() {
        // Filter tasks dynamically using getter so completed tasks are excluded and due dates are respected
        return taskRepository.findAll().stream()
                .filter(t -> "HIGH".equalsIgnoreCase(t.getPriority()))
                .sorted(Comparator.comparing(Task::getDueDate, Comparator.nullsLast(Comparator.naturalOrder())))
                .collect(Collectors.toList());
    }

    @Override
    public Task getTask(Long id) {

        return taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));
    }

    @Override
    public Task updateTask(Long id, TaskRequest request) {

        Task task = getTask(id);

        User user = userRepository.findById(request.getAssignedUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Project project = null;

        if (request.getProjectId() != null) {
            project = projectRepository.findById(request.getProjectId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Project not found"));
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setAssignedUser(user);
        task.setProject(project);

        Task updatedTask = taskRepository.save(task);

        notificationService.createNotification(
                user.getId(),
                "Task Updated: " + updatedTask.getTitle()
        );

        activityLogService.saveLog(
                "Updated Task: " + updatedTask.getTitle(),
                user.getFullName()
        );

        return updatedTask;
    }

    @Override
    public void deleteTask(Long id) {

        Task task = getTask(id);

        if (task.getAssignedUser() != null) {
            activityLogService.saveLog(
                    "Deleted Task: " + task.getTitle(),
                    task.getAssignedUser().getFullName()
            );
        }

        taskRepository.delete(task);
    }

    @Override
    public TaskStatsResponse getTaskStats() {

        long total = taskRepository.count();

        long completed = taskRepository.countByStatus("COMPLETED");

        long pending = taskRepository.countByStatus("PENDING");

        long progress = taskRepository.countByStatus("IN_PROGRESS");

        return TaskStatsResponse.builder()
                .totalTasks(total)
                .completedTasks(completed)
                .pendingTasks(pending)
                .inProgressTasks(progress)
                .build();
    }

    @Override
    public List<Task> searchTasks(String keyword) {

        return taskRepository
                .findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                        keyword,
                        keyword
                );
    }

    @Override
    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    @Override
    public List<Task> getTasksByPriority(String priority) {
        return taskRepository.findByPriority(priority);
    }

    @Override
    public List<Task> getTasksByUser(Long userId) {
        return taskRepository.findByAssignedUser_Id(userId);
    }

    @Override
    public List<Task> getTasksByProject(Long projectId) {
        return taskRepository.findByProject_Id(projectId);
    }

    @Override
    public Page<Task> getTasks(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending()
        );

        return taskRepository.findAll(pageable);
    }

    @Override
    public List<Task> sortTasks(String sortBy) {

        switch (sortBy.toLowerCase()) {

            case "title":
                return taskRepository.findAll(Sort.by("title"));

            case "duedate":
                return taskRepository.findAll(Sort.by("dueDate"));

            case "priority":
                return taskRepository.findAll(Sort.by("priority"));

            case "status":
                return taskRepository.findAll(Sort.by("status"));

            default:
                return taskRepository.findAll();
        }
    }
}