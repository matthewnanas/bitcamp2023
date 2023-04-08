const { model, Schema } = require('mongoose');

const incidents = model('incidents', new Schema({
    location: String,
    date: String,
    message: String,
    adminEmail: String
}));

module.exports = incidents;