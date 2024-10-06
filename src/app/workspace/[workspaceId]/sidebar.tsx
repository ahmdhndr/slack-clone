import UserButton from '@/features/auth/components/user-button';
import {
  BellIcon,
  Home,
  MessagesSquareIcon,
  MoreHorizontal,
} from 'lucide-react';
import SidebarButton from './sidebar-button';
import WorkspaceSwitcher from './workspace-switcher';

const Sidebar = () => {
  return (
    <aside className='w-[70px] h-full bg-midnight-green flex flex-col gap-y-4 items-center pt-[9px] pb-4'>
      <WorkspaceSwitcher />
      <SidebarButton icon={Home} label='Home' isActive />
      <SidebarButton icon={MessagesSquareIcon} label='DMs' />
      <SidebarButton icon={BellIcon} label='Activity' />
      <SidebarButton icon={MoreHorizontal} label='More' />
      <div className='flex flex-col items-center gap-y-1 mt-auto'>
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
