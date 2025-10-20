# 🗓️ Event Reminder App

A **full-stack Event Reminder Application** built with **React (Vite)** and **Node.js (Express)** that allows users to **sign up, log in, create events, and receive reminders** automatically.  
The backend is deployed on **Render**, and the frontend is deployed on **Vercel**.

---

## 🚀 Tech Stack

**Frontend:** React + Vite, Axios, React Router DOM, CSS3 / Tailwind  
**Backend:** Node.js + Express.js, MongoDB + Mongoose, dotenv, CORS, JWT Authentication

---

## 📂 Folder Structure

```
event-reminder-app/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   └── eventRoutes.js
│   ├── models/
│   │   ├── User.js
│   │   └── Event.js
│   ├── utils/
│   │   └── sendReminderScheduler.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=https://event-reminder-5f1d6e24p-vivek-dixits-projects.vercel.app/
```

### Run Server
```bash
npm start
```
Server: `http://localhost:4000`

---

## 💻 Frontend Setup

```bash 
cd frontend
npm install
```

### Create `.env` file

```
VITE_API_BASE_URL='https://event-reminder-aqr9.onrender.com/api
```

### Run Frontend
```bash
npm run dev
```
App: `http://localhost:5173`

---

## 🔐 Authentication Flow

1. User signs up → backend stores hashed password.  
2. On login → backend returns JWT token.  
3. Frontend saves token in localStorage.  
4. Protected routes require `Authorization: Bearer <token>` header.

---

## 📅 Event Management API

| Method | Endpoint | Description |
|--------|-----------|--------------|
| POST | `/api/events/add` | Create new event |
| GET | `/api/events` | Fetch all events |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |

---

## ⏰ Reminder Scheduler (Optional)

```js
import cron from "node-cron";
import sendReminder from "./sendReminder.js";

const startScheduler = () => {
  cron.schedule("*/30 * * * *", sendReminder);
};
export default startScheduler;
```

---

## 🌐 Deployment Steps

### Backend (Render)
1. Push to GitHub → Import on Render  
2. Add environment variables  
3. Build Command: `npm install`  
4. Start Command: `npm start`  

### Frontend (Vercel)
1. Push to GitHub → Import on Vercel  
2. Add env variable `VITE_API_BASE_URL`  
3. Deploy ✅

---

## 🧠 Features

- JWT Auth System  
- Event CRUD Operations  
- Optional Scheduler  
- MongoDB Database  
- Responsive UI  
- Cloud Deployed (Render + Vercel)

---

## 👨‍💻 Author

**Vivek Kumar Dixit**  
Full Stack Developer  
[GitHub](https://github.com/vivekdixitvnd/Event-Reminder) | [LinkedIn](https://linkedin.com/vivek-vnd)

---

## 📝 License

Licensed under the **MIT License**.
