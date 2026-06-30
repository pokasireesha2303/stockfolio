# Stockfolio

## Overview
Stockfolio is a full-stack web application that allows users to manage and track their stock holdings. The application provides functionality to add, view, edit, and delete stock holdings, along with tracking total portfolio value. A dashboard displays key portfolio metrics including total value and a visual breakdown via pie chart.

## Features

### Frontend
- Built with React and Tailwind CSS for a clean, responsive interface
- Interactive dashboard displaying:
  - Total portfolio value
  - Portfolio distribution via pie chart
- CRUD operations:
  - Add and edit stock details (symbol, quantity, buy price)
  - Delete stock holdings
  - View current holdings in a tabular format

### Backend
- RESTful API built with Node.js and Express
- Routes for creating, reading, updating, and deleting stock records

### Database
- MongoDB database via MongoDB Atlas
- Schema designed to store stock details: symbol, quantity, buy price, and purchase date

## Steps to Run the Project Locally

### Prerequisites
- Node.js and npm installed

### Backend Setup
1. Clone the repository: