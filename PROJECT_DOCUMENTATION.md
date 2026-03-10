# 📚 Aptitude Practice Platform - Main Project Documentation

## 🎯 What is this project?
**AptitudePro** is a modern website designed to help students heavily prepare for job interviews. They can log in, take timed quizzes on math, logic, and verbal topics, and track their scores over time to see what they need to improve.

---

## 🛠️ The Tech We Used

### **Frontend (What the user sees)**
- **React.js:** Used to build the entire website.
- **React Router:** Used to move smoothly between pages like Home, Dashboard, and Quiz without reloading the site.
- **CSS:** Custom dark-mode graphics, glassmorphism, and smooth animations.

### **Backend (The invisible brain)**
- **Java & Spring Boot:** The main server that does all the heavy sorting, saving, and calculating.
- **Spring Security & JWT:** Keeps hackers out and safely checks if the user is authorized.
- **PostgreSQL:** A powerful database that remembers all the users, questions, and scores forever.
- **Python:** Used a specific external script to automatically generate and inject hundreds of questions into the database.

---

## 🔐 How Security Works
1. **Signing Up:** When you create an account, the backend scrambles your password into a secret code (using BCrypt) before saving it. No one can ever see your real password.
2. **Logging In:** When you log in correctly, the server gives you a digital timestamped "Key" (called a JWT token).
3. **Using the Site:** Your browser holds that key. Every time you try to view the Dashboard or a Quiz, your browser flashes the key to the Server. If the key is valid, you get in.

---

## 🚀 How the System Works (User Journey)
1. **User Creates Account:** Data is safely stored in PostgreSQL.
2. **Dashboard:** The backend quickly calculates their win/loss ratio for past quizzes and the React frontend displays it with colorful progress bars.
3. **Taking a Quiz:** 
   - React asks Spring Boot for 10 random questions.
   - Spring Boot specifically picks questions the user *has never seen before*.
   - A timer starts ticking.
   - If the user tries to reload the page by accident, the app safely blocks them from losing their progress using React Router DOM intercepts.
4. **Submitting:** The user chooses answers. React sends the choices to Spring Boot. Spring Boot calculates the final score and saves it permanently to the Database.

---

## 🎨 Important Core Features
- **Two Account Types:** Students can only take tests. Admins have a special menu where they can delete/add new questions live.
- **Smart Question System:** The app guarantees you won't get duplicate questions until you have successfully finished every question in the category.
- **Safety First:** Hard browser refreshes or clicking the 'back' button are blocked if a quiz is currently running.

---

## 🔧 Developer Notes
**To run this locally:**
1. Make sure PostgreSQL is running on port 5432.
2. Start the Spring Boot backend server on port 8080.
3. Start the React frontend server on port 3000.