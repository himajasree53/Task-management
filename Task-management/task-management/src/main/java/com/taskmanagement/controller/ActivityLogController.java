package com.taskmanagement.controller;

import com.taskmanagement.entity.ActivityLog;
import com.taskmanagement.service.ActivityLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin("*")
public class ActivityLogController {

    private final ActivityLogService service;

    public ActivityLogController(ActivityLogService service) {
        this.service = service;
    }

    @GetMapping
    public List<ActivityLog> getLogs() {
        return service.getAllLogs();
    }
}