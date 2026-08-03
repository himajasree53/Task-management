package com.taskmanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;

    @Column(length = 1000)
    private String description;

    private String status;

    private String priority;

    private LocalDate startDate;

    private LocalDate endDate;

    @Builder.Default
    @ManyToMany
    @JoinTable(
            name = "project_users",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnoreProperties({"projects","tasks"})
    private List<User> members = new ArrayList<>();

    /**
     * Custom Getter for Dynamic Priority:
     * Overrides Lombok's generated getPriority() method.
     * 1. Returns null for COMPLETED projects (omits/clears priority tag).
     * 2. Dynamically calculates HIGH, MEDIUM, or LOW based on remaining days to endDate.
     */
    public String getPriority() {
        if ("COMPLETED".equalsIgnoreCase(this.status)) {
            return null;
        }

        if (this.endDate == null) {
            return this.priority != null ? this.priority : "LOW";
        }

        long daysRemaining = ChronoUnit.DAYS.between(LocalDate.now(), this.endDate);

        if (daysRemaining <= 7) {
            return "HIGH";
        } else if (daysRemaining <= 30) {
            return "MEDIUM";
        } else {
            return "LOW";
        }
    }
}