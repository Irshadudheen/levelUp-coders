
import { IsentEmail } from "../../usecases/interface/service/sentEmail";
import nodeMailer from 'nodemailer';

export class SentEmail implements IsentEmail{
    
    async sentEmailVerification(name: string, email: string, verification: string): Promise<any> {
        const transporter = nodeMailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.MATLER_EMAIL,
                pass:process.env.MATLER_PASSWORD
            }
        })
        const sentVerificationEmail = async (name:string,toEmail:string,verificationCode:string)=>{
            const mailOptions ={
                from:process.env.MATLER_EMAIL,
                to:toEmail,
                subject:'Email Verification',
                text:`Hello ${name} ,\n\n Your verification code is:${verificationCode}\n\n Thanks \n LevelUP`
            }
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent:'+info.response);
            } catch (error) {
                console.error('Error sending email:',error)
                return error
                
            }
        }
        await   sentVerificationEmail(name,email,verification);
    }

}