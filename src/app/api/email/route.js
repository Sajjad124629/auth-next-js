import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(req,res){
  
    const {searchParams} = new URL(req.url);
    let ToEmail = searchParams.get('email');
    let toPassword = searchParams.get('password');
    let formData = {
      email:ToEmail,
      password:toPassword,
    }
    const queryString = new URLSearchParams(formData).toString();
    
    const transporter = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 25,
        secure: false,
        auth: {
          user: 'info@teamrabbil.com',
          pass: '~sR4[bhaC[Qs'
        },
        tls:{
            rejectUnauthorized:false
        }
      });

     let myEmail = {
        from: '"Fred Foo 👻" <info@teamrabbil.com>', // sender address
        to: ToEmail, // list of receivers
        subject: "Mail Send ✔", // Subject line
        text: "This Is From Sajjad Hossain", // plain text body
        html: "<b>This Is From Sajjad Hossain</b>", // html body
      }
      try{
       let info =   await transporter.sendMail(myEmail);
       return NextResponse.json([
        {message:'Email Send Successfully'}
      ],{status:201,headers:{'Set-Cookie':`token=${queryString};path=/;`}});
    
      }catch(e){
        return  NextResponse.json({msg:"Fail to Send Email"})
      }
}