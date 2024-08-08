# Use the OpenJDK 21 slim image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY build/libs/JWTYT-0.0.1-SNAPSHOT.jar /app/JWTYT.jar

# Expose the port the application will run on
EXPOSE 8080

# Command to run the JAR file
ENTRYPOINT ["java", "-jar", "/app/JWTYT.jar"]
