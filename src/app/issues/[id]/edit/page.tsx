'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { Issue } from '@/app/types/express';
import IssueFormSkeleton from './loading';
import dynamic from 'next/dynamic';

const IssueForm = dynamic(
  () => import('@/app/issues/[id]/_components/IssueForm'),
  {
    ssr: false, 
    loading: () => <IssueFormSkeleton />
  }
)

interface Props {
  params: { id: string };
}

const EditIssuePage = ({ params }: Props) => {
  const [issue, setIssue] = useState<Issue>();
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/issues/${params.id}`
        );
        setIssue(response.data);
      } catch (error) {
        console.error('Error fetching issue:', error);
        notFound();
      }
    };

    fetchIssue();
  }, [params.id]);

  if (!issue) return <div>Loading...</div>;

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
