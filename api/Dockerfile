FROM gradle:7.5.1-jdk17 AS builder
WORKDIR /project
COPY --chown=gradle:gradle . .
RUN gradle build --no-daemon

FROM openjdk:17-jdk-alpine AS runtime
WORKDIR /app
VOLUME /tmp/files
COPY --from=builder /project/build/libs/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
