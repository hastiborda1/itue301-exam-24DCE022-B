# Library Book Management System

A student-friendly library application built for the Advanced Web Development Frameworks practical. React provides the pages and form, Express provides the REST API, and Mongoose defines the MongoDB data models.

## Setup

Install dependencies in both `frontend` and `backend` folders. Copy `.env.example` to `.env` and set `MONGO_URI` to a local MongoDB or MongoDB Atlas connection string. The backend uses port `5000` by default and the frontend uses Vite's development server.

Run the backend first, then open the frontend development server in a browser. During development, Vite proxies `/api` requests to Express, so the Books page fetches `/api/v1/books` without a browser cross-origin problem. For a deployed frontend, set `VITE_API_URL` to the backend's base URL.

## MongoDB

Start MongoDB locally or provide an Atlas URI in `MONGO_URI`. When connected, `POST /api/v1/mongodb/books` creates a Book document. Sending a book without required fields demonstrates Mongoose validation and returns a safe JSON error. `/api/v1/mongodb/status` reports the connection state.

## Structure

- `frontend/src/components`: reusable `Navbar` and `BookCard`
- `frontend/src/pages`: Home, Books, and Borrow screens
- `backend/models`: Book, Member, and Borrowing Mongoose schemas
- `backend/middleware/requestLogger.js`: global request logging
- `backend/server.js`: Express routes, MongoDB connection, and error handling

## API endpoints

- `GET /api/v1/books` - list sample books
- `GET /api/v1/borrowings` - list borrowing records
- `POST /api/v1/borrowings` - add a borrowing record
- `POST /api/v1/mongodb/books` - create a MongoDB Book when connected
- `GET /api/v1/mongodb/status` - show MongoDB connection status

## Backend task summary

The API task uses in-memory arrays for quick demonstration of GET and POST routes. The middleware task logs every request before route handling. The database task adds Mongoose schemas, references, required and unique fields, enum validation, environment-based connection, and a MongoDB create operation.
