# 📺 Aptitude Practice Platform - Presentation Slides

*You can copy and paste this exact text into a PowerPoint or Canva slide.*

---

## Slide 1: Welcome
**Title:** Aptitude Practice Platform  
**Subtitle:** A Modern Web App for Tech Interview Prep  
**Points:**
- Full-Stack Web Application (Frontend + Backend)
- Live Quiz Engine with automatic grading
- Smart Performance Tracking & Dashboard
- Built for students aiming for high-tier tech jobs

---

## Slide 2: The Technologies I Used
**Frontend (What the user sees):**
- React.js: Built the actual website.
- Modern CSS: Custom dark mode and glass-style graphics.

**Backend (The server brain):**
- Java Spring Boot: Handles the complex logic securely.
- PostgreSQL: The database that saves all user scores and questions.
- Built-in Python Script: Automatically fetches and pushes hundreds of questions into the server.

---

## Slide 3: My Best Features
**1. The Anti-Cheat System**  
Built a specific browser interceptor. If a student tries to "Refresh" the page manually while a test is active, it freezes everything and warns them, securing their data.

**2. Smart Question Memory**  
The database remembers everything. It mathematically prevents you from ever seeing the same question twice, unless you completely run out of fresh questions in that category.

**3. Total Analytics**  
Calculates exactly how accurate you are in different categories (Math vs Logic) and draws live progress bars to show you where to study more.

---

## Slide 4: Overcoming the Hardest Bug
**Title:** Challenges vs. Solutions

*The Problem:* The "Refresh Blocker" wasn't working. Browsers like Chrome were ignoring the warning because React kept destroying the "Listener" when the clock ticked.

*The Solution:* We bypassed React entirely. We wrote raw JavaScript directly to the literal `window` of the browser on mount using a `useRef` to securely lock the tab. 

---

## Slide 5: The System Security
**Title:** Keeping User Data Safe
- **BCrypt Encryption:** Your password is scrambled and salted. We can't even see it.
- **JWT (JSON Web Tokens):** Instead of storing user data in vulnerable cookies, we use mathematically signed tokens to prove who you are securely on every click.
- **Dual Roles:** Students can strictly only take quizzes. Only accounts marked specifically as Admins are allowed to load or delete questions.

---

## Slide 6: What I Learned
**Title:** Final Thoughts
- Learned how to connect a front-end website to a fully functional back-end server.
- Learned how to manage actual databases and complex data relationships instead of just visual design.
- Built a product that goes beyond typical beginner apps by applying actual industry security standards.
