'use client';
import { Button } from '@/components/ui/button';
import { AuthScreen } from '@/features/auth/components/auth-screen';
import { useAuthActions } from '@convex-dev/auth/react';
import { Authenticated, Unauthenticated } from 'convex/react';

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <>
      <Unauthenticated>
        <AuthScreen />
      </Unauthenticated>
      <Authenticated>
        <div>
          Logged In!
          <Button onClick={() => void signOut()}>Sign out</Button>
        </div>
      </Authenticated>
    </>
  );
}
