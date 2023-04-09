const client = require('twilio')("AC232a3fe8c554c60bf370bb68bb481f31", "3203a6ea7efe23c1bd44196853fb6752");
function send(number, text, url) {
    client.messages.create({body: text, from: "+18443110194", to: number, mediaUrl: url});
}

module.exports = {send};