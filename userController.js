const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
    const user = await User.createUser({ name, email });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') return res.status(400).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await User.getUserById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = await User.updateUser(id, { name, email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await User.deleteUser(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
