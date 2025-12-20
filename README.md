# 🎮 GameStore - Online Game Store Platform

A full-stack web application for buying and reviewing games, built with React (Frontend) and Laravel (Backend).

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Admin Access](#admin-access)

---

## 🎯 Overview

GameStore is a modern e-commerce platform for digital games. Users can browse games, add them to cart, make purchases, and leave reviews. The platform includes a comprehensive admin dashboard for managing all content.

---

## ✨ Features

### 🛒 User Features
| Feature | Description |
|---------|-------------|
| **Browse Games** | View all available games with category filtering |
| **Game Details** | See detailed information, features, and reviews for each game |
| **Shopping Cart** | Add games to cart and manage quantities |
| **Checkout** | Purchase games with a simple checkout process |
| **User Reviews** | Leave ratings and reviews for purchased games |
| **User Profile** | Manage account settings and view purchase history |
| **Wishlist** | Save games for later |

### 🔐 Authentication
| Feature | Description |
|---------|-------------|
| **Register** | Create new account with email and password |
| **Login** | Secure authentication with token-based sessions |
| **Logout** | Clear session and token |
| **Protected Routes** | Certain pages require authentication |

### 👨‍💼 Admin Features
| Feature | Description |
|---------|-------------|
| **Dashboard** | Overview of total games, users, revenue, and sales |
| **Game Management** | Add, edit, delete, and toggle game visibility |
| **User Management** | View all users and delete accounts |
| **Review Management** | View and moderate all reviews |
| **Statistics** | Games by category breakdown |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **CSS Modules** - Component-scoped styling
- **Lucide React** - Icon library
- **Context API** - State management (Auth, Cart, Router)

### Backend
- **Laravel 10** - PHP Framework
- **MySQL** - Database
- **Sanctum** - API Authentication
- **Eloquent ORM** - Database operations

---

## 📁 Project Structure

```
Website-BL/
├── bl-backend/                 # Laravel Backend
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── AdminController.php
│   │   │   ├── AuthController.php
│   │   │   ├── GameController.php
│   │   │   ├── PurchaseController.php
│   │   │   └── ReviewController.php
│   │   ├── Models/
│   │   │   ├── Game.php
│   │   │   ├── Purchase.php
│   │   │   ├── Review.php
│   │   │   └── User.php
│   │   └── Middleware/
│   │       └── AdminMiddleware.php
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   │   └── api.php
│   └── .env
│
└── FE-DASAR/frontend/          # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.tsx
    │   │   ├── GameCard.tsx
    │   │   └── ...
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── GamesPage.tsx
    │   │   ├── GameDetailPage.tsx
    │   │   ├── CartPage.tsx
    │   │   ├── LoginPage.tsx
    │   │   ├── RegisterPage.tsx
    │   │   ├── ProfilePage.tsx
    │   │   └── AdminPage.tsx
    │   ├── context/
    │   │   ├── AuthContext.tsx
    │   │   ├── CartContext.tsx
    │   │   └── RouterContext.tsx
    │   ├── services/
    │   │   └── api.ts
    │   └── types/
    │       └── index.ts
    └── package.json
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+
- PHP 8.1+
- Composer
- MySQL

### Backend Setup

```bash
# Navigate to backend
cd bl-backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Configure database in .env
# DB_DATABASE=gamestore
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed database (optional)
php artisan db:seed

# Start server
php artisan serve
```

### Frontend Setup

```bash
# Navigate to frontend
cd FE-DASAR/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 💻 Usage

### Starting the Application

1. **Start Backend** (Terminal 1):
   ```bash
   cd bl-backend
   php artisan serve
   ```
   Backend runs at: `http://localhost:8000`

2. **Start Frontend** (Terminal 2):
   ```bash
   cd FE-DASAR/frontend
   npm run dev
   ```
   Frontend runs at: `http://localhost:5173`

### Available Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with featured games |
| `/games` | Browse all games |
| `/games/:id` | Game detail page |
| `/cart` | Shopping cart |
| `/login` | User login |
| `/register` | User registration |
| `/profile` | User profile & purchases |
| `/wishlist` | User wishlist |
| `/admin` | Admin dashboard (admin only) |

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### Games
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/games` | Get all games |
| GET | `/api/games/:id` | Get game by ID |
| POST | `/api/games` | Create game (admin) |
| PUT | `/api/games/:id` | Update game (admin) |
| DELETE | `/api/games/:id` | Delete game (admin) |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/games/:id/reviews` | Get reviews for game |
| POST | `/api/games/:id/reviews` | Create review |
| DELETE | `/api/games/:id/reviews/:rid` | Delete own review |

### Purchases
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/purchases` | Get user purchases |
| POST | `/api/purchases/checkout` | Checkout cart |
| GET | `/api/purchases/check/:id` | Check game ownership |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET | `/api/admin/users` | Get all users |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/reviews` | Get all reviews |
| DELETE | `/api/admin/reviews/:id` | Delete review |
| GET | `/api/admin/games` | Get all games (inc. hidden) |

---

## 👑 Admin Access

Default admin credentials:
- **Email:** `admin@gamestore.com`
- **Password:** `admin123`

---

## 📝 License

This project is for educational purposes.

---

## 👨‍💻 Author

Developed as part of a web development learning project.
