# Task Management Application

## Overview

This is a full-stack Task Management application built with React for the frontend and Node.js with Express for the backend. The application allows users to create, read, update, and delete tasks, as well as view task statistics.

## Project Structure

- **Frontend**: Built with React, Vite, and Tailwind CSS.
- **Backend**: Built with Express, connected to a MongoDB database.

## Features

- User authentication and authorization.
- CRUD operations for tasks.
- Task statistics (total, completed, and pending tasks).
- Responsive UI with Tailwind CSS.

## Frontend

### Prerequisites

- Node.js (v16 or higher)
- npm or Yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-management-app.git

## Frontend Setup

To set up and run the frontend of the project, follow these steps:

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
2. **Install dependencies:**



   ```bash
   npm install

3. **Create a .env file in the frontend directory and add your environment variables:**



   ```bash
   touch .env

4. **Start the development server:**

   ```bash
   npm run dev

## Available Scripts

In the `frontend` directory, you can use the following scripts:

- **`dev`**: `vite`  
  Starts the development server.

- **`build`**: `vite build`  
  Builds the application for production.

- **`lint`**: `eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0`  
  Lints the codebase.

- **`preview`**: `vite preview`  
  Previews the production build.

## Dependencies

This project uses the following dependencies:

- **React**: A library for building user interfaces.
- **React Quill**: A rich text editor for React.
- **Tailwind CSS**: A utility-first CSS framework.
- **Redux**: A state management library.
- **Redux Persist**: A library to persist and rehydrate Redux state.
- **React Router DOM**: Declarative routing for React.
- **DOMPurify**: An HTML sanitizer.

## Dependencies

This project uses the following dependencies:

- **`bcryptjs`**: Version `^2.4.3`
  - A library for hashing passwords.

- **`cookie-parser`**: Version `^1.4.6`
  - Middleware for parsing cookies in Express.

- **`cors`**: Version `^2.8.5`
  - Middleware for enabling Cross-Origin Resource Sharing.

- **`dotenv`**: Version `^16.4.5`
  - Loads environment variables from a `.env` file into `process.env`.

- **`express`**: Version `^4.19.2`
  - A web framework for Node.js.

- **`jsonwebtoken`**: Version `^9.0.2`
  - A library for generating and verifying JSON Web Tokens (JWTs).

- **`mongoose`**: Version `^8.5.2`
  - An object modeling tool for MongoDB and Node.js.

## Dev Dependencies

This project uses the following development dependencies:

- **`nodemon`**: Version `^3.1.4`
  - A utility that automatically restarts the Node.js server when file changes are detected.