# 🗣️ AptitudePro - Quick Presentation Guide

*Keep these simple bullet points in mind when talking to judges or evaluators.*

## 1. The Core Idea
"We built AptitudePro because most mock-exam platforms are either super outdated static PDF files, or require paid subscriptions. We wanted a free, beautiful, dynamic environment for students to run mock tech interviews."

## 2. Our Best Features (Focus heavily on these)
- **The Anti-Cheat Interceptor:** If a user tries to close the tab or browse to a new page, passing standard React boundaries, we hooked directly into the core browser's network APIs using `useRef` to safely freeze the browser and hold their progress. 
- **Adaptive Memory Quizzes:** The database tracks exactly what questions a user has completed and permanently hides those from them, constantly feeding them entirely fresh data unless they request a reset.
- **The Python Auto-Seeder:** We did not sit here typing 400 questions into a manual database. We built a procedural Python algorithm that gathers valid datasets and injects them autonomously into the live server via REST calls.

## 3. Tech Vocabulary to Flex
Make sure to drop these terms naturally when asked:
- "The design utilizes modern **glassmorphism** UI principles and mobile-first Flexbox rendering."
- "The React frontend operates completely **asynchronously** from the backend via REST."
- "User passwords are encrypted via **BCrypt hashes** directly inside the Spring Security wall."
- "We use **JWT (JSON Web Tokens)** to ensure the server remains completely stateless, massively reducing server load."

## 4. The Answer to "What was the hardest bug to fix?"
*Tell them this precise story:*
"The hardest part was forcing Chrome to respect our Quiz-Lock feature. If a student pressed Cmd+R to refresh the page, React's dynamic DOM unmounting was accidentally destroying the warning listener faster than Chrome could trigger it. We had to entirely decouple the logic and bind a native javascript event strictly to the window element upon mounting to force modern browsers to respect the warning popup." 

## 5. Architecture Summary
- React handles all buttons, timers, and rendering.
- Spring Boot intercepts all traffic and checks security keys.
- PostgreSQL reliably stores every answer a user submits.
