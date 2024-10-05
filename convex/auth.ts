import { convexAuth } from '@convex-dev/auth/server';
import Github from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
// import { Password } from '@convex-dev/auth/providers/Password';
import CustomPassword from './CustomPassword';
// import Resend from '@auth/core/providers/resend';
// import { ResendOTPPasswordReset } from './passwordReset/ResendOTPPasswordReset';
// import { ResendOTP } from './otp/ResendOtp';

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Github,
    Google,
    CustomPassword,
    // Resend({
    //   from: process.env.AUTH_EMAIL,
    // }),
    // ResendOTP,
    // Password({
    //   id: 'password-code',
    //   reset: ResendOTPPasswordReset,
    //   verify: ResendOTP,
    // }),
  ],
});
