'use client';
import { AuthScreen } from '@/features/auth/components/auth-screen';
import UserButton from '@/features/auth/components/user-button';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { Authenticated, Unauthenticated } from 'convex/react';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();
  const router = useRouter();

  const workspaceId = React.useMemo(() => data?.[0]?._id, [data]);

  React.useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, router, open, setOpen]);
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
