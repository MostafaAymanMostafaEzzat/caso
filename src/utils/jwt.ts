import { NextResponse } from "next/server";

const jwt = require('jsonwebtoken');

const createJWT = ({ payload } : {payload :{}}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ( token : string ) => jwt.verify(token, process.env.JWT_SECRET);

export const attachCookiesToResponse = ({ res, user ,refreshToken } :{res: NextResponse , user:{ userId:string, role: string } ,refreshToken:string }) => {
  const accessTokenJWT  = createJWT({ payload: {user} });
  const refreshTokenJWT  = createJWT({ payload: {user,refreshToken} });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookies.set('accessToken', accessTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 3),
    secure: process.env.NODE_ENV === 'production',
  });
  res.cookies.set('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });
};