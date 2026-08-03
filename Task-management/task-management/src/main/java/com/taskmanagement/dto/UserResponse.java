package com.taskmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String fullName;
    private String email;
    private String password;
    private String department;
    private String role;
    private String extraField; // adjust if your fields differ slightly
    private boolean active;
}