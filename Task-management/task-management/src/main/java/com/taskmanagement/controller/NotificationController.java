package com.taskmanagement.controller;

import com.taskmanagement.dto.NotificationRequest;
import com.taskmanagement.entity.Notification;
import com.taskmanagement.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public Notification sendNotification(@RequestBody NotificationRequest request) {
        return notificationService.send(request);
    }

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(@PathVariable Long userId) {
        return notificationService.getUserNotifications(userId);
    }

    @PutMapping("/{id}/read")
    public Notification markAsRead(@PathVariable Long id) {
        return notificationService.markAsRead(id);
    }
}