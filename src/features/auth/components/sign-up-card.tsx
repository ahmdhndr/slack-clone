import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthFlow } from '../types';
import { FaGithub } from 'react-icons/fa';

interface SignUpCardProps {
  setState: (state: AuthFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  return (
    <Card className='w-full h-full p-8 bg-bone-white'>
      <CardHeader className='px-0 pt-0 text-midnight-green'>
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-5 px-0 pb-0'>
        <form action='#' className='space-y-2.5'>
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            type='email'
            required
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            type='password'
            required
          />
          <Input
            disabled={false}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            type='password'
            required
          />
          <Button
            type='submit'
            className='w-full bg-light-green hover:bg-light-green/80'
            size='lg'
            disabled={false}
          >
            Sign Up
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-2.5'>
          <Button
            disabled={false}
            onClick={() => {}}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-2.4 left-2.5' />
            Continue with Google
          </Button>
          <Button
            disabled={false}
            onClick={() => {}}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute top-2.4 left-2.5' />
            Continue with Github
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Already have an account?{' '}
          <span
            onClick={() => setState('signIn')}
            className='text-midnight-green hover:underline cursor-pointer'
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
