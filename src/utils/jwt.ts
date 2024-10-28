
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
const jwt = require('jsonwebtoken');

const createJWT = ({ payload } : {payload :{}}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ( token : string ) => jwt.verify(token, process.env.JWT_SECRET);

export function attachCookiesToResponse ({ user ,refreshToken } :{ user:{ userId:string, role: string } ,refreshToken:string }) {
  const accessTokenJWT  = createJWT({ payload: {user} });
  const refreshTokenJWT  = createJWT({ payload: {user,refreshToken} });

  const oneDay = 1000 * 60 * 60 * 24;

  cookies().set('accessToken', accessTokenJWT);
  cookies().set('refreshToken', refreshTokenJWT);
};