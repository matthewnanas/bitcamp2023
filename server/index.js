const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect();

const numbers = "./db/schemas/numbers.js";
const incidents = "./db/schemas/incidents.js";


async function exists(db, query) {
    res = await db.findOne(query);
    return true ? res : false;
}



app.post('/addPhone', async(req, res) => {
    // TODO: Add phone to database
    let numberToAdd = req.body.number;
    let number = await numbers.findOne({tags: numberToAdd});
    if(!number) {
        number = await numbers.create;
        if(number) {
            // success
        } else {
            // couldn't add
        }
    }


    res.json({success: true});
});

app.post('/removePhone', async(req, res) => {
    // TODO: Remove phone from database
    let numberToRemove = req.body.number;
    let number = await numbers.findOneAndRemove({tags: numberToRemove});
    if(number) {
        // number removed
    } else {
        // number doesn't exist
    }
    
    res.json({success: true});
});

app.post('/incomingSms', (req, res) => {
    // Check if message is "stop," check if number in db
    if(req.body.lower() == "stop") {
        // remove from DB, reply
    }
    

})

app.listen(port, () => console.log(`App listening on port ${port}!`));
