import { db } from "@/db";
import { CustomError } from "@/errors";

export async function POST(req: Request): Promise<Response> {
 try {
  const request = await req.json();
  const { email_, verificationToken } = request;
  const email =decodeURIComponent(email_)
console.log('1')
console.log(email)
  if (!email || !verificationToken) {
console.log('2')

    return  CustomError.BadRequestError('somthing went wrong')
    
  }
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });
console.log('3')


  if (!user) {
console.log('4')

    return CustomError.UnauthenticatedError('Verification Failed');
  }
console.log('5')

  if (verificationToken !== user.verificationToken) {
    return CustomError.UnauthenticatedError('Verification Failed');
  }
  console.log('6')

  await db.user.update({
    where: {
      email: email,
    },
    data: {
      isVerified: true,
      verifiedDate: new Date(Date.now()),
      verificationToken: "",
    },
  });
console.log('7')
  

  return Response.json({ msg: "Email Verified" }, { status: 200 });
 } catch (error) {
console.log('8')

  return  CustomError.BadRequestError('somthing went wrong')
 }
}
