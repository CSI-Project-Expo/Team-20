
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use Routes
app.use('/api/admin', authRoutes); // Login
app.use('/api/roles', roleRoutes); // Public Role Data
app.use('/api/admin', adminRoutes); // Protected Admin Routes

app.get('/', (req, res) => {
  res.send('Smart Job Market Analyzer API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
