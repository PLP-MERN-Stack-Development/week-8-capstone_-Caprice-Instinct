const Book = require('../models/bookModel');

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ isAvailable: true }).populate('user', 'name location');
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('user', 'name email location bio');

    if (book) {
      res.json(book);
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res) => {
  try {
    const { title, author, description, genre, condition, image } = req.body;

    const book = new Book({
      user: req.user._id,
      title,
      author,
      description,
      genre,
      condition,
      image,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  try {
    const { title, author, description, genre, condition, image, isAvailable } = req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
      if (book.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(401);
        throw new Error('Not authorized');
      }

      book.title = title || book.title;
      book.author = author || book.author;
      book.description = description || book.description;
      book.genre = genre || book.genre;
      book.condition = condition || book.condition;
      book.image = image || book.image;
      book.isAvailable = isAvailable !== undefined ? isAvailable : book.isAvailable;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      if (book.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(401);
        throw new Error('Not authorized');
      }

      await book.deleteOne();
      res.json({ message: 'Book removed' });
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user books
// @route   GET /api/books/mybooks
// @access  Private
const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id });
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getMyBooks,
};