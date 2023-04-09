const { model, Schema } = require('mongoose');

const incidents = model('incidents', new Schema({
    location: String,
    date: Number,
    message: String,
    adminEmail: String
}));

module.exports = incidents;