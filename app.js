require('dotenv').config();
const express = require('express');
const pool = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

pool.connect()
  .then(client => {
    client.release();
    console.log('✅ Connected to Postgres');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Failed to connect to Postgres:', err.message);
    process.exit(1);
  });
