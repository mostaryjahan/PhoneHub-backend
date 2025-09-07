# phone-hub Server – Backend

#### Live Link: https://phonehub-server.vercel.app

## Overview

The **phone-hub Server** is a backend API for managing users, car products, cart items, and orders. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** using **Mongoose**, it provides a robust and scalable solution for a car shop e-commerce platform with full CRUD operations, secure authentication, and inventory management capabilities.

---

## Features

- **Express.js** for server and RESTful API development  
- **TypeScript** for strong typing and maintainability  
- **Mongoose** for seamless MongoDB interaction  
- **Zod** for schema validation  
- **JWT (JSON Web Tokens)** for secure authentication  
---

## API Endpoint
### User Management
- `POST /api/users/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user and return a JWT
- `GET /api/users/profile`: Get the authenticated user's profile
- `PUT /api/users/profile`: Update the authenticated user's profile
- `GET /api/users`: Get a list of all users (admin only)
- `DELETE /api/users/:id`: Delete a user by ID (admin only)
### Product Management
- `POST /api/phones`: Add a new product 
- `GET /api/phones`: Get a list of all phones
- `GET /api/phones/:id`: Get a product by ID
- `PUT /api/phones/:id`: Update a product by ID 
- `DELETE /api/phones/:id`: Delete a product by ID 
### Cart Management
- `POST /api/cart`: Add an item to the cart
- `GET /api/cart`: Get the authenticated user's cart items
- `PUT /api/cart/:id`: Update a cart item by ID
- `DELETE /api/cart/:id`: Remove a cart item by ID
### Order Management
- `POST /api/orders`: Create a new order
- `GET /api/orders`: Get the authenticated user's orders
- `GET /api/orders/:id`: Get an order by ID
- `PUT /api/orders/:id`: Update an order by ID 
- `DELETE /api/orders/:id`: Delete an order by ID 


## Error Handling

- **Validation Errors**: Detailed messages for invalid inputs using Zod and Joi  
- **404 Not Found**: Graceful handling of non-existent routes, products, or orders  
- **Generic Errors**: Clear error messages with stack traces in development  

---

## Technologies Used

- **Backend Framework**: Node.js with Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Language**: TypeScript  
- **Validation**: Zod and Joi  
- **API Architecture**: RESTful  

---

## Project Setup

###  Prerequisites

Ensure you have the following installed:

- Node.js (v14 or above)  
- npm (v6 or above)  
- MongoDB (local or cloud-based)  

---

### Installation

1. git clone: https://github.com/mostaryjahan/PhoneHub-backend.git
2. cd PhoneHub-backend
3. npm install
4. create .env file and keep
  DATABASE_URL=your_mongodb_connection_string
  PORT=5000
 npm run start:dev
