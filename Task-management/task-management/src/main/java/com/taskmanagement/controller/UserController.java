package com.taskmanagement.controller;

import com.taskmanagement.dto.RegisterRequest;
import com.taskmanagement.dto.UserResponse;
import com.taskmanagement.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ NEW: Fetch currently logged-in user profile safely via JWT Principal
    @GetMapping("/me")
    public UserResponse getCurrentUserProfile(Principal principal) {
        String email = principal.getName();
        return userService.getUserByEmail(email);
    }

    @GetMapping
    public List<UserResponse> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/search")
    public List<UserResponse> searchByName(@RequestParam String name) {
        return userService.searchByName(name);
    }

    @GetMapping("/department")
    public List<UserResponse> searchByDepartment(@RequestParam String department) {
        return userService.searchByDepartment(department);
    }

    @PutMapping("/{id}")
    public UserResponse updateUser(@PathVariable Long id,
                                   @RequestBody RegisterRequest request) {
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}