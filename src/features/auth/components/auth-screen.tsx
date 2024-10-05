'use client';

import React from 'react';
import { AuthFlow } from '../types';
import SignInCard from './sign-in-card';
import SignUpCard from './sign-up-card';
import { Toaster } from '@/components/ui/toaster';

export const AuthScreen = () => {
  const [state, setState] = React.useState<AuthFlow>('signIn');
  // const [step, setStep] = React.useState<"signIn" | "signUp" | { email: string } | "forgot">(
  //   "signIn",
  // )
  return (
    <div className='h-full flex items-center justify-center bg-midnight-green'>
      <div className='md:h-auto md:w-[420px]'>
        {state === 'signIn' ? (
          <SignInCard
            setState={setState}
            handlePasswordReset={() => setState('forgot')}
            provider='password-code'
          />
        ) : state === 'signUp' ? (
          <SignUpCard setState={setState} />
        ) : state === 'forgot' ? (
          <div>Forgot</div>
        ) : (
          <div>Check Code</div>
        )}
      </div>
      <Toaster />
    </div>
  );
};
