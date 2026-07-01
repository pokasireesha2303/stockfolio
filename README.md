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
- Dashboard with live stock prices, profit/loss table, and pie chart
- Symbol search with autocomplete powered by Yahoo Finance
- Add and delete stock holdings

### Backend
- RESTful API built with Node.js and Express
- JWT-protected routes for auth and stock CRUD
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
1. Clone the repo and install dependencies:
   git clone https://github.com/pokasireesha2303/stockfolio.git
   cd stockfolio
   npm install
2. Create a .env file with:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
3. Start the server:
   node server.js

### Frontend Setup
1. cd Frontend
2. npm install
3. npm run dev
4. Open http://localhost:5173
