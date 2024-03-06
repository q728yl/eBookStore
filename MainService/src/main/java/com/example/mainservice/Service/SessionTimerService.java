package com.example.mainservice.Service;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Service
@SessionScope
public class SessionTimerService {
    private long startTime = 0; // 记录会话开始时间

    // 开始计时
    public void startTimer() {
        startTime = System.currentTimeMillis();
        System.out.println("start "+this);
    }

    // 停止计时并获取计时时间（毫秒）
    public long stopTimer() {
        if (startTime == 0) {
            // 如果计时未开始或已经停止，返回0
            return 0;
        }
        System.out.println("stop "+this);
        long endTime = System.currentTimeMillis();
        long sessionTime = endTime - startTime;
        startTime = 0; // 重置计时器
        return sessionTime;
    }
}
