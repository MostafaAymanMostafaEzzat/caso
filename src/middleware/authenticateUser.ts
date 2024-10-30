import { db } from '@/db';
import { attachCookiesToResponse, isTokenValid } from '@/utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers'


export const authenticateUser = async () => {
    const [refreshToken, accessToken ] = cookies().getAll();
    try {
      if(accessToken){
        const payload  = isTokenValid( accessToken.value ) as JwtPayload;
        return payload.user
        
      }
      const payload = isTokenValid( refreshToken.value ) as JwtPayload;
      const existingToken =await db.token.findFirst({
            where:{
                user:payload.user.userId,
                refreshToken:payload.refreshToken
            }
      })
  
      if(!existingToken || !existingToken?.isValid){
      throw new Error('your account is blocked');
  
      }
  
      attachCookiesToResponse({user:payload.user,refreshToken:existingToken.refreshToken})
      return payload.user
    } catch (error) {
      throw new Error('Authentication Invalid');
    }
  };