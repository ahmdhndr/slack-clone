import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthFlow } from '../types';
import { FaGithub } from 'react-icons/fa';
import { useAuthActions } from '@convex-dev/auth/react';
import { toast } from 'sonner';
// import { TriangleAlert } from 'lucide-react';

interface SignInCardProps {
  setState: (state: AuthFlow) => void;
  provider?: string;
  handleSent?: (email: string) => void;
  handlePasswordReset?: () => void;
}

const SignInCard = ({
  setState,
  // provider,
  // handleSent,
  // handlePasswordReset,
}: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  // const [error, setError] = React.useState<string>('');
  const [pending, setPending] = React.useState<boolean>(false);

  const onSubmitCredentialSignin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setPending(true);
    // const formData = new FormData(e.currentTarget);
    // signIn(provider ?? 'password', formData)
    //   .then(() => {
    //     handleSent?.(email);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     // const title =
    //     //   flow === "signIn"
    //     //     ? "Could not sign in, did you mean to sign up?"
    //     //     : "Could not sign up, did you mean to sign in?";
    //     // toast({ title, variant: "destructive" });
    //     // setSubmitting(false);
    //   });
    signIn('password', { email, password, flow: 'signIn' })
      .catch(() => {
        // setError('Invalid email or password!');
        toast.error('Invalid Email or Password!');
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handleSignInProvider = (value: 'github' | 'google') => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setError('');
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setError('');
    setPassword(e.target.value);
  };

  return (
    <Card className='w-full h-full p-8 bg-bone-white'>
      <CardHeader className='px-0 pt-0 text-midnight-green'>
        <CardTitle>Login to continue</CardTitle>
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
        <form onSubmit={onSubmitCredentialSignin} className='space-y-2.5'>
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
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className='text-muted-foreground'>
                Password
              </label>
              {/* {handlePasswordReset ? (
                <Button
                  className='p-0 h-auto'
                  type='button'
                  variant='link'
                  onClick={handlePasswordReset}
                >
                  Forgot your password?
                </Button>
              ) : null} */}
            </div>
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
          <Button
            type='submit'
            className='w-full bg-light-green hover:bg-light-green/80'
            size='lg'
            disabled={pending}
          >
            Sign In
          </Button>
        </form>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-bone-white px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-2.5'>
          <Button
            disabled={pending}
            onClick={() => handleSignInProvider('google')}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-2.4 left-2.5' />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleSignInProvider('github')}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute top-2.4 left-2.5' />
            Continue with Github
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <span
            onClick={() => setState('signUp')}
            className='text-midnight-green hover:underline cursor-pointer'
          >
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
