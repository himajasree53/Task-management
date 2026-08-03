package com.taskmanagement.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "Welcome Admin";
    }

    @GetMapping("/reports")
    public String reports() {
        return "Admin Reports";
    }
}