const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { send } = require("./trigger/smsTools");


const TOKEN_SECRET = "5a236c0e36eaf7206b9124226313a21538f961dd35ff69b131e91e87ae688dccc7f91718fcf7c99d1062e94edf569cfb0b32f4e14867b44205a057e1873e19ed";

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}));

const port = 3001;
mongoose.connect("mongodb+srv://admin:MatthewAdamRohit4612@admin.cunckp8.mongodb.net/main?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

// Importing MongoDB Models
const numbers = require("./schemas/numbers.js");
const accounts = require("./schemas/accounts.js");
const incidents = require("./schemas/incidents.js");

app.post('/addPhone', async(req, res) => {
    let numberToAdd = req.body.number;
    let zip = req.body.zip;
    let number = await numbers.findOne({number: numberToAdd});
    if(!number) {
        let number = await numbers.create({number: numberToAdd, zip: zip});
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
    let numberToRemove = req.body.number;
    let number = await numbers.findOneAndRemove({number: numberToRemove});
    if(number) {
        return {success: true, message: "Number removed"};
    } else {
        return {success: false, message: "Number not removed"};
    }});
    
app.post('/createAccount', async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let account = await accounts.findOne({email: email});
    if(!account) {
        let hash = crypto.createHash('sha256').update(password).digest('hex');
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
        } else {
            res.json({status: false, message: "Account doesn't exist"});
        }
    } else {
        res.json({status: false, message: "Account doesn't exist"});
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

app.post('/addIncident', async(req, res) => {
    let incident = await incidents.findOne({date: req.body.date});
    if(!incident) {
        incident = await incidents.create({
            image: req.body.image,
            location: req.body.location,
            date: req.body.date,
            message: req.body.message,
            adminEmail: req.body.adminEmail
        });
        if(incident) {
            sendSms(incident, req);
            res.send({status: true})
        }
     }

});

async function sendSms(incident, req) {
    let text = `New Alert from AmmoWatch, Incident Detected in ${req.body.location}`;
    if(incident) {
        if(req.body.adminEmail == "" || req.body.community) {
            let number = await numbers.find({});
            for(n of number) {
                if(n.zip == req.body.location) {
                    send(n.number, text, req.body.image);
                }
            }
        } else {
            let account = await accounts.find({email: req.body.adminEmail});
            if(account) {
                if(account[0] != undefined) {
                    for(number of account[0].numbers) {
                        send(number.number, "[ADMIN] " + text, req.body.image)
                    }
                }
        }
    }
}
}

app.get('/getIncidents', async(req, res) => {
    let all = await incidents.find();
    res.send({success: true, incidents: all});

});

app.get('/getPrivateIncidents', async(req, res) => {
    let token = req.headers.authorization;
    let email;
    if(token) {
        token = token.replace("Bearer ", "");
        let decoded = jwt.verify(token, TOKEN_SECRET);
        let account = await accounts.findOne({email: decoded.email});
        if(!account) {
            res.json({status: false, message: "Account not found"});
            return;
        }
        email = decoded.email;
    } else {
        res.json({status: false, message: "Missing authentication token"});
        return;
    }

    let all = await incidents.find({adminEmail: {$eq: email}});
    if(all) {
        res.send({success: true, incidents: all});
    } else {
        res.send({success: false, incidents: ""});
    }
})

app.get('/getIncidentBusinessChart', async(req, res) => {

    let token = req.headers.authorization;
    let email;
    if(token) {
        token = token.replace("Bearer ", "");
        let decoded = jwt.verify(token, TOKEN_SECRET);
        let account = await accounts.findOne({email: decoded.email});
        if(!account) {
            res.json({status: false, message: "Account not found"});
            return;
        }
        email = decoded.email;
    } else {
        res.json({status: false, message: "Missing authentication token"});
        return;
    }
    let now = Date.now();
    let week = 604800000;
    
    let week4 = await incidents.find({$and: [{date: {$gte: now - week*4}}, {date: {$lte: now - week*3}}, {adminEmail: {$eq: email}}]});
    console.log(week4);
    let week3 = await incidents.find({$and: [{date: {$gte: now - week*3}}, {date: {$lte: now - week*2}}, {adminEmail: {$eq: email}}]});
    let week2 = await incidents.find({$and: [{date: {$gte: now - week*2}}, {date: {$lte: now - week}}, {adminEmail: {$eq: email}}]});
    let week1 = await incidents.find({$and: [{date: {$gte: now - week}}, {adminEmail: {$eq: email}}]});


    const data = [{name: 'Week 4', uv: week4.length, pv: 2400, amt: 2400}, {name: 'Week 3', uv: week3.length, pv: 2400, amt: 2400}, {name: 'Week 2', uv: week2.length, pv: 2400, amt: 2400}, {name: 'Week 1', uv: week1.length, pv: 2400, amt: 2400}];
    res.send(data);


})

app.get('/getRoster', async(req, res) => {
    let token = req.headers.authorization;
    let email;
    if(token) {
        token = token.replace("Bearer ", "");
        let decoded = jwt.verify(token, TOKEN_SECRET);
        let account = await accounts.findOne({email: decoded.email});
        if(!account) {
            res.json({status: false, message: "Account not found"});
            return;
        }
        email = decoded.email;
    } else {
        res.json({status: false, message: "Missing authentication token"});
        return;
    }
    let rows = [];
    let account = await accounts.find({email: email});
    if(account) {
        for(number of account[0].numbers) {
            rows.push({id: account[0].numbers.indexOf(number), Name: number.name, Phone: number.number});
        }
    }
    res.send(rows)
});


app.post('/addToRoster', async(req, res) => {
    let token = req.headers.authorization;
    let email;
    if(token) {
        token = token.replace("Bearer ", "");
        let decoded = jwt.verify(token, TOKEN_SECRET);
        let account = await accounts.findOne({email: decoded.email});
        if(!account) {
            res.json({status: false, message: "Account not found"});
            return;
        }
        email = decoded.email;
    } else {
        res.json({status: false, message: "Missing authentication token"});
        return;
    }

    let account = await accounts.findOneAndUpdate({email: email}, {
        $push: {numbers: {
            name: req.body.name, number: req.body.number
        }}
    });

    if(!account) {
        return;
    }
    res.send({status: true});
});

app.post('/removeFromRoster', async(req, res) => {
    let token = req.headers.authorization;
    if(token) {
        token = token.replace("Bearer ", "");
        let decoded = jwt.verify(token, TOKEN_SECRET);
        let account = await accounts.findOne({email: decoded.email});
        if(!account) {
            res.json({status: false, message: "Account not found"});
            return;
        }
        email = decoded.email;
    } else {
        res.json({status: false, message: "Missing authentication token"});
        return;
    }
    let arr = req.body;
    for(i of arr) {
        let account = await accounts.findOneAndUpdate({email: email}, {
            $pull: {numbers: {
                name: i.Name, number: i.Phone
            }}
        });
    }
    res.send({status: true}) 
});

app.listen(port, () => console.log(`App listening on port ${port}!`));