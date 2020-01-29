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
    sgMail.setApiKey("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");
    const msg = {
        to: "mehmetcimen23@gmail.com",
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
