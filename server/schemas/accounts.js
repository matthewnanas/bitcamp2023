const { model, Schema } = require('mongoose');

const accounts = model('accounts', new Schema({
    email: String,
    password: String,
    numbers: Array,
    created: Date
}));

module.exports = accounts;