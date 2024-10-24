import sendEmail from './sendEmail';

export const sendVerificationEmail = async ({email,verificationToken,origin})=>{

const URL =`${origin}/user/verify-email?token=${verificationToken}&email=${email}`
const message=`<p>Please confirm your email by clicking on the following link : 
<a href="${URL}">Verify Email</a> </p>`;

return sendEmail({
     to:email,
     subject:'Email Confirmation',
     html:`<h4>hello</h4>
     ${message}`
})

}

 