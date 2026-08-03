package com.taskmanagement.repository;

import com.taskmanagement.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
}