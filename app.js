//jshint eversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function (req, res) {
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: process.env.GMAIL_USER,
        from: req.body.email,
        subject: req.body.subject,
        text: `${req.body.name} \n ${req.body.message}`,
    };
    sgMail.send(msg);
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started");
    }
});
