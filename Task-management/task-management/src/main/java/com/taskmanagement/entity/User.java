package com.taskmanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Builder.Default
    private String role = "ROLE_USER";

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    private String department;

    private String designation;

    private String phone;

    @Column(length = 500)
    private String profileImage;

    @OneToMany(mappedBy = "assignedUser", fetch = FetchType.LAZY)
    @JsonIgnore
    @Builder.Default
    private List<Task> tasks = new ArrayList<>();

    @ManyToMany(mappedBy = "members", fetch = FetchType.LAZY)
    @JsonIgnore
    @Builder.Default
    private List<Project> projects = new ArrayList<>();

}