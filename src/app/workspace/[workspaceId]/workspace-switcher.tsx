import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useGetWorkspaceById } from '@/features/workspaces/api/use-get-workspace-by-id';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { Loader, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const WorkspaceSwitcher = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_open, setOpen] = useCreateWorkspaceModal();
  const workspaceId = useWorkspaceId();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspaceById({
    id: workspaceId,
  });
  const { data: workspaces } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace._id !== workspaceId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='size-9 flex items-center justify-center relative rounded-md bg-bone-white hover:bg-bone-white/80 text-midnight-green font-semibold text-xl'>
          {workspaceLoading ? (
            <Loader className='size-5 animate-spin shrink-0' />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64' side='bottom' align='start'>
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className='cursor-pointer flex-col justify-start items-start capitalize'
        >
          {workspace?.name}
          <span className='text-sx text-muted-foreground'>
            Active Workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className='cursor-pointer capitalize'
            onClick={() => router.push(`/workspace/${workspace._id}`)}
          >
            <div className='shrink-0 size-9 relative overflow-hidden bg-midnight-green text-bone-white font-semibold text-xl rounded-md flex items-center justify-center mr-2'>
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className='truncate'>{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => setOpen(true)}
        >
          <div className='size-9 relative overflow-hidden bg-[#f2f2f2] text-midnight-green font-semibold text-xl rounded-md flex items-center justify-center mr-2'>
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
