# 🔐 TaskVault – Secure MERN Task Manager

A full-stack task management application built with the **MERN stack**, featuring JWT authentication, cookie-based sessions, and a complete REST API with protected routes.

🌐 **Live Site:** *(Add your deployed link here)*

---

## 📸 Preview

*(Add a screenshot of your app here)*

---

## ✨ Features

- 🔐 User Signup & Login with JWT Authentication
- 🍪 Cookie-based session management
- ✅ Add, View, Update, and Delete tasks
- 🗑️ Bulk delete multiple tasks
- 🔒 Protected routes — only authenticated users can access tasks
- 📡 RESTful API built with Node.js & Express
- ☁️ MongoDB Atlas for cloud database storage

---

## 🛠 Tech Stack

**Frontend:** React.js, React Router, CSS

**Backend:** Node.js, Express.js, JWT, Cookie Parser

**Database:** MongoDB

---

## 📁 Project Structure

```
taskvault/
├── frontend/
│   └── src/
│       ├── components/
│       └── pages/
└── backend/
    ├── server.js
    ├── routes/
    ├── middleware/
    └── models/
```

---

## 📡 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register new user |
| POST | `/login` | Login and get JWT token |

### Task Routes (All Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add-task` | Create a new task |
| GET | `/tasks` | Get all tasks |
| GET | `/task/:id` | Get single task |
| PUT | `/update-task` | Update a task |
| DELETE | `/delete/:id` | Delete single task |
| DELETE | `/delete-multiple` | Delete multiple tasks |

---

## 🔐 JWT Middleware

All task routes are protected using a JWT verification middleware that reads the token from cookies:

```js
function verifyJWTToken(req, resp, next) {
  const token = req.cookies["token"];
  jwt.verify(token, "Google", (error, decoded) => {
    if (error) {
      return resp.send({ msg: "invalid token", success: false });
    }
    next();
  });
}
```

---

## 🚀 Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/sudheermishra/taskvault.git
cd taskvault
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start backend server
```bash
node server.js
```
Server runs on `http://localhost:3200`

### 4. Start frontend
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 📌 Planned Improvements

- Password hashing with bcrypt
- Task categories and priority levels
- Search and filter functionality
- Cloud deployment

---

## 📬 Contact

- **Email:** sudheermishra8587@gmail.com
- **LinkedIn:** [linkedin.com/in/sudheer-mishra-b7302a258](https://www.linkedin.com/in/sudheer-mishra-b7302a258/)
- **GitHub:** [github.com/sudheermishra](https://github.com/sudheermishra)
- **Portfolio:** [sudheermishra.netlify.app](https://sudheermishra.netlify.app)

---

⭐ If you found this useful, feel free to give it a star!
