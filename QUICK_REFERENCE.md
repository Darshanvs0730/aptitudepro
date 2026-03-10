# 🚀 AptitudePro - Quick Guide

## ⚡ How to Start the App

```bash
# Terminal 1 - Start the Backend Server
cd Backend
mvn spring-boot:run

# Terminal 2 - Start the Frontend Website
cd frontend
npm start
```

## 🔑 Demo Logins

**Admin User:**
- Username: `admin`
- Password: `admin123`

**Normal Student User:**
- Either create a new account by clicking "Sign Up", or log in if you already made one.

## 📊 Quick Project Facts
- **Built with:** React (Frontend), Spring Boot (Backend), PostgreSQL (Database).
- **Features:** Taking quizzes with a timer, tracking performance on a dashboard, and a custom Python script to load questions automatically.
- **Security:** We use JWT (JSON Web Tokens) and BCrypt to keep passwords completely safe.
- **Protection:** We built a custom "Blocker" so students can't accidentally refresh or leave the page while taking a quiz.

## 🎯 Quick 5-Minute Demo Steps
1. **Show the Homepage:** Point out the dark mode theme.
2. **Log In:** Show how the login works.
3. **Start a Quiz:** Show the active timer and the anti-refresh warning if you try to reload.
4. **Finish Quiz:** Submit answers and see the score.
5. **Dashboard:** Show the progress bars and past attempts.
6. **Admin Mode:** Log in as `admin` to show how you can add or delete questions.

## ❓ Simple Answers to Common Questions
**Q: What makes this special?**  
A: Instead of typing questions one by one, we built a Python program that automatically searches and adds hundreds of top-tier company questions direct to the database.

**Q: What happens if a student tries to cheat by refreshing the page?**  
A: The system immediately pauses and flashes a warning popup. If they force the refresh anyway, the quiz safely ends and their score is marked as 0.
