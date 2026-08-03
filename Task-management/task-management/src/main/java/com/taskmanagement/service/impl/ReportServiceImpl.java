package com.taskmanagement.service.impl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.taskmanagement.dto.ReportResponse;
import com.taskmanagement.repository.ProjectRepository;
import com.taskmanagement.repository.TaskRepository;
import com.taskmanagement.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    @Override
    public ReportResponse getDashboardReport() {
        ReportResponse report = new ReportResponse();

        report.setTotalProjects(projectRepository.count());
        report.setCompletedProjects(projectRepository.countByStatus("COMPLETED"));
        report.setInProgressProjects(projectRepository.countByStatus("IN_PROGRESS"));
        report.setPendingProjects(projectRepository.countByStatus("PENDING"));

        report.setTotalTasks(taskRepository.count());
        report.setCompletedTasks(taskRepository.countByStatus("COMPLETED"));
        report.setPendingTasks(taskRepository.countByStatus("PENDING"));

        report.setHighPriorityTasks(taskRepository.countByPriority("HIGH"));
        report.setMediumPriorityTasks(taskRepository.countByPriority("MEDIUM"));
        report.setLowPriorityTasks(taskRepository.countByPriority("LOW"));

        return report;
    }

    @Override
    public byte[] generatePdfReport() {
        ReportResponse report = getDashboardReport();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // A4 page setup with proper professional margins
        Document document = new Document(PageSize.A4, 36, 36, 54, 54);

        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // iText 5 Fonts setup (using BaseColor)
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD, BaseColor.DARK_GRAY);
            Font subtitleFont = new Font(Font.FontFamily.HELVETICA, 9, Font.NORMAL, BaseColor.GRAY);
            Font sectionFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, new BaseColor(13, 110, 253));
            Font tableHeaderFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.WHITE);
            Font bodyFont = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);

            // Document Header Title & Subtitle
            Paragraph title = new Paragraph("TASKFLOW MANAGEMENT SYSTEM", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            Paragraph subtitle = new Paragraph("Executive Performance Report - Generated on " + LocalDate.now(), subtitleFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            subtitle.setSpacingAfter(20);
            document.add(subtitle);

            // 1. Project Summary Table
            document.add(createTable("Project Summary", new String[]{"Indicator", "Count"}, new String[][]{
                    {"Total Projects", String.valueOf(report.getTotalProjects())},
                    {"Completed Projects", String.valueOf(report.getCompletedProjects())},
                    {"Projects In Progress", String.valueOf(report.getInProgressProjects())},
                    {"Projects Not Yet Started", String.valueOf(report.getPendingProjects())}
            }, sectionFont, tableHeaderFont, bodyFont));

            // 2. Task Summary Table
            document.add(createTable("Task Summary", new String[]{"Indicator", "Count"}, new String[][]{
                    {"Total Tasks", String.valueOf(report.getTotalTasks())},
                    {"Completed Tasks", String.valueOf(report.getCompletedTasks())},
                    {"Tasks Not Yet Started", String.valueOf(report.getPendingTasks())}
            }, sectionFont, tableHeaderFont, bodyFont));

            // 3. Task Priority Distribution Table
            document.add(createTable("Task Priority Distribution", new String[]{"Priority Level", "Count"}, new String[][]{
                    {"HIGH", String.valueOf(report.getHighPriorityTasks())},
                    {"MEDIUM", String.valueOf(report.getMediumPriorityTasks())},
                    {"LOW", String.valueOf(report.getLowPriorityTasks())}
            }, sectionFont, tableHeaderFont, bodyFont));

            document.close();
            return outputStream.toByteArray();

        } catch (DocumentException e) {
            throw new RuntimeException("Error while generating professional PDF report", e);
        }
    }

    private PdfPTable createTable(String sectionTitle, String[] headers, String[][] data, Font sectionFont, Font headerFont, Font bodyFont) throws DocumentException {
        Paragraph p = new Paragraph(sectionTitle, sectionFont);
        p.setSpacingBefore(12);
        p.setSpacingAfter(6);

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{3f, 1f});
        table.setSpacingAfter(8);

        // Header Row Styling (Dark background)
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
            cell.setBackgroundColor(new BaseColor(33, 37, 41));
            cell.setPadding(6);
            table.addCell(cell);
        }

        // Data Rows with Zebra Striping
        boolean alternate = false;
        BaseColor stripeColor = new BaseColor(248, 249, 250);

        for (String[] row : data) {
            for (int i = 0; i < row.length; i++) {
                PdfPCell cell = new PdfPCell(new Phrase(row[i], bodyFont));
                cell.setPadding(5);
                if (alternate) {
                    cell.setBackgroundColor(stripeColor);
                }
                if (i == 1) {
                    cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                }
                table.addCell(cell);
            }
            alternate = !alternate;
        }

        return table;
    }
}