# Alumni Connect

A full-stack web application designed to connect students with alumni for mentorship, networking, and career opportunities.

---

## Overview

Alumni Connect bridges the gap between current students and graduates by providing a platform for interaction, knowledge sharing, and professional growth.

---

## Features

- User Registration and Login (Students and Alumni)
- Search and filter alumni by domain, company, or location
- Messaging system for communication
- Alumni profiles with experience and achievements
- Job postings and referrals
- Event management (webinars, meetups)

---

## Tech Stack

**Frontend:** React, Tailwind CSS, Vite, React Router DOM  
**Backend:** Node.js, Express.js  
**Database:** MySQL  
**Authentication:** JWT, Google OAuth

---

## Project Structure

```
alumni-connect/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Pages (Login, Register, etc.)
│   │   └── services/      # API communication logic
│
├── server/                # Node.js/Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic
│   ├── models/            # Database schemas
│   └── routes/            # API routes
```

---

## Setup Instructions

### Clone the repository

```
git clone https://github.com/your-username/alumni-connect.git
cd alumni-connect
```

---

### Backend setup

```
npm install
node server/index.js
```

The backend server will run on:
http://localhost:5000

---

### Frontend setup

```
cd client
npm install
npm run dev
```

The frontend will run on:
http://localhost:5173

---

## API Endpoints

- GET /api/health
  Returns server status

- GET /api/version
  Returns application version

---

## Testing

- Frontend: http://localhost:5173/login
- Backend: http://localhost:5000/api/health

---
