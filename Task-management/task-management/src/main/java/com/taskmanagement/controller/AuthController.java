package com.taskmanagement.controller;

import com.taskmanagement.dto.LoginRequest;
import com.taskmanagement.dto.LoginResponse;
import com.taskmanagement.dto.RegisterRequest;
import com.taskmanagement.entity.User;
import com.taskmanagement.security.JwtService;
import com.taskmanagement.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService,
                          JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        User user = userService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        User user = userService.login(request);

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );

        LoginResponse response = new LoginResponse(
                user.getId(),
                token,
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok(response);
    }

}