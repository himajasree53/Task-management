package com.taskmanagement.repository;

import com.taskmanagement.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(String status);

    long countByStatus(String status);

    long countByPriority(String priority);

    List<Task> findByPriority(String priority);

    List<Task> findByPriorityOrderByDueDateAsc(String priority);

    List<Task> findByDueDateBetweenOrderByDueDateAsc(LocalDate startDate, LocalDate endDate);

    List<Task> findByTitleContainingIgnoreCase(String keyword);

    List<Task> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String title,
            String description);

    List<Task> findByAssignedUser_Id(Long userId);

    List<Task> findByProject_Id(Long projectId);
}