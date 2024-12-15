const express = require('express');
const router = express.Router();
const books = require('../data/books');

// GET /books - List all books
router.get('/', (req, res) => {
  res.json(books);
});

// GET /books/available - Get only available books
router.get('/available', (req, res) => {
  const availableBooks = books.filter(book => book.available);
  res.json(availableBooks);
});

// GET /books/unavailable - Get only unavailable books
router.get('/unavailable', (req, res) => {
  const unavailableBooks = books.filter(book => !book.available);
  res.json(unavailableBooks);
});

// POST /books - Add a new book
router.post('/', (req, res) => {
  const { title, authorId, year, available } = req.body;
  
  if (!title || !authorId || !year) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    authorId,
    year,
    available: available ?? true
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

module.exports = router;