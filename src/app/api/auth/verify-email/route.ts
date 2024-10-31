import { db } from "@/db";
import { CustomError } from "@/errors";

export async function POST(req: Request): Promise<Response> {
 try {
  const request = await req.json();
  const { email, verificationToken } = request;

  if (!email || !verificationToken) {
    return  CustomError.BadRequestError('somthing went wrong')
  }
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return CustomError.UnauthenticatedError('Verification Failed');
  }
  if (verificationToken !== user.verificationToken) {
    return CustomError.UnauthenticatedError('Verification Failed');
  }

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

  return Response.json({ msg: "Email Verified" }, { status: 200 });
 } catch (error) {
  return  CustomError.BadRequestError('somthing went wrong')
 }
}
