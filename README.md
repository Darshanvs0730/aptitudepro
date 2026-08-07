<div align="center">
  <img src="Pass-Apti.png" alt="AptitudePro" width="100%">
</div>

## 📖 Project Status

- **Version**: 1.0.0
- **Production Ready**: Yes
- **Architecture**: Decoupled Client-Server (React + Spring Boot)
- **Security**: JWT Stateless Auth & BCrypt
- **Database**: PostgreSQL (Relational)

---

## 📖 Project Overview

AptitudePro is a complete, enterprise-ready web application designed to heavily prepare candidates for job interviews. Built with a modern, decoupled architecture, it offers users a timed, intelligent quiz experience that evaluates performance metrics across a live dashboard. 

Unlike static mock-exam PDFs, AptitudePro operates as a **Dynamic Evaluation Engine**. It features adaptive question memory, secure session management, and anti-cheat intercepts to ensure a seamless and rigorous practice environment.

---

## 🎯 Problem Statement

Most mock-exam platforms are either super outdated static PDF files, or require paid subscriptions. We wanted a free, beautiful, dynamic environment for students to run mock tech interviews. This project provides a robust solution with actual industry security standards, real-time analytics, and automated question generation.

---

## 🚀 Core Features

The platform orchestrates a robust feature set:
1. **Smart Question System**: The database mathematically prevents duplicate questions by validating the current student's attempt-history records deep within the backend relational query layer.
2. **Anti-Cheat Timer & Interceptor**: Built a custom browser interceptor that hooks directly into the core browser's network APIs using `useRef` to safely freeze the browser and hold progress if a user tries to close the tab or refresh.
3. **Total Analytics**: Calculates win/loss ratios across different categories (Quantitative, Logic, Verbal) and draws live progress bars to show areas of improvement.
4. **JWT Authentication**: Complete signup/login lifecycle utilizing BCrypt encryption for password hashing and JSON Web Tokens for stateless server session management.
5. **Python Auto-Seeder**: Includes a custom Python algorithm that gathers valid datasets and autonomously injects hundreds of questions into the live server via REST calls.
6. **Role-Based Access (User/Admin)**: Secure endpoints logically separated. Admins have a special menu to seamlessly edit the question database online without SQL interactions.

---

## 💻 Tech Stack

- **Frontend**: React.js, React Router, custom CSS glassmorphism UI, React Three Fiber (3D Elements).
- **Backend**: Java 17, Spring Boot, Spring Security (Stateless).
- **Database**: PostgreSQL (JPA/Hibernate).
- **Automation Scripts**: Python 3 (Data seeder).

---

## 📂 Folder Structure

```text
aptitude-practice/
├── Backend/                 # Spring Boot Java Server
│   ├── src/                 # Main Java Source Code
│   ├── pom.xml              # Maven Dependencies
│   └── clear_dups.sql       # Database maintenance scripts
├── frontend/                # React Application
│   ├── src/                 # React Components and Services
│   ├── public/              # Static Assets
│   └── package.json         # NPM Dependencies
├── Pass-Apti.png            # Project Hero Image
├── generate_questions.py    # Autonomous data seeder scripts
├── README.md                # This document
└── docs/                    # Presentation slides and guides
```

---

## 🛠 Installation & Running Locally

### Prerequisites
- Node.js (v16+)
- Java (17+)
- Maven
- PostgreSQL running on default port `5432`

### 1. Database Setup
Ensure PostgreSQL is running.
```bash
# Check if PostgreSQL is running
pg_isready

# Create database (if needed)
psql -U postgres -c "CREATE DATABASE aptitude_db;"
```
*Note: The backend is configured to use username `darshan` with no password on `localhost:5432` by default. Update `application.properties` if your DB setup differs.*

### 2. Start the Backend
```bash
cd Backend
mvn spring-boot:run
```
*Expected Output: Server starts on `http://localhost:8080`. Wait for the `Started AptitudePracticeApplication` message.*

### 3. Start the Frontend
Open a NEW terminal window/tab:
```bash
cd frontend
npm install
npm start
```
*Expected Output: The React frontend will be available at `http://localhost:3000`.*

---

## 🔑 Demo Credentials

**Admin User:**
- Username: `admin`
- Password: `admin123`

**Normal Student User:**
- Click "Sign Up" to create a new account, or use the admin account above.

---

## 🚨 Troubleshooting

- **Backend won't start (Port in use)**: 
  `kill -9 $(lsof -t -i:8080)`
- **Frontend won't start (Port in use)**: 
  `kill -9 $(lsof -t -i:3000)`
- **Clear npm cache**: 
  `cd frontend && rm -rf node_modules package-lock.json && npm install`

---

## 🔮 Future Improvements

- **Managed Vector Store**: Swap local SQL searches for AI-driven similarity matching on generated questions.
- **Streaming Reports**: Implement Server-Sent Events (SSE) in Spring Boot for real-time Leaderboard telemetry.
