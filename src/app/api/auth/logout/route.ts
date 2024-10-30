import { db } from "@/db";
import { authenticateUser } from "@/middleware/authenticateUser";
import { cookies } from "next/headers";

export async function GET(req:Request) {
  const request = await req.json() 
  console.log('NextResponse')
  const user =await authenticateUser()
  await db.token.delete({ 
    where:{
      userId:user.userId
    }
  });

  cookies().set('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  cookies().set('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });


  return Response.json({ msg: 'user logged out!' },{status:200})
  }