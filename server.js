const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

// Tells mongoose which database to connect to
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-zone', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// logs mongo queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));