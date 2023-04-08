const twilio = require("twilio");
function send(number, text) {
    twilio.messages.create({body: text, from: "8443110194", to: number});
}

module.exports = {send};