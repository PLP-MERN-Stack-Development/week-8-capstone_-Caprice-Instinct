const express = require('express');
const router = express.Router();
const {
  createExchange,
  getMyExchanges,
  getExchangeById,
  updateExchangeStatus,
  addMessage,
} = require('../controllers/exchangeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createExchange)
  .get(protect, getMyExchanges);

router.route('/:id')
  .get(protect, getExchangeById)
  .put(protect, updateExchangeStatus);

router.route('/:id/messages')
  .post(protect, addMessage);

module.exports = router;