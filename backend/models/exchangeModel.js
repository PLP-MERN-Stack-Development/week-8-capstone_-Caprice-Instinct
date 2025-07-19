const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }
);

const exchangeSchema = mongoose.Schema(
  {
    requestor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Book',
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'rejected', 'completed'],
      default: 'pending',
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;