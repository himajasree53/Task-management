package com.taskmanagement.service.impl;

import com.taskmanagement.entity.ActivityLog;
import com.taskmanagement.repository.ActivityLogRepository;
import com.taskmanagement.service.ActivityLogService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActivityLogServiceImpl implements ActivityLogService {

    private final ActivityLogRepository repository;

    public ActivityLogServiceImpl(ActivityLogRepository repository) {
        this.repository = repository;
    }

    @Override
    public void saveLog(String action, String user) {

        ActivityLog log = ActivityLog.builder()
                .action(action)
                .performedBy(user)
                .performedAt(LocalDateTime.now())
                .build();

        repository.save(log);
    }

    @Override
    public List<ActivityLog> getAllLogs() {
        return repository.findAll();
    }
}