# Stockfolio

## Live Demo
- Frontend: https://stockfolio-woad.vercel.app
- Backend API: https://stockfolio-lv50.onrender.com

## Overview
Stockfolio is a full-stack stock portfolio tracker that lets users sign up, log in, and manage their personal stock and crypto holdings. Each user's portfolio is private and protected with JWT authentication. The app fetches live market prices via Yahoo Finance, calculates real-time profit/loss, and includes a search/autocomplete feature for finding the correct ticker symbol when adding a holding.



## Features

### Authentication
- User signup and login with hashed passwords (bcrypt)
- JWT-based authentication on all stock routes
- Each user can only view, add, or delete their own stocks

### Frontend
- Built with React, Vite, and Tailwind CSS
- Login/Signup forms
- Interactive dashboard displaying:
  - Stock holdings in a table with live current price and profit/loss
  - Portfolio distribution via pie chart
- Symbol search with autocomplete (powered by Yahoo Finance search)
- CRUD operations: add, delete, and view stock holdings

### Backend
- RESTful API built with Node.js and Express
- Routes for authentication (signup/login) and stock CRUD, all protected by JWT middleware
- Live price and profit/loss calculation using yahoo-finance2
- Symbol search endpoint using Yahoo Finance search API

### Database
- MongoDB via MongoDB Atlas
- User schema: name, email, hashed password
- Stock schema: symbol, quantity, buy price, purchase date, linked to user

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Chart.js
- Backend: Node.js, Express, Mongoose
- Database: MongoDB Atlas
- Auth: JWT, bcryptjs
- Market data: yahoo-finance2

## Steps to Run Locally

### Backend Setup
1. Clone the repository:
   git clone https://github.com/pokasireesha2303/stockfolio.git
   cd stockfolio
2. Install dependencies:
   npm install
3. Create a .env file in the root with:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
4. Start the backend server:
   node server.js

### Frontend Setup
1. Navigate to the Frontend folder:
   cd Frontend
2. Install dependencies:
   npm install
3. Start the frontend dev server:
   npm run dev
4. Open the app at http://localhost:5173
