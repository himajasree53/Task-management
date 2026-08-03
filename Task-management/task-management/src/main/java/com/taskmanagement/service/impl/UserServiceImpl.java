package com.taskmanagement.service.impl;

import com.taskmanagement.dto.LoginRequest;
import com.taskmanagement.dto.RegisterRequest;
import com.taskmanagement.dto.UserResponse;
import com.taskmanagement.entity.User;
import com.taskmanagement.repository.UserRepository;
import com.taskmanagement.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists.");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        // Encrypt Password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setDepartment(request.getDepartment());

        String role = request.getRole();

        if (role == null || role.isBlank()) {
            role = "ROLE_USER";
        } else if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role.toUpperCase();
        }

        user.setRole(role);

        user.setActive(true);

        user.setDesignation(request.getDesignation());
        user.setPhone(request.getPhone());
        user.setProfileImage(request.getProfileImage());

        return userRepository.save(user);
    }

    @Override
    public User login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid Email or Password"));

        if (!passwordEncoder.matches(request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid Email or Password");
        }

        return user;
    }

    @Override
    public UserResponse getUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return mapToDto(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return mapToDto(user);
    }

    @Override
    public List<UserResponse> searchByName(String name) {

        return userRepository.findByFullNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserResponse> searchByDepartment(String department) {

        return userRepository.findByDepartment(department)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse updateUser(Long id,
                                   RegisterRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setDepartment(request.getDepartment());

        if (request.getDesignation() != null) {
            user.setDesignation(request.getDesignation());
        }

        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }

        if (request.getProfileImage() != null) {
            user.setProfileImage(request.getProfileImage());
        }

        if (request.getRole() != null) {

            String role = request.getRole();

            if (!role.startsWith("ROLE_")) {
                role = "ROLE_" + role.toUpperCase();
            }

            user.setRole(role);
        }

        if (request.getPassword() != null &&
                !request.getPassword().isBlank()) {

            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return mapToDto(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {

        userRepository.deleteById(id);
    }

    private UserResponse mapToDto(User user) {

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                null,
                user.getDepartment(),
                user.getRole(),
                user.getDesignation(),
                user.isActive()
        );
    }
}