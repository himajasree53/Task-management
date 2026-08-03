package com.taskmanagement.service;

import com.taskmanagement.dto.ReportResponse;

public interface ReportService {
    ReportResponse getDashboardReport();
    byte[] generatePdfReport();
}