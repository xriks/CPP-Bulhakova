import express from 'express';

import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';
import { validateBook } from '../middleware/validateBook.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', validateBook, createBook);
router.put('/:id', validateBook, updateBook);
router.delete('/:id', deleteBook);

export default router;
