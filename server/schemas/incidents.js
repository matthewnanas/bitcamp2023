const { model, Schema } = require('mongoose');

const incidents = model('incidents', new Schema({
    location: String,
    date: Date,
    message: String
}));

module.exports = incidents;