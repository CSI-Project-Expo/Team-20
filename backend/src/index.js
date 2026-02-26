
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import Routes
import authRoutes from './routes/authRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

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
