'use client';

import React from 'react';
import { AuthFlow } from '../types';
import SignInCard from './sign-in-card';
import SignUpCard from './sign-up-card';

export const AuthScreen = () => {
  const [state, setState] = React.useState<AuthFlow>('signIn');
  return (
    <div className='h-full flex items-center justify-center bg-midnight-green'>
      <div className='md:h-auto md:w-[420px]'>
        {state === 'signIn' ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};
