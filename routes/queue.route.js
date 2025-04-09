const express = require('express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const mailQueue = require('../queues/mailQueue');
const { route } = require('./user.route');

const router = express.Router();
const serverAdapter = new ExpressAdapter();

// ✅ Set base path BEFORE initializing Bull Board
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullAdapter(mailQueue)],
  serverAdapter,
});

router.get('/test-queue', function (req, res) {
  res.json({ message: 'Queue is working!' });
});

router.use('/admin/queues', serverAdapter.getRouter());

module.exports = router;