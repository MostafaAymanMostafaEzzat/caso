import { db } from "@/db";
import { notFound } from "next/navigation";

import { sendVerificationEmail } from '@/utils/sendVerficationEmail';
import crypto from 'crypto'
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export async function POST(req:Request) :Promise<Response>{
  let i= 0

  console.log(i++)
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log(i++)

const request = await req.json() 
console.log(i++)

  if (!request ) {
    return notFound()
  }
console.log(i++)

  const { email, name, password } = request;
console.log(i++)

  if(!email || !name || !password){
    throw new Error('please provide email and name and password')
  }
console.log(i++)
 
  const emailAlreadyExists = await db.user.findFirst({
    where:{
      email:email
    }
  }
  )
console.log(i++)

  // const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new Error('Email already exists')
  }
  console.log(i++)

  // first registered user is an admin
  const isFirstAccount = (await db.user.count()) === 0;
  const role = isFirstAccount ? 'admin' : 'user';
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);
console.log(i++)
  
  const verificationToken = crypto.randomBytes(40).toString('hex');
console.log(i++)

  const user = await db.user.create({
    data:{
      email:email,
      role:role,
      password:passwordHashed,
      verificationToken:verificationToken

    }
  })
console.log(i++)

  // const user = await User.create({ name, email, password, role,verificationToken });

  
const URL =`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-email?token=${verificationToken}&email=${email}`
const message=`<p>Please confirm your email by clicking on the following link : 
<a href="${URL}">Verify Email</a> </p>`;

  //send Email
  await sendVerificationEmail({email:user.email,verificationToken,origin:process.env.NEXT_PUBLIC_SERVER_URL!})
    return Response.json({msg:'done'},{status:201});

//  await sendVerificationEmail({name:user.name,email:user.email,verificationToken,origin})
// console.log(req.headers['x-forwarded-host'])
//save the verificationToken to the user
// user.verificationToken=verificationToken

  // return NextResponse.json({status:201})
   
    
  }