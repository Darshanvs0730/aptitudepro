# 🚀 AptitudePro - Startup Commands & Database Access

## 📋 Quick Start Commands

### **1. Start PostgreSQL Database** (if not already running)

```bash
# Check if PostgreSQL is running
pg_isready

# If not running, start it (macOS with Homebrew)
brew services start postgresql@14

# Or start manually
pg_ctl -D /opt/homebrew/var/postgresql@14 start
```

### **2. Start Backend (Spring Boot)**

```bash
# Navigate to Backend directory
cd /Users/darshan/Desktop/aptitude-practice/Backend

# Start Spring Boot application
mvn spring-boot:run
```

**Expected Output:**
- Server starts on `http://localhost:8080`
- Look for: `Tomcat started on port 8080`
- Database connection: `HikariPool-1 - Start completed`

**Wait for:** `Started AptitudePracticeApplication` message

---

### **3. Start Frontend (React)**

**Open a NEW terminal window/tab:**

```bash
# Navigate to frontend directory
cd /Users/darshan/Desktop/aptitude-practice/frontend

# Start React development server
npm start
```

**Expected Output:**
- Browser automatically opens to `http://localhost:3000`
- If not, manually open: `http://localhost:3000`
- Look for: `webpack compiled successfully`

---

## 🗄️ Database Access Commands

### **Connect to PostgreSQL Database**

```bash
# Basic connection
psql -U darshan -d aptitude_db

# Or with explicit host and port
psql -h localhost -p 5432 -U darshan -d aptitude_db
```

### **Useful Database Commands**

Once connected to PostgreSQL (`psql` prompt):

```sql
-- List all tables
\dt

-- Describe a table structure
\d users
\d questions
\d attempt_history

-- View all users
SELECT id, username, email FROM users;

-- View all questions
SELECT id, question_text, difficulty FROM questions LIMIT 10;

-- View question count
SELECT COUNT(*) FROM questions;

-- View questions by category
SELECT c.name, COUNT(q.id) as question_count 
FROM questions q 
JOIN categories c ON q.category_id = c.id 
GROUP BY c.name;

-- View user attempts
SELECT u.username, COUNT(a.id) as total_attempts
FROM users u
LEFT JOIN attempt_history a ON u.id = a.user_id
GROUP BY u.username;

-- View admin user
SELECT id, username, email FROM users WHERE username = 'admin';

-- Exit psql
\q
```

### **Quick Database Queries (One-liners)**

```bash
# Count total questions
psql -U darshan -d aptitude_db -c "SELECT COUNT(*) FROM questions;"

# View all categories
psql -U darshan -d aptitude_db -c "SELECT id, name FROM categories;"

# View questions by category and difficulty
psql -U darshan -d aptitude_db -c "SELECT c.name, q.difficulty, COUNT(*) FROM questions q JOIN categories c ON q.category_id = c.id GROUP BY c.name, q.difficulty;"

# View all users
psql -U darshan -d aptitude_db -c "SELECT id, username, email FROM users;"

# Check database connection
psql -U darshan -d aptitude_db -c "SELECT version();"
```

---

## 🔑 Database Credentials

**Database Name:** `aptitude_db`  
**Username:** `darshan`  
**Password:** (empty - no password)  
**Host:** `localhost`  
**Port:** `5432`

---

## 📊 Database Tables

1. **users** - User accounts
2. **roles** - User roles (ADMIN, USER)
3. **user_roles** - User-role mapping
4. **categories** - Question categories
5. **questions** - Quiz questions
6. **options** - Multiple choice options
7. **explanations** - Question explanations
8. **attempt_history** - User quiz attempts

---

## 🎯 Complete Startup Sequence

### **Terminal 1 - Backend:**
```bash
cd /Users/darshan/Desktop/aptitude-practice/Backend
mvn spring-boot:run
```

### **Terminal 2 - Frontend:**
```bash
cd /Users/darshan/Desktop/aptitude-practice/frontend
npm start
```

### **Terminal 3 - Database (Optional, for queries):**
```bash
psql -U darshan -d aptitude_db
```

---

## ✅ Pre-Presentation Checklist

Before your presentation, verify:

- [ ] PostgreSQL is running
  ```bash
  pg_isready
  ```

- [ ] Backend is running on port 8080
  ```bash
  curl http://localhost:8080/api/auth/ping
  ```
  Should return: `Backend is reachable!`

- [ ] Frontend is running on port 3000
  - Open browser to `http://localhost:3000`
  - Should see the homepage

- [ ] Database is accessible
  ```bash
  psql -U darshan -d aptitude_db -c "SELECT COUNT(*) FROM questions;"
  ```
  Should return: `37` (or current question count)

- [ ] Admin credentials work
  - Username: `admin`
  - Password: `admin123`

---

## 🔧 Troubleshooting Commands

### **If Backend Won't Start:**

```bash
# Check if port 8080 is already in use
lsof -i :8080

# Kill process on port 8080 (if needed)
kill -9 $(lsof -t -i:8080)

# Check Java version
java -version

# Clean and rebuild
cd Backend
mvn clean
mvn spring-boot:run
```

### **If Frontend Won't Start:**

```bash
# Check if port 3000 is already in use
lsof -i :3000

# Kill process on port 3000 (if needed)
kill -9 $(lsof -t -i:3000)

# Clear npm cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### **If Database Connection Fails:**

```bash
# Check if PostgreSQL is running
pg_isready

# Check PostgreSQL version
psql --version

# List all databases
psql -U darshan -l

# Check database exists
psql -U darshan -d aptitude_db -c "\l"
```

---

## 🎤 Quick Commands for Presentation

**During presentation, if you need to show database:**

```bash
# Show question count
psql -U darshan -d aptitude_db -c "SELECT COUNT(*) as total_questions FROM questions;"

# Show categories
psql -U darshan -d aptitude_db -c "SELECT name FROM categories;"

# Show user stats
psql -U darshan -d aptitude_db -c "SELECT username, email FROM users LIMIT 5;"
```

---

## 📝 Environment Details

**Backend:**
- Port: `8080`
- URL: `http://localhost:8080`
- API Base: `http://localhost:8080/api`

**Frontend:**
- Port: `3000`
- URL: `http://localhost:3000`

**Database:**
- Port: `5432`
- Database: `aptitude_db`
- Username: `darshan`

---

## 🚨 Emergency Restart (If Something Breaks)

```bash
# Stop everything
pkill -f "spring-boot:run"
pkill -f "react-scripts"
pkill -f "node.*start"

# Restart Backend
cd /Users/darshan/Desktop/aptitude-practice/Backend
mvn spring-boot:run

# Restart Frontend (new terminal)
cd /Users/darshan/Desktop/aptitude-practice/frontend
npm start
```

---

## 💡 Pro Tips

1. **Start Backend first** - It takes longer to start
2. **Wait for "Started AptitudePracticeApplication"** before starting frontend
3. **Keep 3 terminals open** - One for backend, one for frontend, one for database queries
4. **Test the connection** - Use `curl http://localhost:8080/api/auth/ping` to verify backend
5. **Check browser console** - If frontend has errors, check browser DevTools

---

**Good luck with your presentation! 🎉**

python3 generate_questions.py