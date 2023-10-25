import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'


interface Issue {
  title: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

const IssuesPage = () => {
  return (
    <>
      <div>IssuesPage</div>
      <div>
        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      </div>
    </>
  )
}

export default IssuesPage