package com.taskmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String status;

    private String priority;

    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "assigned_user_id")
    private User assignedUser;

    /**
     * Dynamic Priority Getter:
     * Overrides Lombok's generated getPriority() method.
     * 1. Returns null for COMPLETED tasks (clears priority tag).
     * 2. Dynamically calculates HIGH (<= 3 days), MEDIUM (<= 7 days), or LOW based on dueDate.
     */
    public String getPriority() {
        if ("COMPLETED".equalsIgnoreCase(this.status)) {
            return null;
        }

        if (this.dueDate == null) {
            return this.priority != null ? this.priority : "LOW";
        }

        long daysRemaining = ChronoUnit.DAYS.between(LocalDate.now(), this.dueDate);

        if (daysRemaining <= 3) {
            return "HIGH";
        } else if (daysRemaining <= 7) {
            return "MEDIUM";
        } else {
            return "LOW";
        }
    }
}