import { db } from "@/db";
import { notFound } from "next/navigation";

import { sendVerificationEmail } from '@/utils/sendVerficationEmail';
import crypto from 'crypto'
import { Resend } from "resend";
import comparePassword from "@/utils/comparePassword";
import { NextRequest, NextResponse } from "next/server";
import { attachCookiesToResponse } from "@/utils/jwt";
const bcrypt = require('bcrypt');
// :Promise<Response>
export async function POST(req:Request) {
  const request = await req.json() 
  console.log('NextResponse')
  const { email, password:canditatePassword } = request;

  if (!email || !canditatePassword) {
    throw new Error('Please provide email and password');
  }
  const  user = await db.user.findUnique({
    where:{
      email:email
    }
  })
  // const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid Credentials');
  }
  const isPasswordCorrect = await comparePassword({canditatePassword, password:user.password});
  if (!isPasswordCorrect) {
    throw new Error('Invalid Credentials');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your email');
  }
   const tokenUser =  { userId: user.id, role: user.role };

//create refreshToken and accessToken
  let refreshToken=''
  //check if there are existingToken for that user
  const existingToken=await db.token.findUnique({
    where:{
      userId:user.id
    }
  })
  // const existingToken=await Token.findOne({user:user._id})
  if(existingToken){
    if(!existingToken.isValid){
    throw new Error('your account is blocked');
    }
    refreshToken=existingToken.refreshToken;
    attachCookiesToResponse({ user: tokenUser , refreshToken });
    return Response.json({ user: tokenUser },{status:200})
    
  }
  refreshToken= crypto.randomBytes(40).toString('hex');
  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  const userAgent = req.headers.get('user-agent')!;

  const token = await db.token.create({
    data:{
      refreshToken,ip,userAgent,userId:user.id
    }
  })
  // const token = await Token.create({refreshToken,ip,userAgent,user:user._id})

  attachCookiesToResponse({ user: tokenUser , refreshToken });

//  return res.status(StatusCodes.OK).json({ user: tokenUser });
    
  return Response.json({ user: tokenUser },{status:200})
  }