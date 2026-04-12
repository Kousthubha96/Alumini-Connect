# Alumini-Connect
Alumni Connect
A web-based platform designed to connect students with alumni for mentorship, networking, and career opportunities.

Overview
Alumni Connect helps bridge the gap between current students and graduates by providing a space where they can interact, share experiences, and support each other's professional growth.

 Features
 *User Registration & Login (Students & Alumni)
 *Search and filter alumni by domain, company, or location
 *Messaging system for communication
 *Alumni profiles with experience and achievements
 *Job postings and referrals
 *Event management (webinars, meetups)
 

Tech Stack:
Frontend: React, HTML, CSS, Tailwind CSS
Backend: Node.js, Express.js
Database: MySQL
Authentication: JWT / Google Login
Hosting & Deployment: Vercel or Netlify


# Project Structure
alumni-connect/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Full page views (Login, Register, etc.)
│   │   └── services/      # API communication logic
├── server/                # Node.js/Express Backend
│   ├── config/            # Database connection
│   ├── controllers/       # Route handlers (Business logic)
│   ├── models/            # Database schemas
│   └── routes/            # API endpoint definitions


# Frontend (Client)
1. Navigate to the client folder: `cd client`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

# Project Structure
- **client/src/pages**: Contains the brand-aligned Login and Register UI.
- **client/src/App.jsx**: Handles frontend routing.
- **server/**: Scaffolding for Node.js/Express backend.


# Overview
Successfully implemented the project folder structure and the initial Authentication UI (Login/Register) following the project's design system.
Key Changes
Architecture: Set up a clean client/server directory structure.
UI Development: Created responsive Login and Registration pages using Tailwind CSS v4 and the specified hex color palette (#2F5DAA, #3B6FD8, etc.).
Environment: Initialized Vite as the build tool and configured PostCSS/Tailwind for a working local development environment.
Routing: Implemented react-router-dom for seamless navigation between auth pages.

# how to Test the user login and register
cd client

npm install

npm run dev

Navigate to http://localhost:5173/login