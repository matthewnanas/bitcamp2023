const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.post('/addPhone', (req, res) => {
    // TODO: Add phone to database
    res.json({success: true});
});

app.post('/removePhone', (req, res) => {
    // TODO: Remove phone from database
    res.json({success: true});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
