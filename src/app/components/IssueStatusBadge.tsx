import { Badge } from '@radix-ui/themes';
import React from 'react';

export type IssueBadge = 'OPEN' | 'IN_PROGRESS' | 'CLOSED';

const statusMap: Record<IssueBadge, { label: string; color: 'red' | 'violet' | 'green' }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: { status: IssueBadge }) => {
  return (
    <Badge color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
