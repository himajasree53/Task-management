package com.taskmanagement.repository;

import com.taskmanagement.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByStatus(String status);

    long countByStatus(String status);

    List<Project> findByPriorityOrderByEndDateAsc(String priority);
}