const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuessingSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    stack: {
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

module.exports = Item = mongoose.model('guessing', GuessingSchema);