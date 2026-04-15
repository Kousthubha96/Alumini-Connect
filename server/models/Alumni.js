const mysql = require('mysql2/promise');

class AlumniModel {
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

  // Get all alumni with user info
  async getAllAlumni() {
    try {
      const [rows] = await this.pool.execute(`
        SELECT ap.*, u.email, u.first_name, u.last_name, u.created_at as user_created_at
        FROM alumni_profiles ap
        JOIN users u ON ap.user_id = u.id
        ORDER BY ap.created_at DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get alumni by ID
  async getAlumniById(id) {
    try {
      const [rows] = await this.pool.execute(`
        SELECT ap.*, u.email, u.first_name, u.last_name
        FROM alumni_profiles ap
        JOIN users u ON ap.user_id = u.id
        WHERE ap.id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new alumni profile
  async createAlumni(alumniData) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();

      // First create user
      const [userResult] = await connection.execute(`
        INSERT INTO users (email, password_hash, first_name, last_name)
        VALUES (?, ?, ?, ?)
      `, [
        alumniData.email,
        alumniData.password_hash || '$2a$10$dummy.hash.for.now', // TODO: hash password
        alumniData.first_name,
        alumniData.last_name
      ]);

      const userId = userResult.insertId;

      // Then create alumni profile
      const [alumniResult] = await connection.execute(`
        INSERT INTO alumni_profiles (
          user_id, graduation_year, current_company, current_position,
          bio, phone, location
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        userId,
        alumniData.graduation_year,
        alumniData.current_company,
        alumniData.current_position,
        alumniData.bio,
        alumniData.phone,
        alumniData.location
      ]);

      await connection.commit();
      return { id: alumniResult.insertId, user_id: userId };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Update alumni profile
  async updateAlumni(id, alumniData) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();

      // Update user info if provided
      if (alumniData.first_name || alumniData.last_name || alumniData.email) {
        const updateFields = [];
        const values = [];

        if (alumniData.first_name) {
          updateFields.push('first_name = ?');
          values.push(alumniData.first_name);
        }
        if (alumniData.last_name) {
          updateFields.push('last_name = ?');
          values.push(alumniData.last_name);
        }
        if (alumniData.email) {
          updateFields.push('email = ?');
          values.push(alumniData.email);
        }

        if (updateFields.length > 0) {
          values.push(id);
          await connection.execute(`
            UPDATE users SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
            WHERE id = (SELECT user_id FROM alumni_profiles WHERE id = ?)
          `, values);
        }
      }

      // Update alumni profile
      const updateFields = [];
      const values = [];

      if (alumniData.graduation_year !== undefined) {
        updateFields.push('graduation_year = ?');
        values.push(alumniData.graduation_year);
      }
      if (alumniData.current_company !== undefined) {
        updateFields.push('current_company = ?');
        values.push(alumniData.current_company);
      }
      if (alumniData.current_position !== undefined) {
        updateFields.push('current_position = ?');
        values.push(alumniData.current_position);
      }
      if (alumniData.bio !== undefined) {
        updateFields.push('bio = ?');
        values.push(alumniData.bio);
      }
      if (alumniData.phone !== undefined) {
        updateFields.push('phone = ?');
        values.push(alumniData.phone);
      }
      if (alumniData.location !== undefined) {
        updateFields.push('location = ?');
        values.push(alumniData.location);
      }

      if (updateFields.length > 0) {
        values.push(id);
        await connection.execute(`
          UPDATE alumni_profiles SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `, values);
      }

      await connection.commit();
      return { id };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Delete alumni
  async deleteAlumni(id) {
    try {
      const [result] = await this.pool.execute(`
        DELETE FROM alumni_profiles WHERE id = ?
      `, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AlumniModel();