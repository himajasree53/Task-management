package com.taskmanagement.service.impl;

import com.taskmanagement.dto.CommentRequest;
import com.taskmanagement.entity.Comment;
import com.taskmanagement.entity.Task;
import com.taskmanagement.entity.User;
import com.taskmanagement.repository.CommentRepository;
import com.taskmanagement.repository.TaskRepository;
import com.taskmanagement.repository.UserRepository;
import com.taskmanagement.service.CommentService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public CommentServiceImpl(CommentRepository commentRepository,
                              TaskRepository taskRepository,
                              UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Comment addComment(CommentRequest request) {

        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = Comment.builder()
                .comment(request.getComment())
                .createdAt(LocalDateTime.now())
                .task(task)
                .user(user)
                .build();

        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getComments(Long taskId) {
        return commentRepository.findByTaskId(taskId);
    }
}