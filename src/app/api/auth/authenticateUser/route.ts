import { db } from "@/db";
import { CustomError } from "@/errors";
import { attachCookiesToResponse, isTokenValid } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req:Request) {

    const [refreshToken, accessToken] = cookies().getAll();
  if (!refreshToken) {
    console.log(req)
    console.log("refreshToken 1")
    return  CustomError.BadRequestError('somthing went wrong')
  }
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken.value) as JwtPayload;

          return Response.json({ user : payload.user },{status:200})
    }
    const payload = isTokenValid(refreshToken.value) as JwtPayload;
 

    const existingToken = await db.token.findFirst({
      where: {
        userId: payload?.user?.userId,
        refreshToken: payload?.refreshToken,
      },
    });
    console.log('existingToken')



    if (!existingToken || !existingToken.isValid) {
      return  CustomError.BadRequestError('somthing went wrong')
      
    }

console.log('(!existingToken || !existingToken.isValid)')
    await attachCookiesToResponse({
      user: payload.user,
      refreshToken: existingToken?.refreshToken,
    });

    console.log("payload")
    console.log( payload)

    return Response.json({ user : payload.user },{status:200})

  } catch (error) {
    console.log(error)
    return  CustomError.BadRequestError('somthing went wrong')
  }
  
  }