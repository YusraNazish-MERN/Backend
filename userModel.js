const pool = require('../config/db');

const createUser = async ({ name, email }) => {
  const res = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return res.rows[0];
};

const getUsers = async () => {
  const res = await pool.query('SELECT * FROM users ORDER BY id ASC');
  return res.rows;
};

const getUserById = async (id) => {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0];
};

const updateUser = async (id, { name, email }) => {
  const res = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return res.rows[0];
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
