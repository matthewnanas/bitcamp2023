const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

var jsonParser = bodyParser.json()

const app = express();
const port = 3001;

mongoose.connect("mongodb://localhost:27017/admin");

const numbers = require("./db/schemas/numbers.js");
// const incidents = "./db/schemas/incidents.js";


async function exists(db, query) {
    res = await db.findOne(query);
    return true ? res : false;
}



app.post('/addPhone', jsonParser, async(req, res) => {
    // TODO: Add phone to database
    let numberToAdd = req.body.number;
    let number = await numbers.findOne({number: numberToAdd});
    console.log(number);
    if(!number) {
        number = await numbers.create({number: numberToAdd});
        if(number) {
            res.json({success: true, message: "Number added"});
        } else {
            res.json({success: false, message: "Number not added"});
        }
    }

    res.json({success: false, message: "Number exists"});
});

app.post('/removePhone', jsonParser, async(req, res) => {
    // TODO: Remove phone from database
    let numberToRemove = req.body.number;
    let number = await numbers.findOneAndRemove({number: numberToRemove});
    if(number) {
        res.json({success: true, message: "Number removed"});
    } else {
        res.json({success: false, message: "Number not removed"});
    }
});

app.post('/incomingSms', (req, res) => {
    // Check if message is "stop," check if number in db
    if(req.body.lower() == "stop") {
        // remove from DB, reply
    }
    


});




app.listen(port, () => console.log(`App listening on port ${port}!`));