package com.example.mainservice.model;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class SparkIntegration {

    public static void wordCount() {
        try {
            // 构建 spark-submit 命令
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "D:\\spark\\spark-3.5.0-bin-hadoop3\\bin\\spark-submit.cmd",
                    "--master", "spark://localhost:7077",
                    "--name", "WordCount",
                    "--executor-memory", "1G",
                    "--executor-cores", "2",
                    "--conf", "spark.pyspark.python=D:\\python\\python.exe",
                    "D:\\PythonProjects\\se3353_25_spark_python\\main.py"
            );
            // 将输出重定向到 Java 控制台
            processBuilder.redirectErrorStream(true);
            // 启动进程
            Process process = processBuilder.start();
            // 读取进程的输出
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            final String[] line = new String[1];
            // 异步读取输出
            Thread outputReader = new Thread(() -> {
                try {
                    while ((line[0] = reader.readLine()) != null) {
                        System.out.println(line[0]);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            // 启动异步读取线程
            outputReader.start();
            // 等待进程完成
            int exitCode = process.waitFor();
            // 等待异步读取线程完成
            outputReader.join();
            // 打印进程退出码
            System.out.println("Spark job exited with code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
