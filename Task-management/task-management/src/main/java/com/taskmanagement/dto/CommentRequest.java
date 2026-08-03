package com.taskmanagement.dto;

import lombok.Data;

@Data
public class CommentRequest {

    private String comment;
    private Long taskId;
    private Long userId;

}