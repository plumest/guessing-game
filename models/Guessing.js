const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuessingSchema = new Schema({
    guess: {
        type: [String]
    },
    answer: {
        type: [String],
        default: []
    },
    nWrong: {
        type: Number,
        default: 0
    }
});

const Model = mongoose.model('Test', GuessingSchema);
Model.create({ guess: ['A', 'B'] });


module.exports = Item = mongoose.model('guessing', GuessingSchema);