# Project Deep Dive — Ridelink

Technical documentation describing the architecture, project structure, request flow, deployment strategy, and implementation details of **Ridelink**, a full-stack real-time ride booking platform.

---

# Architecture Overview

```
                Browser (React SPA)
                        │
        ┌───────────────┴───────────────┐
        │                               │
 HTTP Requests (Axios)          WebSocket (Socket.IO)
        │                               │
        ▼                               ▼
           Express.js + Socket.IO Server
                        │
                        ▼
                 MongoDB (Mongoose)
```

The project consists of two independent applications:

- **Backend/** — Node.js + Express REST API + Socket.IO Server
- **Frontend/** — React + Vite Single Page Application

The frontend communicates with the backend using both HTTP APIs and WebSocket events.

---

# Technology Stack

## Backend

| Package | Purpose |
|----------|---------|
| Express | REST API Server |
| Mongoose | MongoDB ODM |
| Socket.IO | Real-time communication |
| JWT | Authentication |
| bcrypt | Password hashing |
| Cookie Parser | Parse cookies |
| Express Validator | Request validation |
| Axios | External API requests |
| Dotenv | Environment variables |
| CORS | Cross-origin requests |

---

## Frontend

| Package | Purpose |
|----------|---------|
| React | UI Library |
| Vite | Development server & build tool |
| React Router | Client-side routing |
| Axios | API requests |
| Socket.IO Client | Real-time communication |
| Tailwind CSS | Styling |
| GSAP | Animations |
| Remix Icons | Icons |

---

## Database

MongoDB using Mongoose.

Collections:

- users
- captains
- rides
- blacklistTokens

---

# Project Structure

```
Ridelink/

├── Backend/
│
│   ├── app.js
│   ├── server.js
│   ├── socket.js
│   │
│   ├── db/
│   │     └── db.js
│   │
│   ├── controllers/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── middlewares/
│   │
│   ├── models/
│   │
│   └── .env
│
└── Frontend/
    │
    ├── src/
    │
    ├── components/
    │
    ├── context/
    │
    ├── pages/
    │
    ├── socket.js
    │
    └── App.jsx
```

---

# Authentication Flow

### User Registration

```
User
    │
POST /users/register
    │
Password hashed using bcrypt
    │
Saved in MongoDB
    │
JWT Generated
    │
Returned to Frontend
    │
Stored on client
```

Captain registration follows the same process.

---

## Login

```
User Login

↓

Verify Email

↓

Compare Password (bcrypt)

↓

Generate JWT

↓

Return Token

↓

Authenticated Session
```

---

## Logout

```
Logout

↓

JWT added to blacklist collection

↓

Future requests rejected

↓

401 Unauthorized
```

---

# Protected Route Flow

```
Protected Route

↓

Check Authentication Token

↓

Verify Token

↓

Fetch User Profile

↓

Allow Access

OR

Redirect to Login
```

---

# Ride Booking Flow

```
User opens Home

↓

Connects to Socket.IO

↓

Select Pickup & Destination

↓

Backend calculates Fare

↓

Vehicle Selected

↓

Ride Created

↓

Ride stored in MongoDB

↓

Captain notified instantly
```

---

# Captain Flow

```
Captain Login

↓

Connect Socket.IO

↓

Join Captains Room

↓

Receive Ride Request

↓

Accept Ride

↓

Verify OTP

↓

Ride Started

↓

Notify Rider

↓

Complete Ride
```

---

# Ride Completion

```
Captain

↓

Complete Ride

↓

Ride Status Updated

↓

Database Updated

↓

Captain Available Again
```

---

# Maps & Location Services

The application uses free OpenStreetMap services.

Services used:

- Nominatim (Geocoding)
- OSRM (Routing & Distance Calculation)

No API key is required.

Workflow:

```
User enters address

↓

Autocomplete Suggestions

↓

Geocode Location

↓

Route Calculation

↓

Distance & Time

↓

Fare Calculation
```

---

# Fare Calculation

Fare is calculated using:

```
Base Fare
+ Distance Cost
+ Time Cost
```

Different pricing models are available for:

- Car
- Bike
- Auto

---

# Environment Variables

## Backend (.env)

```env
PORT=3000
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Frontend (.env)

```env
VITE_BASE_URL=http://localhost:3000
```

---

# Running the Project

## Backend

```bash
cd Backend
npm install
node server.js
```

---

## Frontend

```bash
cd Frontend
npm install
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

# Production Build

Frontend

```bash
cd Frontend
npm run build
```

Output:

```
Frontend/dist
```

Backend

```bash
cd Backend
node server.js
```

---

# Deployment

Recommended Stack

| Service | Purpose |
|----------|----------|
| Vercel | Frontend |
| Railway | Backend |
| MongoDB Atlas | Database |

Environment Variables

Backend

```
DB_CONNECT
JWT_SECRET
PORT
```

Frontend

```
VITE_BASE_URL=https://your-backend-url.railway.app
```

---

# Future Enhancements

- Live GPS Tracking
- Payment Gateway Integration
- Push Notifications
- Ride History
- Ratings & Reviews
- Driver Earnings Dashboard
- Admin Panel
- Dark Mode
- Ride Scheduling
- AI-based Driver Recommendation

---

# Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Token Blacklisting
- Request Validation
- Secure Environment Variables

---

# Performance Optimizations

- Context API for State Management
- Efficient Socket.IO Communication
- Component-based Architecture
- Optimized React Rendering
- REST + WebSocket Hybrid Communication

---

# Author

**Atul Mishra**

Ridelink is a full-stack MERN application developed as a portfolio project to demonstrate expertise in:

- React.js
- Node.js
- Express.js
- MongoDB
- Socket.IO
- JWT Authentication
- REST API Development
- Real-Time Web Applications
