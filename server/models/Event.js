const mysql = require('mysql2/promise');

class EventModel {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'alumni_connect',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  // Get all events with creator info
  async getAllEvents() {
    try {
      const [rows] = await this.pool.execute(`
        SELECT e.*, u.first_name as creator_first_name, u.last_name as creator_last_name, u.email as creator_email
        FROM events e
        JOIN users u ON e.created_by = u.id
        ORDER BY e.event_date DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get event by ID
  async getEventById(id) {
    try {
      const [rows] = await this.pool.execute(`
        SELECT e.*, u.first_name as creator_first_name, u.last_name as creator_last_name, u.email as creator_email
        FROM events e
        JOIN users u ON e.created_by = u.id
        WHERE e.id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new event
  async createEvent(eventData, createdById) {
    try {
      const [result] = await this.pool.execute(`
        INSERT INTO events (
          title, description, event_date, location, event_type, 
          created_by, max_attendees
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        eventData.title,
        eventData.description,
        eventData.event_date,
        eventData.location,
        eventData.event_type || 'networking',
        createdById,
        eventData.max_attendees || null
      ]);

      return { id: result.insertId };
    } catch (error) {
      throw error;
    }
  }

  // Update event
  async updateEvent(id, eventData) {
    try {
      const updateFields = [];
      const values = [];

      if (eventData.title !== undefined) {
        updateFields.push('title = ?');
        values.push(eventData.title);
      }
      if (eventData.description !== undefined) {
        updateFields.push('description = ?');
        values.push(eventData.description);
      }
      if (eventData.event_date !== undefined) {
        updateFields.push('event_date = ?');
        values.push(eventData.event_date);
      }
      if (eventData.location !== undefined) {
        updateFields.push('location = ?');
        values.push(eventData.location);
      }
      if (eventData.event_type !== undefined) {
        updateFields.push('event_type = ?');
        values.push(eventData.event_type);
      }
      if (eventData.max_attendees !== undefined) {
        updateFields.push('max_attendees = ?');
        values.push(eventData.max_attendees);
      }

      if (updateFields.length > 0) {
        values.push(id);
        await this.pool.execute(`
          UPDATE events SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `, values);
      }

      return { id };
    } catch (error) {
      throw error;
    }
  }

  // Delete event
  async deleteEvent(id) {
    try {
      const [result] = await this.pool.execute(`
        DELETE FROM events WHERE id = ?
      `, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EventModel();
