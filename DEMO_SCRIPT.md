# 🎬 AptitudePro - Presentation Demo Script

*Use this script if you get nervous. It tells you exactly what to click and say during your live presentation.*

## ✅ Before You Start
- Make sure BOTH terminal windows are successfully running.
- Make sure the website (`http://localhost:3000`) is open.

---

## 🎯 THE DEMO (5 Minutes Total)

### **1. The Introduction (30 seconds)**

**Say:** 
> "Hello everyone! Today I want to show you my project, **AptitudePro**. It's a fully functional web platform designed to help students practice for high-tier tech interviews. Let me show you how it works."

**Do:**
- Show the homepage and scroll down slightly.

---

### **2. Showing Login & Security (1 minute)**

**Say:**
> "To begin, the entire platform is secure. Let's log in as a student."

**Do:**
- Click "Login". Use an account you've already made (or make one really fast).
- When the green popup appears, point it out.

**Say:**
> "As soon as I log in, the backend Java server checks my hashed password and gives my browser a secure digital key (JWT) so I can safely access all private features."

---

### **3. Explaining the Main Engine: The Quiz (2 minutes)**

**Say:**
> "Now let's take a quiz. Our system uses a smart algorithm. It physically searches the database for questions you have *never* answered before. It won't give you repeats until you finish everything."

**Do:**
- Click the "Quizzes" button on the sidebar.
- Click a category (like Quantitative Aptitude).
- Point to the active countdown timer.
- Click an answer. Show them the green/red feedback text immediately. 

**Say:**
> "The quiz limits you to 10 questions. Notice the active timer? If that timer hits zero, the quiz automatically rips control away and forces a submission, just like a real corporate exam."

**Do (Important Trick):**
- Click another link on the sidebar (like Profile) while the quiz is open. 
- A dark warning box should pop up.

**Say:**
> "If a student tries to click away, or refresh the page to artificially pause time, we physically intercept the browser and lock them in to prevent accidental data-loss or cheating."

---

### **4. Showing the Math: The Dashboard (1 minute)**

**Say:**
> "Once you finish a quiz, the system calculates everything in real-time."

**Do:**
- Go to the Dashboard.
- Show them the colored progress bars (green, yellow, red).

**Say:**
> "The dashboard takes all of your historical data from the PostgreSQL database and renders clear progress bars. Green means you have high accuracy, red means you need to study more in that subject."

---

### **5. Closing Statement (30 seconds)**

**Say:**
> "Unlike a standard beginner website, AptitudePro features deep backend encryption, intelligent algorithms ensuring you don't answer duplicate questions, robust UI interaction limits, and is fully responsive on mobile. Thank you!"

---

### ⚠️ Pro-Tips for Common Questions
- **"How does the database get filled with questions?"**  
  *Answer:* "We actually built a completely separate Python script that reaches out to the web and rapidly seeds the database automatically, completely avoiding manual data entry!"
- **"Is it scalable?"**  
  *Answer:* "Yes, we decoupled the frontend and backend. Meaning if the site gets popular, we can duplicate the Java servers separately from the React site."
