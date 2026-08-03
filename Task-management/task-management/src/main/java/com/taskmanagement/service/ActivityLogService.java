package com.taskmanagement.service;

import com.taskmanagement.entity.ActivityLog;

import java.util.List;

public interface ActivityLogService {

    void saveLog(String action, String user);

    List<ActivityLog> getAllLogs();

}