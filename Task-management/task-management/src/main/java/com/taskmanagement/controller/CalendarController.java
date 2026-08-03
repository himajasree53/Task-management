package com.taskmanagement.controller;

import com.taskmanagement.entity.Task;
import com.taskmanagement.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CalendarController {

    private final TaskRepository taskRepository;

    @GetMapping
    public List<Task> getCalendarTasks() {
        return taskRepository.findAll();
    }
}