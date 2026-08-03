package com.taskmanagement.controller;

import com.taskmanagement.dto.DashboardResponse;
import com.taskmanagement.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public DashboardResponse dashboard() {
        return dashboardService.getDashboard();
    }
}