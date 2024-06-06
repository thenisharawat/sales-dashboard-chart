const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transactionRoutes = require('./routes/transactionRoutes');
const db = require('./db');

const app = express();

app.use(cors());

db;

app.use(express.json());
app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});