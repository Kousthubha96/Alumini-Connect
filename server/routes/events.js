const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET /api/events - Get all events
router.get('/', eventController.getAllEvents);

// GET /api/events/:id - Get event by ID
router.get('/:id', eventController.getEventById);

// POST /api/events - Create new event
router.post('/', eventController.createEvent);

// PUT /api/events/:id - Update event
router.put('/:id', eventController.updateEvent);

// DELETE /api/events/:id - Delete event
router.delete('/:id', eventController.deleteEvent);

module.exports = router;

const express = require("express");
const router = express.Router();

// Dummy data (replace with DB later)
const events = [
  {
    id: 1,
    title: "Tech Talk 2026",
    description: "Latest trends in AI",
    date: "2026-05-10",
  },
  {
    id: 2,
    title: "Alumni Meetup",
    description: "Reconnect with alumni",
    date: "2026-04-25",
  },
];

router.get("/", (req, res) => {
  res.json(events);
});

module.exports = router;
