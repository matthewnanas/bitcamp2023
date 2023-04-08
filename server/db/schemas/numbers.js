const { model, Schema } = require('mongoose');

const numbers = model('numbers', new Schema({
    numbers: Array
}));

module.exports = numbers;