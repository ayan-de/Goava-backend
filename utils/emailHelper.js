const nodemailer = require("nodemailer");

const mailHelper = async (option) => {
    // const testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASS, // generated ethereal password
      },
    });

    const message = {
      from: 'deayan252@gmail.com', // sender address
      to: option.email, // list of receivers
      subject: option.subject, // Subject line
      text: option.message, // plain text body
    //   html: "<b>Hello world?</b>", // html body
    }
  
    // send mail with defined transport object
     await transporter.sendMail(message)
  
}

module.exports = mailHelper