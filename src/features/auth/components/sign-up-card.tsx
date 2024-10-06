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
import { useAuthActions } from '@convex-dev/auth/react';
// import { TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

interface SignUpCardProps {
  setState: (state: AuthFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const [fullName, setFullname] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  // const [error, setError] = React.useState<string>('');
  const [pending, setPending] = React.useState<boolean>(false);

  const onSubmitCredentialSignup = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      // setError('Password do not match!');
      toast.error('Password do not match!');
      return;
    }

    setPending(true);
    signIn('password', { fullName, email, password, flow: 'signUp' })
      .catch(() => {
        // setError('Invalid email or password!');
        toast.error('Invalid Email or Password!');
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handleSignUpProvider = (value: 'github' | 'google') => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  const onChangeFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setError('');
    setFullname(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setError('');
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setError('');
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setError('');
    setConfirmPassword(e.target.value);
  };

  return (
    <Card className='w-full h-full p-8 bg-bone-white'>
      <CardHeader className='px-0 pt-0 text-midnight-green'>
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {/* {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />
          <p>{error}</p>
        </div>
      )} */}
      <CardContent className='space-y-5 px-0 pb-0'>
        <form onSubmit={onSubmitCredentialSignup} className='space-y-2.5'>
          <div>
            <label htmlFor='fullname' className='text-muted-foreground'>
              Full Name
            </label>
            <Input
              id='fullname'
              disabled={pending}
              value={fullName}
              onChange={onChangeFullname}
              placeholder='Full name'
              type='text'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='text-muted-foreground'>
              Email
            </label>
            <Input
              id='email'
              disabled={pending}
              value={email}
              onChange={onChangeEmail}
              placeholder='Email'
              type='email'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='text-muted-foreground'>
              Password
            </label>
            <Input
              id='password'
              disabled={pending}
              value={password}
              onChange={onChangePassword}
              placeholder='Password'
              type='password'
              required
            />
          </div>
          <div>
            <label htmlFor='confirm-password' className='text-muted-foreground'>
              Confirm Password
            </label>
            <Input
              id='confirm-password'
              disabled={pending}
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
              placeholder='Confirm Password'
              type='password'
              required
            />
          </div>
          <Button
            type='submit'
            className='w-full bg-light-green hover:bg-light-green/80'
            size='lg'
            disabled={pending}
          >
            Sign Up
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-2.5'>
          <Button
            disabled={pending}
            onClick={() => handleSignUpProvider('github')}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-2.4 left-2.5' />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleSignUpProvider('github')}
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
