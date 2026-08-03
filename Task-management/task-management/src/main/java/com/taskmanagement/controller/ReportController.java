package com.taskmanagement.controller;

import com.taskmanagement.dto.ReportResponse;
import com.taskmanagement.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    public ResponseEntity<ReportResponse> getReport() {
        return ResponseEntity.ok(reportService.getDashboardReport());
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadReport() {

        byte[] pdf = reportService.generatePdfReport();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Task_Report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}