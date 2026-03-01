# ⚙️ Travel Inspiration Platform — Backend

> REST API server powering the Travel Inspiration Platform — built with Node.js, Express, and Supabase.

---

## 📌 Project Overview

This is the backend service for the Travel Inspiration Platform. It provides a RESTful API that handles destinations, places, activities, culinary items, trips, journals, reviews, deals, and social features. Authentication and database operations are powered by Supabase.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + JWT Middleware |
| ORM / Query | Supabase JS Client |
| File upload | Multer|
|HTTP Cilent | Axios|
| Deployment | Render |

---

## 📡 API Documentation

### Base URL
```
https://your-backend.onrender.com/api
```

### 🔐 Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/register` | Public | Register new user |
| POST | `/auth/login` | Public | Login user |

### 🗺️ Destinations
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/destinations` | Public | Get all destinations |
| GET | `/destinations/:id` | Public | Get destination by ID |
| POST | `/destinations` | Admin | Create destination |
| PUT | `/destinations/:id` | Admin | Update destination |
| DELETE | `/destinations/:id` | Admin | Delete destination |

### 📍 Places
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/places/destination/:destinationId` | Public | Get places by destination |
| POST | `/places` | Admin | Create place |
| PUT | `/places/:id` | Admin | Update place |
| DELETE | `/places/:id` | Admin | Delete place |

### 🎯 Activities
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/activities/destination/:destinationId` | Public | Get activities by destination |
| POST | `/activities` | Admin | Create activity |
| PUT | `/activities/:id` | Admin | Update activity |
| DELETE | `/activities/:id` | Admin | Delete activity |

### 🍽️ Culinary
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/culinary` | Public | Get all culinary items |
| GET | `/culinary/destination/:destinationId` | Public | Get culinary by destination |
| POST | `/culinary` | Admin | Create culinary item |
| PUT | `/culinary/:id` | Admin | Update culinary item |
| DELETE | `/culinary/:id` | Admin | Delete culinary item |

### 🗓️ Trips
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/trips` | Auth | Get user's trips |
| POST | `/trips` | Auth | Create trip |
| PUT | `/trips/:id` | Auth | Update trip |
| DELETE | `/trips/:id` | Auth | Delete trip |

### 📔 Journals
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/journals` | Public | Get all public journals |
| GET | `/journals/:id` | Public | Get journal by ID |
| POST | `/journals` | Auth | Create journal |
| PUT | `/journals/:id` | Auth | Update journal |
| DELETE | `/journals/:id` | Auth | Delete journal |

### ⭐ Reviews
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/reviews/destination/:destinationId` | Public | Get reviews for destination |
| POST | `/reviews` | Auth | Create review |
| PUT | `/reviews/:id` | Auth | Update review |
| DELETE | `/reviews/:id` | Auth | Delete review |

### 🎟️ Deals
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/deals` | Public | Get all active deals |
| GET | `/deals/destination/:destinationId` | Public | Get deals by destination |
| POST | `/deals` | Admin | Create deal |
| PUT | `/deals/:id` | Admin | Update deal |
| DELETE | `/deals/:id` | Admin | Delete deal |

---

## 🗄️ Database Schema Explanation

The database is hosted on **Supabase (PostgreSQL)** with Row Level Security (RLS) enabled on all tables.

### Tables Overview

| Table | Description |
|-------|-------------|
| `profiles` | Extends Supabase auth users with name, avatar, and role (`user`/`admin`) |
| `destinations` | Core travel destinations with budget estimates, climate, category, and season info |
| `places` | Tourist spots linked to a destination (entry fee, best time to visit) |
| `activities` | Activities per destination (type, cost, duration) |
| `culinary` | Local dishes per destination (price, image, description) |
| `trips` | User-created trip plans with dates, days, notes, and total budget |
| `trip_destinations` | Junction table linking trips to multiple destinations |
| `trip_places` | Junction table linking trips to selected places |
| `trip_activities` | Junction table linking trips to selected activities |
| `trip_culinary` | Junction table linking trips to selected culinary items |
| `journals` | User travel journals with multiple images (stored as JSONB) |
| `reviews` | User ratings (1–5) and comments per destination (one per user per destination) |
| `follows` | Social follow relationships between users |
| `posts` | User posts linked to trips or journals with visibility controls |
| `post_likes` | Likes on posts (unique per user per post) |
| `post_comments` | Comments on posts |
| `social_shares` | Tracks shares to external platforms (Instagram, Twitter, etc.) |
| `deals` | Travel deals with original price, deal price, and auto-calculated discount % |

### Key Relationships
```
auth.users → profiles (1:1)
destinations → places (1:many)
destinations → activities (1:many)
destinations → culinary (1:many)
destinations → deals (1:many)
profiles → trips (1:many)
trips → trip_destinations → destinations (many:many)
trips → trip_places → places (many:many)
trips → trip_activities → activities (many:many)
trips → trip_culinary → culinary (many:many)
profiles → journals (1:many)
profiles → reviews (1:many)
profiles → follows → profiles (many:many)
profiles → posts (1:many)
```

### RLS Policies Summary
- **Public read** on: destinations, places, activities, culinary, deals, journals, reviews, posts (public)
- **Auth required** for: trips, journals (write), reviews (write), posts (write), follows
- **Admin only** for: creating/updating/deleting destinations, places, activities, culinary, deals

---

## ⚙️ Installation Steps

```bash
# 1. Clone the repository
git clone <your-backend-repo-url>
cd travel-inspiration-backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

Add the following to your `.env` file:

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

```bash
# 4. Start the development server
npm run dev
```

Server runs at `http://localhost:5000`

---

## 🚀 Deployment Link

⚙️ **Backend (Render):** `https://travel-inspiration-backend.onrender.com` 

---

## 📁 Project Structure

```
src/
├── config/              # Supabase client setup
├── controllers/         # Request handlers (business logic)
├── middleware/          # Auth + Admin middleware
├── models/              # Supabase query functions
├── routes/              # Express route definitions
├── utils/
│   └── apiResponse.js   # Standardized API responses
└── server.js            # App entry point
.env                     # Environment variables (never commit)
.gitignore
package.json
README.md
```