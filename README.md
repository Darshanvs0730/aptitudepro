# AptitudePro

**Full-stack aptitude practice platform with quiz engine and analytics.**

AptitudePro is a complete, enterprise-ready web application designed for interactive student training. Built with a modern, decoupled architecture, it offers candidates a timed, intelligent quiz experience that evaluates performance metrics across a live dashboard.

## 🚀 Technology Stack
*   **Frontend:** React.js, React Router, custom CSS glassmorphism UI.
*   **Backend:** Java Spring Boot, Spring Security (Stateless).
*   **Database:** PostgreSQL (Relational) via JPA/Hibernate.

## ⭐ Features
*   **JWT Authentication:** Complete signup/login lifecycle utilizing BCrypt encryption for password hashing and JSON Web Tokens for stateless server session management.
*   **Quiz Engine with Anti-Cheat Timer:** Real-time ticking timers mapped against intelligent session lockouts that intercept browser tab-refreshes to prevent accidental data loss.
*   **Randomized Adaptive Questions:** Prevents duplicate question presentation by validating the current student's attempt-history records deep within the backend relational query layer.
*   **Performance Dashboard:** Beautiful UI graphing performance history segmented by question categories (Quantitative, Logic, Verbal).
*   **Role-Based Access (User/Admin):** Secure endpoints separated logically allowing admins full CRUD capabilities to seamlessly edit the question database online without SQL interactions.

## 🛠 Running Locally

### 1. Prerequisites
*   Node.js (v16+)
*   Java (17+)
*   Maven
*   PostgreSQL running on default port `5432`

### 2. Environment Variables
To run securely, this project relies on environment variables.
Copy the generic `.env.example` file and set up your specific configurations in your system, or directly in `.env`.

```bash
# Example
DB_URL=jdbc:postgresql://localhost:5432/aptitude_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=generate_a_very_long_secret_key_here
```

### 3. Start the Backend
```bash
cd Backend
mvn spring-boot:run
```

### 4. Start the Frontend
```bash
cd frontend
npm install
npm start
```
The React frontend will be available at `http://localhost:3000`.

---
*Created as a comprehensive demonstration of full-stack engineering, combining secure RESTful backend practices with modern interactive frontends.*
