import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useGetWorkspaceById } from '@/features/workspaces/api/use-get-workspace-by-id';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { AlertTriangle, Loader } from 'lucide-react';
import React from 'react';
import WorkspaceHeader from './workspace-header';

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspaceById({
    id: workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className='flex flex-col bg-light-green h-full items-center justify-center'>
        <Loader className='size-5 animate-spin text-bone-white' />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className='flex flex-col gap-y-2 bg-light-green h-full items-center justify-center'>
        <AlertTriangle className='size-5 text-bone-white' />
        <p className='text-bone-white text-sm'>Workspace not found!</p>
      </div>
    );
  }
  return (
    <div className='flex flex-col bg-light-green h-full'>
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === 'admin'}
      />
    </div>
  );
};

export default WorkspaceSidebar;
