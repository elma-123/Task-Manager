# Task Manager System

A full-stack Task Manager System developed using React.js, Node.js, Express.js, JWT Authentication, and bcrypt password encryption. The system provides separate Admin and User panels with role-based access control, allowing administrators to manage users and tasks efficiently while enabling users to view and complete assigned tasks.

## Features

### Authentication & Authorization

* Secure user authentication using JWT (JSON Web Token)
* Password encryption using bcrypt
* Role-based access control (Admin/User)
* Protected routes and secure API endpoints

### Admin Features

* Admin Login
* Dashboard with statistics overview
* Create User
* View All Users
* Search Users
* Update User Information
* Delete Users
* Assign Tasks to Users
* View All Tasks
* Search Tasks
* Update Tasks
* Delete Tasks
* Monitor task completion status

### User Features

* User Login
* View Assigned Tasks
* Complete Assigned Tasks
* View Task Status
* Secure Logout

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt Password Hashing

### Data Storage

* JSON File-Based Storage

### Testing

* Postman API Testing

## Project Structure

```text
Task Manager
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── data
│   ├── server.js
│   └── package.json
│
└── frontend
    ├── src
    │   ├── pages
    │   ├── components
    │   ├── services
    │   └── App.jsx
    └── package.json
```

## API Functionalities

### User Management

* Create User
* Read Users
* Update User
* Delete User
* Search User

### Task Management

* Create Task
* Read Tasks
* Update Task
* Delete Task
* Search Task

## Installation

### Clone Repository

```bash
git clone https://github.com/elma-123/Task-Manager
```

### Backend Setup

```bash
cd backend
npm install
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Application URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:9000
```

## Learning Outcomes

This project demonstrates practical implementation of:

* Full Stack Web Development
* RESTful API Design
* Authentication and Authorization
* Password Security using bcrypt
* JWT Token Management
* CRUD Operations
* Role-Based Access Control
* React Component Architecture
* API Integration using Axios
* Frontend and Backend Communication

## Future Enhancements

* Database Integration (MongoDB/MySQL)
* Email Notifications
* Task Priority Management
* File Attachments
* Advanced Dashboard Analytics
* Real-Time Notifications
* Mobile Responsive Design Improvements


