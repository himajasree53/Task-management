package com.taskmanagement.service.impl;

import com.taskmanagement.dto.NotificationRequest;
import com.taskmanagement.entity.Notification;
import com.taskmanagement.entity.User;
import com.taskmanagement.repository.NotificationRepository;
import com.taskmanagement.repository.UserRepository;
import com.taskmanagement.service.NotificationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository,
                                   UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Notification send(NotificationRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = Notification.builder()
                .message(request.getMessage())
                .user(user)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getUserNotifications(Long userId) {

        return notificationRepository.findByUserId(userId);
    }

    @Override
    public Notification markAsRead(Long id) {

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);

        return notificationRepository.save(notification);
    }

    @Override
    public void createNotification(Long userId, String message) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = Notification.builder()
                .message(message)
                .user(user)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }
}