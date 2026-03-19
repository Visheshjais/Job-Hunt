<div align="center">

# 🎯 JobHunt
### A Modern Full-Stack Job Portal

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Hosted-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Connect talent with opportunity · Built with React + Node.js + MongoDB**

[🌐 Live Demo](#) · [🐛 Report Bug](https://github.com/Visheshjais/jobhunt/issues) · [💡 Request Feature](https://github.com/Visheshjais/jobhunt/issues)

</div>

---

## 📖 What is JobHunt?

JobHunt is a full-stack job portal where **job seekers** can search, browse and apply for jobs, and **recruiters** can post jobs, manage companies and review applicants — all in one place.

It features a modern dark gradient UI with pink/purple accents, built entirely from scratch with React, Node.js, Express, MongoDB and Cloudinary.

---

## ✨ Features

- 🔐 **Auth System** — Login, Signup with role-based access (Job Seeker / Recruiter)
- 💼 **Job Listings** — Browse and search jobs with filters
- 🏢 **Company Profiles** — Recruiters can register and manage companies
- 📋 **Admin Dashboard** — Post jobs, view applicants, accept/reject applications
- 📄 **Resume Upload** — Upload and store resumes via Cloudinary
- 🖼️ **Profile Photos** — Upload profile and company logos
- ❤️ **Apply to Jobs** — One-click job applications with status tracking
- 🎨 **Dark Gradient UI** — Modern SaaS-style design with Tailwind CSS
- 📱 **Responsive** — Works on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Vite, Tailwind CSS |
| State | Redux Toolkit |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| File Upload | Cloudinary |
| Auth | JWT + HTTP-only Cookies |
| Hosting | Vercel (frontend + backend) |

---

## 📁 Project Structure
```
jobhunt/
├── frontend/                  ← React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/          ← Login, Signup
│   │   │   ├── admin/         ← Companies, PostJob, Applicants
│   │   │   └── shared/        ← Navbar, Footer
│   │   ├── redux/             ← Auth, Job, Company, Application slices
│   │   ├── hooks/             ← Custom data fetching hooks
│   │   └── utils/             ← API constants
│   └── vercel.json
│
└── backend/                   ← Node.js + Express API
    ├── controllers/           ← User, Job, Company, Application
    ├── models/                ← Mongoose schemas
    ├── routes/                ← API routes
    ├── middlewares/           ← JWT auth middleware
    ├── utils/                 ← DB connection, Cloudinary
    └── vercel.json
```

---

## 🚀 Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/Visheshjais/jobhunt.git
cd jobhunt
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGO_URI=your_mongodb_atlas_uri
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
PORT=8000
NODE_ENV=development
```

### 3. Seed dummy data (optional)
```bash
node seed.js
```
This creates 6 companies + 12 jobs + a test recruiter account.

### 4. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 5. Run Backend
```bash
cd ../backend
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8000 |
| Health Check | http://localhost:8000/api/health |

---

## 🌐 Deployment

| Part | Platform |
|------|----------|
| Frontend | Vercel — Root Directory: `frontend` |
| Backend | Vercel — Root Directory: `backend` |

**Frontend env variable on Vercel:**
```
VITE_API_URL=https://your-backend.vercel.app/api
```

**Backend env variables on Vercel:**
Add all variables from `.env` in Vercel dashboard settings.

---

## 👥 Test Accounts

After running `node seed.js`:

| Role | Email | Password |
|------|-------|----------|
| Recruiter | recruiter@jobhunt.com | password123 |

Create your own Job Seeker account via Sign Up.

---

## 📜 License

MIT License © 2025 Vishesh Jaiswal

---

## 👨‍💻 Author

**Vishesh Jaiswal**
- GitHub: [@Visheshjais](https://github.com/Visheshjais)

---

<div align="center">

Made with ❤️ by **Vishesh Jaiswal**

⭐ Star this repo if you liked it!

</div>
