import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import React from 'react';
import { useCurrentUser } from '../api/use-current-user';
import { Loader, LogOut } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';

const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader className='size-4 animate-spint text-muted-foreground' />;
  }

  if (!data) {
    return null;
  }

  const { name, image } = data;

  const avatarFallback = name!.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='outline-none relative'>
        <Avatar className='size-10 hover:opacity-75 transition'>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className='bg-orange-pastel text-bone-white'>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' side='right' className='w-60'>
        <DropdownMenuItem
          onClick={() => void signOut()}
          className='cursor-pointer'
        >
          <LogOut className='size-4 mr-2' />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
