const { model, Schema } = require('mongoose');

const numbers = model('numbers', new Schema({
    number: String,
    zip: Number
}));

module.exports = numbers;