# Micro Skill Sharing Platform — Backend API Service

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://mongoosejs.com/)

RESTful API backend service for the **Micro Skill Sharing Platform**, designed to facilitate peer-to-peer knowledge exchange, learning requests, user skill offers, reviews, and transaction workflows.

Built as part of **CSE471 (System Analysis and Design)** at BRAC University.

---

## 🏗️ Architecture & Features

- **Modular MVC Architecture**: Clean separation between routes, controllers, and Mongoose data models.
- **RESTful Endpoints**: Full CRUD capabilities for skill listings, help requests, user profiles, reviews, and bookings.
- **Data Modeling & Validation**: Structured schemas with strict relationship modeling in MongoDB.
- **Cross-Origin Resource Sharing (CORS)** enabled for seamless connection with the frontend client.
- **Environment Configuration**: Robust environment variable management via `dotenv`.

---

## 📦 Project Structure

```
micro-skill-backend/
├── controllers/          # Business logic handlers
│   ├── authController.js
│   ├── requestController.js
│   ├── reviewController.js
│   ├── skillController.js
│   └── userController.js
├── models/               # Mongoose schema definitions
│   ├── Request.js
│   ├── Review.js
│   ├── Skill.js
│   └── User.js
├── routes/               # Express API route declarations
│   ├── authRoutes.js
│   ├── requestRoutes.js
│   ├── reviewRoutes.js
│   ├── skillRoutes.js
│   └── userRoutes.js
├── .env.example          # Sample environment variables
├── .gitignore            # Ignored files (node_modules, .env)
├── CODE_SNIPPETS.md      # Code reference snippets
├── POSTMAN_MANUAL.md     # Comprehensive Postman test documentation
├── server.js             # Application entrypoint & DB connection
└── package.json          # Dependencies & scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
# Windows PowerShell
Copy-Item .env.example .env
```
Configure your `.env`:
```env
PORT=1675
MONGO_URI=mongodb://127.0.0.1:27017/micro-skill-db
```

### 4. Running the Server
```bash
# Production start
npm start

# Development mode
npm run dev
```

Server will run on `http://127.0.0.1:1675` with connected MongoDB.

---

## 🧪 Testing with Postman
Refer to [POSTMAN_MANUAL.md](./POSTMAN_MANUAL.md) for full endpoint collections, sample payloads, and test procedures.

---

## 👨‍💻 Author & Contributions
- **B. M. Muktadir Wafi** (GitHub: [@RedRabies](https://github.com/RedRabies))
- Core Contribution: Backend architecture, database schema design, Express REST API development, and testing suites.
