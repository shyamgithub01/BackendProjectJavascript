# YouTube-Based Web Application Backend

## Overview

This is the backend service for a YouTube-based web application, providing user authentication, file uploads, and interactions with a MongoDB database. The backend is built with Express.js and includes features for user registration, login, and file management.

## Features

- **User Registration and Login**: Allows users to register and log in using email or username.
- **Token Generation**: Issues access and refresh tokens for authenticated users.
- **File Uploads**: Supports avatar and cover image uploads to Cloudinary.
- **Error Handling**: Provides structured error responses using custom error classes.

## Technologies Used

- **Node.js**
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM for MongoDB.
- **Bcrypt**: Password hashing.
- **JWT**: JSON Web Tokens for authentication.
- **Cloudinary**: Cloud storage for file uploads.
- **Multer**: Middleware for handling multipart/form-data.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary Account](https://cloudinary.com/)

### Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/youtube-webapp-backend.git
   cd youtube-webapp-backend
