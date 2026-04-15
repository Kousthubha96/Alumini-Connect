const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');

// GET /api/alumni - Get all alumni
router.get('/', alumniController.getAllAlumni);

// GET /api/alumni/:id - Get alumni by ID
router.get('/:id', alumniController.getAlumniById);

// POST /api/alumni - Create new alumni
router.post('/', alumniController.createAlumni);

// PUT /api/alumni/:id - Update alumni
router.put('/:id', alumniController.updateAlumni);

// DELETE /api/alumni/:id - Delete alumni
router.delete('/:id', alumniController.deleteAlumni);

module.exports = router;