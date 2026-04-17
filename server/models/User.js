const pool = require('../utils/db');

class UserModel {
  async createUser({ email, password_hash, first_name, last_name }) {
    const [result] = await pool.execute(
      `INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)`,
      [email, password_hash, first_name, last_name]
    );
    return { id: result.insertId, email, first_name, last_name };
  }

  async findByEmail(email) {
    const [rows] = await pool.execute(
      `SELECT id, email, password_hash, first_name, last_name FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
  }
}

module.exports = new UserModel();
