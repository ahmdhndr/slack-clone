import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React from 'react';
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '../api/use-create-workspace';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreateWorkspaceModal = () => {
  const { mutate, isPending } = useCreateWorkspace();
  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = React.useState('');
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(id) {
          toast.success('Workspace created.');
          router.push(`/workspace/${id}`);
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
          <DialogDescription>
            Create a workspace and ready to share with your group!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='workspace-name' className='text-muted-foreground'>
              Workspace Name
            </label>
            <Input
              id='workspace-name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              required
              autoFocus
              minLength={3}
              placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
            />
          </div>

          <Button
            type='submit'
            disabled={isPending}
            className='w-full bg-midnight-green hover:bg-midnight-green/90'
          >
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
