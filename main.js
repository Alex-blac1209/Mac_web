const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const port = 4000;
app.listen(4000, () => console.log("app is running :D"));
app.use(express.static("public/"));
app.use(express.json());


//send email

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ttes77673@gmail.com',
            pass: 'Omal1234'
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'macmrcopywriter@gmail.com',
        subject: `Wiadomość od ${req.body.email}: ${req.body.subject}`,
        html: `<h2 style="text-transform:uppercase;letter-spacing:2px;">Uwaga nowe zlecenie!</h2><p>Treść wiadomości: <br />${req.body.message}</p><p>Numer telefonu: ${req.body.phone_number}<br /> Email: ${req.body.email} <br /> Imię: ${req.body.firstname} <br /> Nazwisko: ${req.body.lastname}</p>`
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent:' + info.response);
            res.send('success');
        }
    })
})
