'use client';

import React from 'react';
import Sidebar from './sidebar';
import Toolbar from './toolbar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import WorkspaceSidebar from './workspace-sidebar';

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceIdLayout({
  children,
}: WorkspaceIdLayoutProps) {
  return (
    <div className='h-full'>
      <Toolbar />
      <div className='flex h-[calc(100vh-40px)]'>
        <Sidebar />
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel
            defaultSize={20}
            minSize={20}
            className='bg-light-green'
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={50}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
