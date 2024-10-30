import { db } from "@/db";
import crypto from 'crypto'
import bcrypt from 'bcrypt';
import { sendResetPasswordEmail } from "@/utils/sendResetPasswordEmail";

export async function POST(req:Request) {
  const request = await req.json() 
  console.log('NextResponse')
  const {email} =request;
  if (!email ) {
    throw new Error('Please provide email ');
  }
  console.log('NextResponse 1')

  const user = await db.user.findUnique({where:{ email }});
  console.log('NextResponse 2')

  if (user) {
    const passwordToken =crypto.randomBytes(60).toString('hex');
    await db.user.update({where:{ email },data:{passwordToken,passwordTokenExpirationDate:new Date(Date.now() + 1000*60*5)}});
    console.log('NextResponse 3')

   await sendResetPasswordEmail({email:user.email,verificationToken:passwordToken,origin:process.env.NEXT_PUBLIC_SERVER_URL!})
   console.log('NextResponse 4')

  }
  console.log('NextResponse 5')
 
  return Response.json({msg: 'Please check your email for reset password link'},{status:200})
  }