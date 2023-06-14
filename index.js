const express = require('express');
const cors = require('cors')
const app = express();
const mg = require('mailgun-js');
const path = require('path')
require("dotenv").config()

const sgMail = require('@sendgrid/mail')
    
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: '*'
}))


app.post('/email/send', (req, res) => {


    const msg = {
      to: 'skassanjee@gmail.com', // Change to your recipient
      from: 'skassanjee@gmail.com', // Change to your verified sender
      subject: `New message from ${req.body.name}`,
      text: req.body.email,
      html: `<strong>${req.body.message} </strong>`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        res.status(200).send({ message: 'Email sent successfully!' });
      })
      .catch((error) => {
        console.error(error)
      }) 
})


app.get('/home', (req, res) => {
  res.send('hello')
});

app.get('/email/send', (req, res) => {
  res.send('in the api')
})


const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server started...'));