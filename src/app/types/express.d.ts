import { IssueBadge } from '@/app/components/IssueStatusBadge';

export interface Issue {
    id: number;
    title: string;
    description: string;
    status: IssueBadge;
    created_at: Date;
    updated_at: Date;
  }