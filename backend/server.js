import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Book from './models/Book.js';
import requestLogger from './middleware/requestLogger.js';

const app = express();
const port = process.env.PORT || 5000;
let databaseConnected = false;

const books = [
  { id: 'book-1', title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming', available: true },
  { id: 'book-2', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Programming', available: false },
  { id: 'book-3', title: 'Atomic Habits', author: 'James Clear', category: 'Self-development', available: true }
];

const borrowings = [
  { id: 'borrow-1', memberName: 'Aarav Shah', bookTitle: 'Clean Code', borrowDate: '2026-08-18', returnDate: '2026-08-25', status: 'borrowed' }
];

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/api/v1/books', (request, response) => {
  response.status(200).json({ success: true, data: books });
});

app.get('/api/v1/borrowings', (request, response) => {
  response.status(200).json({ success: true, data: borrowings });
});

app.post('/api/v1/borrowings', (request, response) => {
  const { memberName, bookTitle, borrowDate, returnDate } = request.body;
  if (!memberName || !bookTitle || !borrowDate || !returnDate) {
    return response.status(400).json({ success: false, message: 'Validation failed', error: 'All borrowing fields are required' });
  }

  const borrowing = { id: `borrow-${borrowings.length + 1}`, memberName, bookTitle, borrowDate, returnDate, status: 'borrowed' };
  borrowings.push(borrowing);
  return response.status(201).json({ success: true, data: borrowing });
});

app.post('/api/v1/mongodb/books', async (request, response, next) => {
  try {
    if (!databaseConnected) return response.status(503).json({ success: false, message: 'MongoDB is not connected' });
    const book = await Book.create(request.body);
    return response.status(201).json({ success: true, data: book });
  } catch (error) {
    if (error.name === 'ValidationError') return response.status(400).json({ success: false, message: 'Validation failed', error: 'Required field is missing or invalid' });
    if (error.code === 11000) return response.status(400).json({ success: false, message: 'Validation failed', error: 'ISBN must be unique' });
    return next(error);
  }
});

app.get('/api/v1/mongodb/status', (request, response) => {
  response.status(200).json({ success: true, connected: databaseConnected });
});

app.use((error, request, response, next) => {
  console.error(error.message);
  response.status(500).json({ success: false, message: 'Something went wrong' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    databaseConnected = true;
    console.log('MongoDB connected');
  })
  .catch(() => console.log('MongoDB unavailable; using in-memory API data'));

app.listen(port, () => console.log(`Library API running on http://localhost:${port}`));
