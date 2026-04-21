# 🛒 E-Commerce Backend

A backend API built with **Node.js, Express.js, MongoDB, and JWT authentication**.  
This project provides APIs for **user authentication with role-based access control (RBAC)**, **product management**, **shopping cart functionality**, and **secure checkout with Stripe**.


## 🚀 Features

### 🔐 User Management
- Register new users with validation
- Login with JWT authentication
- Update user profile securely
- Role-based access control (Admin, Seller, User)

### 📦 Product Management
- Create products (restricted to Admin/Seller roles)

### 🛍️ Cart Management
- Add or update cart items
- Retrieve cart details
- Supports guest users as well as authenticated users

### 💳 Checkout
- Stripe checkout session creation for secure payments

## 🛠️ Tech Stack
- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **JWT** – Authentication tokens  
- **bcryptjs** – Password hashing  
- **Stripe** – Payment gateway integration  
- **dotenv** – Environment variable management  
- **morgan** – HTTP request logger  
- **express-validator** – Request validation  

## 🔑 API Endpoints

### 👤 User Routes
- **POST /user** → Register new user (with validation)  
- **POST /loginUser** → Login and receive JWT  
- **PATCH /user** → Update user profile (requires JWT)  

### 📦 Product Routes
- **POST /product** → Create new product  
  - Requires JWT  
  - Restricted to Admin/Seller roles  

### 🛍️ Cart Routes
- **POST /cart** → Create or update cart (supports guest & authenticated users)  
- **GET /cart** → Retrieve cart details  

### 💳 Checkout Routes
- **POST /checkout** → Create Stripe checkout session  
