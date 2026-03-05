# TaskVault – Full Stack Task Management Application

TaskVault is a **full-stack task management web application** where users can create, update, and manage their tasks securely.  
The application includes **user authentication using JWT tokens** and a **REST API built with Node.js, Express, and MongoDB**, along with a **React frontend**.

Users can sign up, log in, and manage their tasks efficiently.

---

## 🚀 Features

- User Signup & Login
- JWT Authentication
- Add New Tasks
- View All Tasks
- Update Existing Tasks
- Delete Single Task
- Delete Multiple Tasks
- Protected Routes
- RESTful API
- Cookie-based authentication

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Vanilla CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JSON Web Token (JWT)
- Cookie Parser

---



## 📡 API Endpoints

### Authentication

#### Signup
```
POST /signup
```

Request Body

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

Response

```json
{
  "message": "signup done",
  "success": true,
  "token": "JWT_TOKEN"
}
```

---

#### Login

```
POST /login
```

Request Body

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

Response

```json
{
  "success": true,
  "msg": "login done",
  "token": "JWT_TOKEN"
}
```

---

### Tasks

#### Add Task
```
POST /add-task
```

Protected Route

---

#### Get All Tasks
```
GET /tasks
```

Protected Route

---

#### Get Single Task
```
GET /task/:id
```

Protected Route

---

#### Update Task
```
PUT /update-task
```

Protected Route

---

#### Delete Task
```
DELETE /delete/:id
```

Protected Route

---

#### Delete Multiple Tasks
```
DELETE /delete-multiple
```

Protected Route

---

## 🔐 JWT Middleware

All task routes are protected using JWT verification middleware.

```javascript
function verifyJWTToken(req, resp, next) {
  const token = req.cookies["token"];

  jwt.verify(token, "Google", (error, decoded) => {
    if (error) {
      return resp.send({
        msg: "invalid token",
        success: false
      });
    }
    next();
  });
}
```

---

## ⚙️ Installation & Setup

### 1 Clone the Repository

```
git clone https://github.com/yourusername/taskvault.git
```

---

### 2 Install Dependencies

```
npm install
```

---

### 3 Start Backend Server

```
node server.js
```

Server will run on

```
http://localhost:3200
```

---

### 4 Run Frontend

```
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## 📌 Future Improvements

- Password hashing using bcrypt
- Task categories and priority
- Search and filtering
- Better UI/UX
- Cloud deployment

---

## 👨‍💻 Author

Sudheer Mishra
