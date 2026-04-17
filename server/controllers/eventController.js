const Event = require('../models/Event');

class EventController {
  // Get all events
  async getAllEvents(req, res) {
    try {
      const events = await Event.getAllEvents();
      res.json({
        success: true,
        data: events
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch events'
      });
    }
  }

  // Get event by ID
  async getEventById(req, res) {
    try {
      const { id } = req.params;
      const event = await Event.getEventById(id);

      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }

      res.json({
        success: true,
        data: event
      });
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch event'
      });
    }
  }

  // Create new event
  async createEvent(req, res) {
    try {
      const eventData = req.body;
      const userId = req.user?.id || 1; // Default to user 1 if no auth

      // Basic validation
      if (!eventData.title || !eventData.event_date || !eventData.location) {
        return res.status(400).json({
          success: false,
          message: 'Title, event date, and location are required'
        });
      }

      const result = await Event.createEvent(eventData, userId);
      res.status(201).json({
        success: true,
        message: 'Event created successfully',
        data: result
      });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create event'
      });
    }
  }

  // Update event
  async updateEvent(req, res) {
    try {
      const { id } = req.params;
      const eventData = req.body;

      const result = await Event.updateEvent(id, eventData);
      res.json({
        success: true,
        message: 'Event updated successfully',
        data: result
      });
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update event'
      });
    }
  }

  // Delete event
  async deleteEvent(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Event.deleteEvent(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }

      res.json({
        success: true,
        message: 'Event deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete event'
      });
    }
  }
}

module.exports = new EventController();
