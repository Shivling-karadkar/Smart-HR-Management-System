🏆 Smart HR Management System - Backend
This is the **backend** of a **Smart HR Management System** built using **Node.js, Express, and MongoDB**.  
It automates common HR tasks like managing candidates, scheduling interviews, tracking employees, leave requests, and real-time notifications.  

🚀 Features
  - Candidate Management (applications, resumes, status tracking)
  - Interview Scheduling (with email alerts via Nodemailer)
  - Employee Management (CRUD + search/filter)
  - Leave Management (apply/approve/reject)
  - Real-time Notifications (Socket.io)
  - JWT Authentication & Secure Passwords
  - Analytics-ready APIs for dashboards

🛠 Tech Stack
  - **Backend:** Node.js, Express  
  - **Database:** MongoDB + Mongoose  
  - **Auth:** JWT + bcrypt  
  - **File Uploads:** Multer  
  - **Email:** Nodemailer  
  - **Real-time:** Socket.io

📂 Project Structure
backend/
│── config/ # DB connection, email config
│── controllers/ # Request handlers
│── middlewares/ # JWT auth, error handling
│── models/ # MongoDB schemas
│── routes/ # API routes
│── utils/ # Helpers
│── uploads/ # Resume uploads (gitignored)
│── .env # Environment variables (not in repo)
│── server.js # Entry point
│── package.json
│── README.md

⚙️ Setup
  1️⃣ Clone the repo
      https://github.com/Shivling-karadkar/Smart-HR-Management-System/new/main?filename=README.md
      cd backend
  2️⃣ Install dependencies
      npm install
  3️⃣ Create .env file
    PORT=5000
    MONGO_URI=your_mongo_connection
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email
    EMAIL_PASS=your_email_password
  4️⃣ Run the server
    npm run dev
    
  Server runs at: http://localhost:5000
📌 API Endpoints
  🔑 Auth
      POST /auth/register → Register HR/Employee
      POST /auth/login → Login & get token
      
  👩‍💼 Candidates
      POST /candidates → Add candidate
      GET /candidates → Get candidates
      PUT /candidates/:id → Update status
      DELETE /candidates/:id → Delete candidate
      
  📅 Interviews
      POST /interviews → Schedule interview
      GET /interviews → Get all interviews
      
  🧑‍🤝‍🧑 Employees
      POST /employees → Add employee
      GET /employees → Get employees
      PUT /employees/:id → Update employee
      DELETE /employees/:id → Delete employee
      
  🌴 Leaves
      POST /leaves → Apply leave
      GET /leaves → Get leaves
      PUT /leaves/:id → Approve/Reject leave

  📊 Dashboard APIs
      /dashboard/summary → employees, leaves, candidates
      /dashboard/graph → data for charts

  🤝 Contribution
      This repo is backend-only.
      👉 If you’re a React frontend developer, feel free to build the UI and integrate these APIs.
      Ping me and I’ll tag you in the showcase 🚀
      
  🔐 Security
      JWT authentication
      Bcrypt password hashing
      .env file (gitignored)

  📜 License
      MIT License

  👤 Author
      Focused on Backend Development (Node.js + Express + MongoDB).
      LinkedIn: https://www.linkedin.com/in/shivling-karadkar-154181297/
     
