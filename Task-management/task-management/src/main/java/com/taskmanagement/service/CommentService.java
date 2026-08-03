package com.taskmanagement.service;

import com.taskmanagement.dto.CommentRequest;
import com.taskmanagement.entity.Comment;

import java.util.List;

public interface CommentService {

    Comment addComment(CommentRequest request);

    List<Comment> getComments(Long taskId);

}