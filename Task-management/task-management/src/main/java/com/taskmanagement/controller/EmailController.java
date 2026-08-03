package com.taskmanagement.controller;

import com.taskmanagement.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String body) {

        emailService.sendEmail(to, subject, body);

        return ResponseEntity.ok("Email sent successfully");
    }
}