# 🛒 FreshMart Backend

This is the backend API for FreshMart(SuperMarket E-Commerce) — an online grocery store platform.

## 🚀 Features

- User authentication (Register, Login) using JWT
- Role-based access control (Admin/User)
- Product browsing
- Product & category management(Admin)
- Order placement and tracking
- Stock validation before placement
- Payment gateway integration with Paystack
- Password reset with email (Nodemailer)

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- Nodemailer (Emailing)
- Paystack (Payment Integration)
- Dotenv(for environment variables)

## 🏗️ Project Structure
freshmart-backend/
controllers/ # Handle requests 
models/ # Mongoose schemas
routes/ # Api route definitions
middleware/ # Auth, role-based middleware
utils/ # Utility function(sendEmail)
.env / # Environment variables
index.js / # Entry point
package.json / # Dependencies & scripts
README.md / # Project documentation



## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/freshmart-backend.git
cd freshmart-backend

###2. Install Dependencies
npm install 

### 3. Environment Variables
PORT  # port server runs on
MONGODB_URL # MongoDB connection string
JWT_SECRET # Secret key for signing JWT tokens
PAYSTACK_SECRET_KEY # secret key for paystack
PAYSTACK_PUBLIC_KEY # public key for paystack
BASE_URL # your backend base URL 
ACCESS_TOKEN # to generate access token
EMAIL # Sender email for nodemailer
EMAIL_PASSWORD # Gmail app password


### 4. Run the Server
npm run start


📬 API Overview

🔐 Auth Routes
| Method | Route              | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login user          |

🛍️ Product Routes

| Method | Route              | Access | Description       |
| ------ | ------------------ | ------ | ----------------- |
| GET    | /api/products      | Public | List all products |
| POST   | /api/products      | Admin  | Create a product  |
| PUT    | /api/products/\:id | Admin  | Update a product  |
| DELETE | /api/products/\:id | Admin  | Delete a product  |

🗂️ Category Routes

| Method | Route                | Access | Description         |
| ------ | -------------------- | ------ | ------------------- |
| GET    | /api/categories      | Public | List all categories |
| POST   | /api/categories      | Admin  | Create a category   |
| PUT    | /api/categories/:id | Admin  | Update a category   |
| DELETE | /api/categories/:id | Admin  | Delete a category   |

🧾 Order Routes
| Method | Route                 | Access | Description                 |
| ------ | --------------------- | ------ | --------------------------- |
| POST   | /api/orders           | User   | Place an order              |
| GET    | /api/orders/my-orders | User   | Get logged-in user's orders |


💳 Payment (Paystack)

## Initialize Transaction: POST /api/payment/start

## Verify Payment: GET /api/payment/verify/:reference


✉️ Email Integration
Nodemailer is used for password reset functionality. When a user forgets their password, an email is sent with a reset link using Gmail SMTP.

🧑‍💻 Author
Sarah Victoria Shittu

📄 License
This project is licensed under the MIT License
