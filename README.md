# BookIt: Experiences & Slots

An end-to-end **full-stack booking platform** where users can explore unique travel experiences, check available slots, and confirm bookings seamlessly.  
This project demonstrates strong integration between a React + TypeScript frontend and a Node.js + MySQL backend — showcasing a real-world, production-style full-stack workflow.

---

## Objective

Build a responsive and scalable **experience booking web application** with complete frontend–backend integration.  
Users can:
- Browse and explore curated travel experiences  
- View available dates and time slots  
- Book experiences with live availability  
- Receive booking confirmations instantly  

This project tests skills in frontend architecture, backend API design, database modeling, and deployment on cloud platforms.

---

## Tech Stack

### Frontend
- **React + TypeScript** (Vite)
- **TailwindCSS** for modern, responsive design
- **Axios** for API communication
- **React Router** for navigation and routing
- **Vercel** for frontend hosting

### Backend
- **Node.js + Express.js**
- **MySQL** 
- **dotenv**, **cors**, **body-parser** for configuration and middleware
- **Railway** for backend and database deployment
- RESTful API architecture with clean modular routes

---

## Project Structure
```bash
bookit_assessment/
│
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── models/
│ │ ├── experience.js
│ │ ├── booking.js
│ ├── routes/
│ │ ├── experienceRoutes.js
│ │ ├── bookingRoutes.js
│ ├── .env
│ ├── server.js
│ └── package.json
│
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ │ ├── Home.tsx
│ │ ├── Details.tsx
│ │ ├── Checkout.tsx
│ │ ├── BookingConfirmation.tsx
│ ├── services/api.ts
│ ├── types/types.ts
│ ├── App.tsx
│ └── main.tsx
├── tailwind.config.js
├── vite.config.ts
└── package.json
```


---

## Features

### Frontend
- **Home Page:** Displays experiences fetched from backend
- **Details Page:** Shows full experience info and available slots
- **Checkout Page:** Collects user details, and displays booking summary
- **Result Page:** Shows booking confirmation or failure
- Fully **responsive** design (mobile-first)
- **Real-time validation** for name, email, and booking inputs
- **Dynamic state management** using React Hooks

### Backend
- RESTful APIs with Express:
  - `GET /experiences` → Fetch all experiences
  - `GET /experiences/:id` → Fetch details & availability
  - `POST /bookings` → Create a new booking
- MySQL Database Schema:
  - `experiences` table stores activity info
  - `bookings` table tracks all user bookings
- **CORS** configured for secure multi-domain deployment
- Automatic **table creation** if not present
- Prevents double bookings for the same slot

---

## Deployment

| Layer | Platform | URL |
|-------|-----------|-----|
| **Frontend** | Vercel | https://bookit-assessment-3j46.vercel.app |
| **Backend** | Railway | https://bookit-assessment.vercel.app |
| **Database** | MySQL (Railway) | — |


---

## Environment Variables

In your backend `.env` file, include:

```bash
PORT=5000
MYSQL_HOST=your-host-url
MYSQL_USER=your-username
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=railway
MYSQL_URL=your-full-connection-url
```

## Running Locally
### 1️ Clone the repo
```bash
git clone https://github.com/yourusername/bookit_assessment.git
cd bookit_assessment
```
### 2️ Setup Backend
```bash
cd backend
npm install
node server.js
```
### 3️ Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Visit http://localhost:5173 to view the app.


## UI/UX (from Figma)
- Responsive and mobile-friendly
- Clean spacing, typography, and hierarchy
- Smooth transitions and interactive feedback
- Must match provided Figma design pixel-perfectly
- Use Tailwind utility classes for layout consistency
- Figma Design: (add link here when available)

## Future Enhancements
- Integrate payment gateway 
- Add JWT-based authentication for user sessions
- Allow users to view and manage past bookings
- Include admin dashboard for experience management
- Implement email notifications for booking confirmation

## Author
Iqra Rahman
Full Stack Developer | AI & ML Enthusiast

