const Exchange = require('../models/exchangeModel');
const Book = require('../models/bookModel');

// @desc    Create exchange request
// @route   POST /api/exchanges
// @access  Private
const createExchange = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    if (!book.isAvailable) {
      res.status(400);
      throw new Error('Book is not available for exchange');
    }

    if (book.user.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('You cannot request your own book');
    }

    const existingExchange = await Exchange.findOne({
      book: bookId,
      requestor: req.user._id,
      status: { $in: ['pending', 'accepted'] },
    });

    if (existingExchange) {
      res.status(400);
      throw new Error('You already have a pending or accepted request for this book');
    }

    const exchange = new Exchange({
      requestor: req.user._id,
      owner: book.user,
      book: bookId,
      status: 'pending',
      messages: [],
    });

    const createdExchange = await exchange.save();

    res.status(201).json(createdExchange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all exchanges for a user (both as requestor and owner)
// @route   GET /api/exchanges
// @access  Private
const getMyExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find({
      $or: [{ requestor: req.user._id }, { owner: req.user._id }],
    })
      .populate('book', 'title author image')
      .populate('requestor', 'name')
      .populate('owner', 'name');

    res.json(exchanges);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get exchange by ID
// @route   GET /api/exchanges/:id
// @access  Private
const getExchangeById = async (req, res) => {
  try {
    const exchange = await Exchange.findById(req.params.id)
      .populate('book', 'title author description image condition')
      .populate('requestor', 'name email location')
      .populate('owner', 'name email location');

    if (!exchange) {
      res.status(404);
      throw new Error('Exchange not found');
    }

    // Check if user is part of this exchange
    if (
      exchange.requestor._id.toString() !== req.user._id.toString() &&
      exchange.owner._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      res.status(401);
      throw new Error('Not authorized');
    }

    res.json(exchange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update exchange status
// @route   PUT /api/exchanges/:id
// @access  Private
const updateExchangeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const exchange = await Exchange.findById(req.params.id);

    if (!exchange) {
      res.status(404);
      throw new Error('Exchange not found');
    }

    // Only the owner can update the status
    if (exchange.owner.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized');
    }

    exchange.status = status;

    // If status is accepted, mark the book as unavailable
    if (status === 'accepted') {
      await Book.findByIdAndUpdate(exchange.book, { isAvailable: false });
    } else if (status === 'rejected' || status === 'completed') {
      // If rejected or completed, make the book available again
      await Book.findByIdAndUpdate(exchange.book, { isAvailable: true });
    }

    const updatedExchange = await exchange.save();

    res.json(updatedExchange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add message to exchange
// @route   POST /api/exchanges/:id/messages
// @access  Private
const addMessage = async (req, res) => {
  try {
    const { content } = req.body;

    const exchange = await Exchange.findById(req.params.id);

    if (!exchange) {
      res.status(404);
      throw new Error('Exchange not found');
    }

    // Check if user is part of this exchange
    if (
      exchange.requestor.toString() !== req.user._id.toString() &&
      exchange.owner.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      res.status(401);
      throw new Error('Not authorized');
    }

    const message = {
      sender: req.user._id,
      content,
    };

    exchange.messages.push(message);

    await exchange.save();

    const updatedExchange = await Exchange.findById(req.params.id)
      .populate('messages.sender', 'name');

    res.status(201).json(updatedExchange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createExchange,
  getMyExchanges,
  getExchangeById,
  updateExchangeStatus,
  addMessage,
};