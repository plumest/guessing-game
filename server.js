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
        // .then(guessing => res.render('index', { guessing }))
        .then(guessing => res.send(guessing).json())
        .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/api/guessing/new', (req, res) => {
    const newQuestion = new Guessing({
        guess: req.body.name.split("")
    });

    newQuestion.save();
});

app.put('/api/guessing/:id', (req, res) => {
    Guessing.update({_id: req.params.id}, {
        guess: req.body.guess,
        answer: req.body.answer,
        nWrong: req.body.nWrong
    });
});

const port = 5000;

app.listen(port, () => console.log('Server running...'));