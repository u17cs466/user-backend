const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from project root config.env (if present)
dotenv.config({ path: path.resolve(__dirname, '../config.env') });

const app = require('./app');

// Safely read DB URL and password
const rawDbUrl = process.env.DB_URL || null;
const DBURL = rawDbUrl && process.env.PASSWORD ? rawDbUrl.replace('<password>', process.env.PASSWORD) : null;

if (!DBURL) {
    console.warn('WARNING: Missing DB_URL or PASSWORD in environment. Skipping MongoDB connection. Create a config.env at the project root (see config.env.example) to enable DB.');
} else {
    mongoose.connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected successfully');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        console.warn('Continuing without DB connection. Some features will not work until DB is available.');
    });
}

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log('server is running on', `http://localhost:${PORT}`);
});