'use client';
import { AuthScreen } from '@/features/auth/components/auth-screen';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { Unauthenticated } from 'convex/react';
import { useRouter } from 'next/navigation';
import React from 'react';

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
    </>
  );
}
