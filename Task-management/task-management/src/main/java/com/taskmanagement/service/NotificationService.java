package com.taskmanagement.service;

import com.taskmanagement.dto.NotificationRequest;
import com.taskmanagement.entity.Notification;

import java.util.List;

public interface NotificationService {

    Notification send(NotificationRequest request);

    List<Notification> getUserNotifications(Long userId);

    Notification markAsRead(Long id);

    void createNotification(Long userId, String message);
}