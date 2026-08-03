package com.taskmanagement.service;

import com.taskmanagement.dto.LoginRequest;
import com.taskmanagement.dto.RegisterRequest;
import com.taskmanagement.dto.UserResponse;
import com.taskmanagement.entity.User;

import java.util.List;

public interface UserService {
    User register(RegisterRequest request);
    User login(LoginRequest request);

    UserResponse getUserByEmail(String email);
    List<UserResponse> getAllUsers();
    UserResponse getUser(Long id);
    List<UserResponse> searchByName(String name);
    List<UserResponse> searchByDepartment(String department);
    UserResponse updateUser(Long id, RegisterRequest request);
    void deleteUser(Long id);
}