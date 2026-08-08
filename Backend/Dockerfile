FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-Djava.net.preferIPv4Stack=true", "-Djava.net.preferIPv4Addresses=true", "-jar", "target/aptitude-practice-0.0.1-SNAPSHOT.jar"]