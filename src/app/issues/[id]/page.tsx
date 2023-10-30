'use client'

import { notFound } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IssueBadge } from '@/app/components/IssuesStatusBadge';

interface Issue {
    id: number;
    title: string;
    description: string;
    status: IssueBadge;
    created_at: Date;
    updated_at: Date;
  }
  
interface Props {
  params: { id: string };
}

const IssueDetailPage = ({ params }: Props) => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/issues/${params.id}`);

        if (response.data) {
          setIssue(response.data as Issue);
        } else {
          notFound();
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching issue:', error);
        notFound();
      }
    };

    fetchIssue();
  }, [params.id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : issue ? (
        <>
          <p>{issue.title}</p>
          <p>{issue.description}</p>
          <p>{issue.status}</p>
          <p>{new Date(issue.created_at).toDateString()}</p>
        </>
      ) : null}
    </div>
  );
};

export default IssueDetailPage;
