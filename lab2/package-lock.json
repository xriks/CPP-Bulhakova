import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    publisher: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    description: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
