require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const helpRequestRoutes = require('./routes/helpRequests');
const streakRoutes = require('./routes/streaks');

const app = express();
const PORT = process.env.PORT || 1675;

app.use(cors());
app.use(express.json());

app.use('/api/help-requests', helpRequestRoutes);
app.use('/api/streaks', streakRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Micro Skill Sharing Platform API', port: PORT });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://127.0.0.1:${PORT}`);
      console.log('Database connected.');
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
