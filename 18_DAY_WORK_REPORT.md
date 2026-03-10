# 📅 18-Day Work Report - Aptitude Practice Application

Here is the simple, day-by-day story of how we built this project from scratch:

## Week 1: Creating the Foundation & Brain

**Day 1:** 
Created empty folders for both the React frontend and Spring Boot backend. Made sure Java and npm we're working.

**Day 2:** 
Designed the main database. Set up PostgreSQL to hold Users, Questions, Options, and tracked Quiz Scores.

**Day 3:** 
Added Security. Built the system that creates secure "JWT virtual keys". When a user logs in, they get a temporary digital key to prove who they are.

**Day 4:** 
Finished the actual Login and Registration pages on the backend. Made sure passwords get scrambled safely when saved so hackers can't read them. Assigned roles so normal users can't delete questions, only Admins.

**Day 5:** 
Wrote the code that lets the App talk to the Database. Specifically, the part where a user asks for "10 Random Questions" and the database hands them over.

**Day 6:** 
Built the score tracker. The system now watches which answers a user clicks, instantly grades them, and saves the history permanently.

**Day 7:** 
Created an automatic "Data Loader". Instead of manually typing questions into the database every time we restart the computer, we wrote scripts that automatically pour hundreds of math and logic questions right into the system.

---

## Week 2: Building the Visual Experience

**Day 8:** 
Started working primarily on the Frontend (React). Made the fundamental core layout so users can click between Home, Login, and Register screens.

**Day 9:** 
Connected the frontend to the backend. When a user clicks "Log In" on the website, React now successfully talks directly to the Java server. 

**Day 10:** 
Made the Website look visually appealing. Added Bootstrap to make everything scale properly on phones or wide monitors. Replaced annoying standard browser popups with beautiful, modern "Toast" notifications sliding in from the corner.

**Day 11:** 
Built the actual Quiz Interface! Added a countdown timer. Built the logic that lets users click A, B, C, or D, and lets them move to the next question. 

**Day 12:** 
Built the Dashboard. Wrote cool math logic that takes all of a student's past quiz scores and draws colorful progress bars (Green for good, Red for bad) depending on their accuracy in different subjects like math or reading.

**Day 13:** 
Created the User Profile page where students can check their status.

**Day 14:** 
Built the Secret Admin Board. Created a secure page that only appears if the user is an Admin, giving them buttons to Add, Edit, or Delete questions live from the website running.

---

## Week 3: Polishing and Perfecting

**Day 15:** 
Spent a whole day making it look premium. Added a deep Dark Mode aesthetic, glowing visual effects, and modern "glassmorphism" components (making boxes look like blurred glass) which is standard in top-tier apps.

**Day 16:** 
Brought everything together. Tested the whole flow: Signing up, clicking an answer, winning points, checking the dashboard. Fixed minor bugs where the website stopped tracking users over time.

**Day 17:** 
Upgraded Anti-Cheat protections. Prevented users from accidentally "Refreshing" the webpage while taking a quiz. Built a robust interceptor that stops the user immediately if they try to close out without submitting.

**Day 18:** 
Cleaned the entire codebase. Re-wrote all documentation so a new developer can jump in instantly. Finalized all PowerPoint presentations, prepared quick launch commands, and prepared the app to be deployed.

---

### 🏆 Final Thoughts
Over 18 days, this project grew from a blank folder to a fully working, secure, and production-ready application. We didn't just build a simple front-end; we built an entire complex backend with military-grade security encryption, complex data relationships, and a genuinely usable learning platform.
