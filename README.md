﻿# Learning Management System

This is the backend API for the Learning Management System (LMS) that handles user authentication, course management, enrollment, and role-based access control (RBAC).

## Features

- User authentication (login, registration)
- Role-based access control (Admin, Moderator, User)
- Manage courses (Create, Update, Delete)
- Enroll users in courses
- Token-based authentication using JWT
- Secure password storage with hashing

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Variables**: `dotenv`

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/)
- A package manager: `npm` or `yarn`

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Anushka040604/learning-management-system.git
   cd backend

## Install Dependencies

npm install

## To run backend 

npm run dev

## Directory Structure

backend/
├── controllers/
│   ├── authController.js       # Handles user authentication
│   ├── userController.js       # Handles user profile operations
│   ├── courseController.js     # Handles course management
│   └── enrollmentController.js # Handles enrollments
├── db/
│   └── db.js                   # MongoDB connection setup
├── middleware/
│   └── authMiddleware.js       # JWT and role validation
├── models/
│   ├── User.js                 # User schema
│   ├── Course.js               # Course schema
│   └── Enrollment.js           # Enrollment schema
├── routes/
│   ├── authRoutes.js           # Routes for authentication
│   ├── userRoutes.js           # Routes for user operations
│   ├── courseRoutes.js         # Routes for courses
│   └── enrollmentRoutes.js     # Routes for enrollments
├── .env                        # Environment variables
├── server.js                   # Main application entry point
└── package.json                # Project dependencies

## Authentication and Authorization
Authentication: JWT-based. A token must be passed in the Authorization header for protected routes.

## Authorization: Bearer <your_token>
Authorization: Role-based access ensures only users with specific roles can access certain endpoints.

## Troubleshooting
Common Errors
CORS Issues

Ensure the client URL is correctly specified in the cors middleware.
javascript

app.use(cors({
    origin: 'http://localhost:5173', // Update to match your frontend URL
    credentials: true,
}));
Database Connection

Verify the MONGO_URI in your .env file is correct and MongoDB is running.
JWT Errors

Ensure JWT_SECRET in the .env file matches the signing and verification process.

## License
This project is licensed under the MIT License. See the LICENSE file for details.


This file provides all necessary information for developers to install, configure, and run your backend project. Make sure to customize placeholders (e.g., `https://github.com/Anushka040604/learning-management-system.git` or secrets) as needed.
