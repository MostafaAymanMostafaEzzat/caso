import { db } from "@/db";



export async function GET(req:Request):Promise<Response>{


    const request = await req.json()
    const {email,verificationToken}=request
if (!email || !verificationToken) {
  console.log('111111')
  throw new Error(' email and verificationToken not found');

}
const user=await db.user.findFirst({
    where:{
        email:email
    }
})
// const user=await User.findOne({email})
if (!user) {
  console.log('22222222')

  throw new Error('Verification Failed');
}
if (verificationToken !== user.verificationToken) {
  console.log('33333333')

  throw new Error('Verification Failed');
}


await db.user.update({
    where:{
        email:email
    },
    data:{
        isVerified:true,
        verifiedDate: Date.now().toString(),
        verificationToken : ''
    }
})
// user.isVerified=true
// user.verifiedDate= Date.now()
// user.verificationToken = '';
// await user.save();

 return Response.json({msg:'Email Verified'},{status:200})

}
