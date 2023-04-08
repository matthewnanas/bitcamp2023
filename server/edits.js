const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const crypto = require('crypto');
const { send } = require("./trigger/smsTools");


var jsonParser = bodyParser.json()

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/admin");

const numbers = require("./db/schemas/numbers.js");
const accounts = require("./db/schemas/accounts.js");
// const incidents = "./db/schemas/incidents.js";

let numbersWaiting = [];

async function exists(db, query) {
    res = await db.findOne(query);
    return true ? res : false;
}


async function removePhone(number) {
    number = await numbers.findOneAndRemove({number: numberToRemove});
    if(number) {
        return {success: true, message: "Number removed"};
    } else {
        return {success: false, message: "Number not removed"};
    }
}

app.post('/addPhone', jsonParser, async(req, res) => {
    // TODO: Add phone to database
    let numberToAdd = req.body.number;
    let number = await numbers.findOne({number: numberToAdd});
    console.log(number);
    if(!number) {
        if(!numbersWaiting.includes(numberToAdd)) {
            numbersWaiting.push(numberToAdd);
        }
        send(numberToAdd, "Reply Y to register for AmmoWatch notifications.");
        
    }

    res.json({success: false, message: "Number exists"});
});

app.post('/removePhone', jsonParser, async(req, res) => {
    // TODO: Remove phone from database
    let numberToRemove = req.body.number;
    removePhone(numberToRemove);
});

app.post('/incomingSms', jsonParser, async(req, res) => {
    // Check if message is "stop," check if number in db
    let text = req.body.text.lower();
    
    if(text == "stop") {
        removed = removePhone(req.body.number);
        if(removed.success) {
            send()
            res.json({success: true, message: "Number removed"});
        } else {
            res.json({success: false, message: "Number not removed"});
        }
    } else if(text == "y" || text == "yes" && numbersWaiting.includes(req.)) {
        let number = await numbers.create({number: numberToAdd});
        if(number) {
            res.json({success: true, message: "Number added"});
        } else {
            res.json({success: false, message: "Number not added"});
        }
    }

});

app.post('/createAccount', jsonParser, async(req, res) => {
    let email = req.body.email;
    let account = await accounts.findOne({email: email});
    if(!account) {
        let hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
        let accountCreated = await accounts.create({
            email: email,
            password: hash,
            numbers: [],
            created: Date.now()
        });
        if(accountCreated) {
            res.json({status: true, message: "Account created successfully", token: jwt.sign({email: email}, TOKEN_SECRET, {expiresIn: '6h'})});
        } else {
            res.json({status: false, message: "Account not created"});
        }
        
    }
    res.json({status: false, message: "Account exists"});

})

app.post('/login', jsonParser, async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let account = await accounts.findOne({email: email});
    if(account) {
        let hash = crypto.createHash('sha256').update(password).digest('hex');
        if(hash==account.password) {
            res.json({status: true, message: "Logged in"});
            // login
        } else {
            res.json({status: false, message: "Account doesn't exist"});
            //
        }
    } else {
        res.json({status: false, message: "Account doesn't exist"});

        console.log(account)
    }
});



app.listen(port, () => console.log(`App listening on port ${port}!`));