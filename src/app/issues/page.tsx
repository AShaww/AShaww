'use client'
import React, { useState, useEffect } from 'react';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import axios from 'axios'; // Import Axios
import LoadingSkeleton from 'react-loading-skeleton'; // Import Loading Skeleton
import IssueStatusBadge, { IssueBadge } from '../components/IssuesStatusBadge';
import IssueActions from './IssueActions';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: IssueBadge;
  created_at: Date;
  updated_at: Date;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/issues/`);
        console.log(response.data)
        setIssues(response.data as Issue[]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            Array(5).fill(0).map((_, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <LoadingSkeleton width={200} height={20} />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <LoadingSkeleton width={100} height={20} />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <LoadingSkeleton width={120} height={20} />
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            issues.map(issue => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>
                    {issue.title}
                  </Link>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                {new Date(issue.created_at).toDateString()}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
