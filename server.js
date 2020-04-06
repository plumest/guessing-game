const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
    .connect(
        'mongodb://mongo:27017/guessing-app',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const Guessing = require('./models/Guessing');

app.get('/api/guessing', (req, res) => {
    Guessing.find()
        .then(guessing => res.render('guessing', { Guessing }))
        .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/api/guessing/add', (req, res) => {
    const newAnswer = new Guessing({
        name: req.body.name
    });

    newAnswer.save().then(item => res.redirect('/'));
});

const port = 5000;

app.listen(port, () => console.log('Server running...'));