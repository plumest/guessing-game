const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});


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
        .then(guessing => res.send(guessing).json())
        .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/api/guessing/new', (req, res) => {
    const newQuestion = new Guessing({
        guess: req.body.guess
    });

    newQuestion.save().then(status => res.send(status)).catch(e => console.log(e));
});

app.put('/api/guessing/:id', (req, res) => {
    if (req.body.guess === null || req.body.guess === undefined) {
        req.body.guess = [];
    }
    if (req.body.answer === null || req.body.answer === undefined) {
        req.body.answer = [];
    }
    Guessing.find({"_id": req.params.id})
        .update({
            guess: req.body.guess,
            answer: req.body.answer,
            nWrong: req.body.nWrong
        })
        .then(status => res.send(status).json());
});

app.delete('/api/guessing/delete/:id', (req, res) => {
   Guessing.find({"_id": req.params.id}).remove()
       .then(status => {res.send(status).json()})
       .catch(e => console.log(e))
});

const port = 5000;

app.listen(port, () => console.log('Server running...'));