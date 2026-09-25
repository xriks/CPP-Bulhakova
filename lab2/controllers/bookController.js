import mongoose from 'mongoose';
import Book from '../models/Book.js';

const NOT_FOUND = { message: 'Книгу не знайдено' };

function pickBookFields(body) {
  const { title, author, publisher, genre, price, stock, description } = body;
  return { title, author, publisher, genre, price, stock, description };
}

export async function getBooks(req, res) {
  try {
    const filter = {};
    if (req.query.genre) {
      filter.genre = req.query.genre;
    }
    if (req.query.search) {
      const pattern = new RegExp(
        req.query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'i'
      );
      filter.$or = [{ title: pattern }, { author: pattern }];
    }
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET /api/books/:id — одна книга за id
export async function getBookById(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Некоректний id' });
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json(NOT_FOUND);
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createBook(req, res) {
  try {
    const book = await Book.create(pickBookFields(req.body));
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateBook(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Некоректний id' });
    }
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      pickBookFields(req.body),
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json(NOT_FOUND);
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteBook(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Некоректний id' });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json(NOT_FOUND);
    }
    res.json({ message: 'Книгу успішно видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
