import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({path:".env"})

export const sendEmail = (to, subject , text , html)=>{

try {
    
    const transporter = nodemailer.createTransport({
        service :"gmail",
        auth:{
            user :process.env.COMPANY_EMAIL,
            pass :process.env.EMAIL_PASSWORD 
        }
    })

    const mailOptions = {
        from :process.env.COMPANY_EMAIL,
        to,
        subject,
        text ,
        html
    }
    
    transporter.sendMail(mailOptions  , (error, info )=>{
        console.log("Email Sent To " , info?.response);
        
    }   )
} catch (error) {
    console.log("Email Not Sent To" , error);
   
}
}