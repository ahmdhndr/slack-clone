import React from 'react';

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage: React.FC<WorkspaceIdPageProps> = ({ params }) => {
  return <div>ID: {params.workspaceId}</div>;
};

export default WorkspaceIdPage;
