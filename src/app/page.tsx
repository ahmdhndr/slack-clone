'use client';
import { AuthScreen } from '@/features/auth/components/auth-screen';
import UserButton from '@/features/auth/components/user-button';
import { Authenticated, Unauthenticated } from 'convex/react';

export default function Home() {
  return (
    <>
      <Unauthenticated>
        <AuthScreen />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
    </>
  );
}
