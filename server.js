const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const smtpConfig = {
    host: 'smtp.protonmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'PinggMeee@proton.me',
    }
};

const transporter = nodemailer.createTransport(smtpConfig);

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'recipient@example.com', // Replace with your recipient's email
        subject: subject,
        text: `From: ${name} (${email})\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
