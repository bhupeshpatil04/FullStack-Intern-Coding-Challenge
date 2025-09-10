# FullStack Intern Coding Challenge - Completed Project (React + Express + MySQL)

## Tech stack
- Frontend: React (JavaScript, react-router-dom, axios)
- Backend: Express.js (Node.js), Sequelize ORM with MySQL (mysql2)
- Auth: JWT
- Password hashing: bcrypt

## What is included
- `backend/` - Express API (routes for auth, users, stores, ratings).
- `frontend/` - React app with pages for signup/login, stores list, admin dashboard.
- `backend/sql/schema.sql` - SQL file to create the database and tables.
- `.env.example` in backend

## How to run (local)
1. Setup MySQL and create a database or use the provided SQL:
   - Run `mysql -u root -p < backend/sql/schema.sql` (or execute SQL in your MySQL client).
2. Backend:
   - `cd backend`
   - copy `.env.example` to `.env` and fill values
   - `npm install`
   - `npm run dev`
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm start`
4. By default frontend expects backend at `http://localhost:4000/api`. Set `REACT_APP_API_URL` if needed.

## Notes & limitations
- This is a scaffold implementing the required endpoints and a simple React UI for demonstration.
- Validation is implemented on the backend for required fields; frontend includes basic forms.
- Sorting/filtering on tables is supported via query params on backend; frontend shows simple lists.

