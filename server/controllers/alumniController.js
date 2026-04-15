const Alumni = require('../models/Alumni');

class AlumniController {
  // Get all alumni
  async getAllAlumni(req, res) {
    try {
      const alumni = await Alumni.getAllAlumni();
      res.json({
        success: true,
        data: alumni
      });
    } catch (error) {
      console.error('Error fetching alumni:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch alumni'
      });
    }
  }

  // Get alumni by ID
  async getAlumniById(req, res) {
    try {
      const { id } = req.params;
      const alumni = await Alumni.getAlumniById(id);

      if (!alumni) {
        return res.status(404).json({
          success: false,
          message: 'Alumni not found'
        });
      }

      res.json({
        success: true,
        data: alumni
      });
    } catch (error) {
      console.error('Error fetching alumni:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch alumni'
      });
    }
  }

  // Create new alumni
  async createAlumni(req, res) {
    try {
      const alumniData = req.body;

      // Basic validation
      if (!alumniData.email || !alumniData.first_name || !alumniData.last_name) {
        return res.status(400).json({
          success: false,
          message: 'Email, first name, and last name are required'
        });
      }

      const result = await Alumni.createAlumni(alumniData);
      res.status(201).json({
        success: true,
        message: 'Alumni created successfully',
        data: result
      });
    } catch (error) {
      console.error('Error creating alumni:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Failed to create alumni'
      });
    }
  }

  // Update alumni
  async updateAlumni(req, res) {
    try {
      const { id } = req.params;
      const alumniData = req.body;

      const result = await Alumni.updateAlumni(id, alumniData);
      res.json({
        success: true,
        message: 'Alumni updated successfully',
        data: result
      });
    } catch (error) {
      console.error('Error updating alumni:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update alumni'
      });
    }
  }

  // Delete alumni
  async deleteAlumni(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Alumni.deleteAlumni(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Alumni not found'
        });
      }

      res.json({
        success: true,
        message: 'Alumni deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting alumni:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete alumni'
      });
    }
  }
}

module.exports = new AlumniController();