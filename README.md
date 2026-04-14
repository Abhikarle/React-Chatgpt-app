# 🤖 AbhiGPT – ChatGPT Clone

A modern **ChatGPT clone** built using **React.js** and **Node.js**, featuring real-time chat, conversation history, and a clean UI with authentication modals.

## 🚀 Features

- 💬 Real-time AI chat interface
- 🧠 Conversation history with multiple chats
- 📂 Sidebar chat management
- ⚡ Fast API communication (Node backend)
- 🔐 Login & Signup UI (modal-based)
- 🔔 Toast notifications
- 📱 Responsive and smooth scrolling UI

## 🛠️ Tech Stack

### Frontend
- React.js (Hooks)
- CSS

### Backend
- Node.js
- Express.js

---

## 📁 Project Structure

project-root/
│
├── server.js # Backend server
├── package.json
├── package-lock.json
│
├── src/
│ ├── App.js # Main React component
│ ├── index.js
│ ├── index.css
│
└── README.md


---

## ⚙️ How It Works

- User enters a prompt
- Request is sent to backend (`/completions`)
- Backend processes AI response
- Chat history is stored in state
- Conversations are grouped by titles

---

## 🔧 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/abhigpt.git
cd abhigpt
2️⃣ Install Dependencies
npm install
3️⃣ Start Backend Server
node server.js

Server runs on:

http://localhost:8000
4️⃣ Start Frontend
npm start

App runs on:

http://localhost:3000
🔌 API Endpoint
POST /completions

Request Body:

{
  "message": "Hello",
  "history": []
}

Response:
AI generated text response
🎯 Key Functionalities

🆕 New Chat
Clears current conversation
Starts fresh thread

📜 Chat History
Stored in state
Grouped by unique titles

🔄 Switching Chats
Click previous chat from sidebar

🔐 Authentication UI
Login / Signup modals
Toast notifications for success

🎨 UI Highlights
Smooth auto-scroll to latest message
Disabled input while waiting for response
Clean and minimal layout
Sidebar navigation like ChatGPT


Limitations
No real authentication (UI only)
Chat history not persisted (state only)
No database integration

✨ Future Improvements
🔐 Add real authentication (JWT)
🗄️ Store chats in database (MongoDB)
🌍 Deploy to cloud (Vercel + Render)
🎙️ Voice input support
🌙 Dark mode

🤝 Contributing

Feel free to fork and improve!

1) Fork repo
2) Create branch
3) Make changes
4) Submit PR

👨‍💻 Author

Abhi

GitHub: https://github.com/Abhikarle