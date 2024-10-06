'use client';

import CreateWorkspaceModal from '@/features/workspaces/components/create-workspace-modal';
import React from 'react';

const Modals = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <CreateWorkspaceModal />;
};

export default Modals;
