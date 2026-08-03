package com.taskmanagement.controller;

import com.taskmanagement.dto.CommentRequest;
import com.taskmanagement.entity.Comment;
import com.taskmanagement.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin("*")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public Comment addComment(@RequestBody CommentRequest request) {
        return commentService.addComment(request);
    }

    @GetMapping("/{taskId}")
    public List<Comment> getComments(@PathVariable Long taskId) {
        return commentService.getComments(taskId);
    }
}