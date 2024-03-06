FROM openjdk:17-jdk-slim
# 设置工作目录
WORKDIR /app

# 将本地的 JAR 文件复制到容器中
COPY target/microService-0.0.1-SNAPSHOT.jar /app/app.jar

# 暴露应用程序的端口
EXPOSE 11130

# 在容器启动时运行应用程序，并指定端口
CMD ["java", "-jar", "-Dserver.port=11130", "app.jar"]
