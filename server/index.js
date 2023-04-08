const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
const { send } = require("./trigger/smsTools");


var jsonParser = bodyParser.json()
const TOKEN_SECRET = "5a236c0e36eaf7206b9124226313a21538f961dd35ff69b131e91e87ae688dccc7f91718fcf7c99d1062e94edf569cfb0b32f4e14867b44205a057e1873e19ed";
const app = express();
app.use(jsonParser);
app.use(cors({
    origin: "*"
}));

const port = 3001;
//mongoose connect with this database: mongodb+srv://admin:MatthewAdamRohit4612@admin.cunckp8.mongodb.net/main
mongoose.connect("mongodb+srv://admin:MatthewAdamRohit4612@admin.cunckp8.mongodb.net/main?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});


const numbers = require("./schemas/numbers.js");
const accounts = require("./schemas/accounts.js");
const incidents = require("./schemas/incidents.js");

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

app.post('/addPhone', async(req, res) => {
    // TODO: Add phone to database
    let numberToAdd = req.body.number;
    let number = await numbers.findOne({number: numberToAdd});
    if(!number) {
        let number = await numbers.create({number: numberToAdd});
        if(number) {
            res.json({success: true, message: "Number added"});
        } else {
            res.json({success: false, message: "Number not added"});
        }
    } else {
        res.json({success: false, message: "Number already exists"});
    }
});
app.post('/removePhone', async(req, res) => {
    // TODO: Remove phone from database
    let numberToRemove = req.body.number;
    removePhone(numberToRemove);
});

// app.post('/incomingSms', jsonParser, async(req, res) => {
//     // Check if message is "stop," check if number in db
//     let text = req.body.text.lower();
//     let number = req.body.number;
    
//     if(text == "stop") {
//         removed = removePhone(req.body.number);
//         if(removed.success) {
//             send()
//             res.json({success: true, message: "Number removed"});
//         } else {
//             res.json({success: false, message: "Number not removed"});
//         }
//     } else if(text == "y" || text == "yes" && numbersWaiting.includes(number)) {
//         let number = await numbers.create({number: number});
//         if(number) {
//             res.json({success: true, message: "Number added"});
//             send(number, "Watching :)");
//         } else {
//             res.json({success: false, message: "Number not added"});
//             send(number, "Not Watching :(");
//         }
//     }

// });

app.post('/createAccount', async(req, res) => {
    let email = req.body.email;
    console.log(req);
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
        
    } else {
        res.json({status: false, message: "Account exists"});
    }

})

app.post('/login', async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let account = await accounts.findOne({email: email});
    if(account) {
        let hash = crypto.createHash('sha256').update(password).digest('hex');
        if(hash==account.password) {
            res.json({status: true, message: "Logged in", token: jwt.sign({email: email}, TOKEN_SECRET, {expiresIn: '6h'})});
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

app.get('/getAccount', async(req, res) => {
    let token = req.headers.authorization;
    if(token) {
        token = token.replace("Bearer ", "");
        let decoded = jwt.verify(token, TOKEN_SECRET);
        let account = await accounts.findOne({email: decoded.email});
        if(account) {
            res.json({status: true, message: "Account found", account:{email: account.email, numbers: account.numbers}});
        } else {
            res.json({status: false, message: "Account not found"});
        }
    } else {
        res.json({status: false, message: "Missing authentication token"});
    }
});


app.listen(port, () => console.log(`App listening on port ${port}!`));