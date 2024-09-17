import { createTransport } from 'nodemailer';
import User from '../models/User.js';

const transporter = createTransport({
    port: process.env.SMTP_PORT,               // true for 465, false for other ports
    host: process.env.SMTP_HOST,
       auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
         },
    secure: true,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
    });

 const sendmail = async (mail, type, data) => {
        let subjectMail = "";
        let htmlBody = "";
        if(type === 'signup'){
            subjectMail = 'Confirm account';
            htmlBody = ' <p><center><strong>Welcome to Sustainova</strong></center> </p> <br /> <br /> <br />  <p> Dear <strong>'+data.name+'</strong> <br/> <br/> <p>Thank you for signing up for Sustainova . We \'re really happy to have you .<br/> </p> Tap the link below from  your desktop to finish logging into Sustainova </p> <br/> The link is valid for 1h <br/> <br/> Link to confirm your mail : <a href='+ data.link+'/Valid/'+data.token+' target="_blank"><strong> Click To Confirm </strong></a> <br /> <br /> If your on mobile device please copy the link below into your browser : <br /> <br />  <strong>'+ data.link+'/Valid/'+data.token+'</strong> <br /> <br /> <br /> <br />  Best regards, <br /> <br /> <strong> Sustainova </strong>  ';
        }
        if(type === 'forgotPassword'){
            subjectMail = 'Change password';
            htmlBody = '<p><center><strong>Password Reset</strong></center> </p> <br /> <br /> <br /> <p>If you \'ve lost your password or wish to reset it ,use the link below to get started</p> <br /> <br /> <br /> Link to change password : <a href='+ data.link+'/NewPassword/'+data.token+' target="_blank"> Reset Your Password </a>';
            htmlBodyAdmin = '<p><p><center><strong>A user want to change his password  </strong></center> </p> <br /> <br /> <br/> <strong>Email</strong> : '+mail +' </p>' 

        }

        const mailData = {
            from: '"Sustainova" example@mail.tn',  // sender address
                to: mail,   // list of receivers
                subject: subjectMail,
                html: htmlBody,
            };
        
               transporter.sendMail(mailData, function (err, info) {
                    if(err){ console.log(err)}
                    });
    }



export default {sendmail} ;
