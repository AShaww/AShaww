'use client'

import { notFound } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Issue } from '@/app/types/express';
import { Box, Flex, Grid } from '@radix-ui/themes';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
  
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
        <Grid columns={{ initial: '1', sm: '5' }} gap="5">
        <Box className='md:col-span-4'>
          <IssueDetails issue={issue} />
        </Box>
        <Box>
          <Flex direction="column" gap="4">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      </Grid>
      ) : null}
    </div>
  );
};

export default IssueDetailPage;
