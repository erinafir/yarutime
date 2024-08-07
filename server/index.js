const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aetherdstorm@gmail.com',
      pass: 'docu lmhk wvyo geha'
    }
  });
  
  let mailOptions = {
//     // from: 'aetherdstorm@gmail.com',
//     // to: 'erina.fir@gmail.com',
//     // subject: 'Welcome to Villaku',
//     // text: 'GG EZ'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  module.exports = {mailOptions, transporter}