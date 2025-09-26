const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

exports.sendEmail=async({to,subject,text,html})=>{
    const msg={
        form:process.env.EMAIL_USER,
        to,subject,text,html
    };
    return transporter.sendMail(msg);
}