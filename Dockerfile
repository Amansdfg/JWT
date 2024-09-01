
FROM openjdk:21-jdk-slim

WORKDIR /app

COPY build/libs/JWTYT-0.0.1-SNAPSHOT.jar /app/JWTYT.jar

EXPOSE 8081


ENTRYPOINT ["java", "-jar", "/app/JWTYT.jar"]
