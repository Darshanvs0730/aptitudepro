# AptitudePro: Premium Tech-Interview Preparation Platform
**Presentation Guide & Project Explanation**

---

## 1. Introduction & Objective
**What is AptitudePro?**
AptitudePro is a full-stack, enterprise-grade web application designed to help degree students and job seekers prepare for high-tier company aptitude rounds (tech companies, start-scups, and MNCs). 

**The Problem it Solves:**
Most students practice on static, outdated platforms. AptitudePro provides a dynamic, structured, and highly secure environment with high-quality tech-company-level cognitive, numerical, and logical reasoning questions.

---

## 2. Core Technology Stack (The "MERN/Spring" Equivalent)
*   **Frontend (Client-side):** React.js (JavaScript), React Router v7, HTML5, Custom modular CSS featuring a modern "Dark Mode" aesthetic with Glassmorphism effects.
*   **Backend (Server-side):** Spring Boot (Java), Spring Security, Hibernate (JPA).
*   **Database:** PostgreSQL (Relational Database) for robust, structured data scaling.
*   **Data Injection:** Python procedural generation scripts (requests, JSON handling) to automatically seed hundreds of high-quality queries into the running database bypassing manual data entry.

---

## 3. System Architecture & Data Flow
1.  **Client-Server Model:** The React frontend communicates asynchronously with the Spring Boot backend via RESTful APIs.
2.  **Stateless Security:** Uses JWT (JSON Web Tokens). When a user logs in, the backend signs a token, which the React app stores securely and attaches as a Bearer Token to all subsequent backend requests.
3.  **Tiered Access:** The application strictly maps access using dual roles `ROLE_USER` (Student) and `ROLE_ADMIN` (Content Manager).

---

## 4. Key Features & Working Modules

### 🔹 1. Security & Authentication Engine
*   **Full Auth Lifecycle:** Includes Registration (Signup), Login, and secure session Logout.
*   **Forgot/Reset Password Flow:** Built a robust recovery system where users can request a password reset, triggering a secure, time-sensitive token verification to grant account recovery.
*   **Encrypted Storage:** All system passwords are irreversibly salted and hashed via BCrypt in the database before storage.

### 🔹 2. The Dynamic Quiz Engine (Core Application)
*   **Real-time Interface:** A seamless, single-page application (SPA) environment.
*   **Anti-Cheat & Session Protection:** The quiz implements a dual-layer "Navigation Blocker". If a student tries to click away to a different menu or literally hits "Refresh" (F5 / Cmd+R) on their browser, the application physically overrides the DOM to warn them and prevent accidental data loss. 
*   **Time-Boxed Simulation:** Implements an active countdown timer that auto-submits the quiz precisely when time expires, mirroring genuine corporate test portals.

### 🔹 3. Administrator Dashboard
*   **CRUD Operations:** Instructors or Admins have a dedicated React portal where they can **C**reate, **R**ead, **U**pdate, and **D**elete questions from the live database.
*   **Live Rendering:** Editing a question triggers background API calls that instantly synchronize with the PostgreSQL database.

### 🔹 4. Automated Python Seeding System
*   **Scalability:** Instead of manually typing questions, we built a standalone `generate_questions.py` Python engine. 
*   **Procedural Mass Generation:** It intelligently fetches, prunes out overly basic questions, and seeds 400+ high-difficulty, corporate-level questions directly into the live Spring Boot endpoint using an authorized Admin bypass.

---

## 5. UI/UX Design Philosophy
*   **Modern "IDE" Aesthetic:** Built utilizing deep dark themes (`var(--bg-dark)`, `var(--bg-card)`), making it relaxing to stare at for hours during intense study sessions.
*   **Liquid / Responsive Layouts:** Flexible grids and Flexbox systems ensure the text, answer options, and dashboards stretch and align perfectly regardless of monitor size.
*   **Toast Notification System:** Custom animated popups (Toasts) slide in to inform users of successes (Account Created) or errors (Invalid Password) smoothly without disruptive browser alerts.

---

## 6. How to Explain This to Judges / Evaluators
* **If they ask about Frontend:** Focus on "State Management" (useState, useEffect) and the React Router protections we built to save quiz progress.
* **If they ask about Backend/DB:** Mention "Spring Security with JWT", "REST APIs", and the relational mapping using Hibernate to PostgreSQL.
* **If they ask about "What makes it unique?":** Highlight the **Automated Python generator**. Tell them: *"Most academic projects require manual data-entry. We actually built an external Python script to algorithmically populate our database with 400+ top-tier tech questions, allowing the platform to scale instantly."*
