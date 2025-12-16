const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const interviewRoutes = require('./routes/interviews');
const updateRoutes = require('./routes/updates');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/api/users', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/updates', updateRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
