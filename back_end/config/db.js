const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo-list-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
