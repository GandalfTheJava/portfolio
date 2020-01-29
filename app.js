//jshint eversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const nodemailer = require('nodemailer');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
          extended: true
}));
app.get('/', function(req, res) {
          res.sendFile(__dirname + "/index.html");
})

app.post('/', function(req, res) {
          // async..await is not allowed in global scope, must use a wrapper
          async function main() {
                    // Generate test SMTP service account from ethereal.email
                    // Only needed if you don't have a real mail account for testing
                    let testAccount = await nodemailer.createTestAccount();

                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                              service: "Gmail",
                              auth: {
                                        user: process.env.GMAIL_USER, // generated ethereal user
                                        pass:process.env.GMAIL_PASS // generated ethereal password
                              }
                    });

                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                              from: req.body.email, // sender address
                              to: process.env.EMAIL_RECEIVER, // list of receivers
                              subject: req.body.subject, // Subject line
                              text: req.body.email + "\n" + req.body.subject + "\n" + req.body.message, // plain text body

                    });

                    console.log('Message sent: %s', info.messageId);
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }

          main().catch(console.error);
          res.redirect("/");
});

app.listen(3000, function(err) {
          if (err) {
                    console.log(err);
          } else {
                    console.log("Server Started");
          }
});
