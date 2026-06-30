# Stockfolio

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
- Symbol search with autocomplete (powered by Yahoo Finance search) when adding a stock
- CRUD operations:
  - Add stock holdings (symbol, quantity, buy price)
  - Delete stock holdings
  - View current holdings with live price and gain/loss percentage

### Backend
- RESTful API built with Node.js and Express
- Routes for authentication (signup/login) and stock CRUD, all protected by JWT middleware
- Live price and profit/loss calculation endpoint using `yahoo-finance2`
- Symbol search endpoint using `yahoo-finance2`'s search API

### Database
- MongoDB database via MongoDB Atlas
- `User` schema: name, email, hashed password
- `Stock` schema: symbol, quantity, buy price, purchase date, linked to a user via `user` reference field

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Chart.js
- Backend: Node.js, Express, Mongoose
- Database: MongoDB Atlas
- Auth: JWT, bcryptjs
- Market data: yahoo-finance2

## Steps to Run the Project Locally

### Prerequisites
- Node.js and npm installed
- A MongoDB Atlas account and connection string

### Backend Setup
1. Clone the repository: