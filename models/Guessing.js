const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuessingSchema = new Schema({
    name: {type: String, request: true},
    char: {type: [String]},
    ans: {type: [String]},
    n: {type: Number, default: 0}
    // text: {
    //     type: String,
    //     required: true
    // },
    // stack: {
    //     type: [String]
    // },
    // answer: {
    //     type: [String]
    // },
    // nWrong: {
    //     type: Number,
    //     default: 0
    // }
});

module.exports = Item = mongoose.model('guessing', GuessingSchema);