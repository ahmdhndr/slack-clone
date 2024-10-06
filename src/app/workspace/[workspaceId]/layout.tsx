'use client';

import React from 'react';
import Toolbar from './toolbar';
import Sidebar from './sidebar';
import { Authenticated } from 'convex/react';

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceIdLayout({
  children,
}: WorkspaceIdLayoutProps) {
  return (
    <Authenticated>
      <div className='h-full'>
        <Toolbar />
        <div className='flex h-[calc(100vh-40px)]'>
          <Sidebar />
          {children}
        </div>
      </div>
    </Authenticated>
  );
}
