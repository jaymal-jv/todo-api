# Todo List REST API

A REST API for managing todo items with user authentication, built with Node.js, Express, Mongoose, MongoDB, and TypeScript.

## Features
- User signup and login with JWT authentication
- CRUD operations for todo items
- CRON job to mark expired todos as completed daily at midnight
- Input validation with Joi
- TypeScript for type safety
- Clean and maintainable code structure

## Prerequisites
- Node.js (>= 16.x)
- MongoDB (local or cloud instance)
- npm

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/jaymal-jv/todo-api
   cd todo-api


## Install dependencies:

npm install


## Create a .env file in the root directory:

PORT=3000
MONGO_URI=mongodb://localhost:27017/todo-api
JWT_SECRET=your_jwt_secret


## Build and start the server:

npm run build
npm start

## For development with hot reloading:

npm run dev


## API Endpoints

Auth
POST /api/auth/signup - Register a new user
POST /api/auth/login - Login and get JWT token


Example Requests
Signup:
curl -X POST http://localhost:3000/api/auth/signup -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'


Login:
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'

Create Todo:
curl -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"title":"Test Todo","dueDate":"2025-05-20T00:00:00Z"}'


get todos

curl --location 'http://localhost:3000/api/todos' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI2OTU4YTViMzk0MTA1YmQ3NDY3N2UiLCJpYXQiOjE3NDczNTkxOTYsImV4cCI6MTc0NzM2Mjc5Nn0.9wGiLoum99z6OeyZosrYQc3fu5icV64-3STV0wlqD9Q' \
--data ''

Update Todo: PUT /api/todos/:id
Delete Todo: DELETE /api/todos/:id