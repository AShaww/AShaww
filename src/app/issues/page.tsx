'use client'

import React, { useEffect, useState } from 'react';
import { Button, Text } from '@radix-ui/themes';
import Link from 'next/link';
import axios from 'axios';

interface Issue {
  title: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/issues/all`);
        console.log(response)
        if (response.status === 200) {
          setIssues(response.data);
        } else {
          console.error('Error fetching issues:', response);
        }
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };
    fetchIssues();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Text className="text-2xl font-bold">
          Issues
        </Text>
        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {issues.map((issue, index) => (
          <div key={index} className="bg-white p-4 rounded shadow hover:shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">{issue.title}</h2>
            <p className="text-gray-600 mt-2">{issue.description}</p>
            <p className="text-sm mt-2">
              Status: <span className="text-green-500">{issue.status}</span>
            </p>
            <div className='flex space-x-11 mt-4'>
              <p className='text-xs'>
                Created: {new Date(issue.created_at).toDateString()}
              </p><p className='text-xs'>
                Updated: {new Date(issue.updated_at).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesPage;
