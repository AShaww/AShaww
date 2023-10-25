'use client';

import React, { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import z from 'zod';

interface IssueForm {
  title: string;
  description: string;
}

const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required')
});


const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      createIssueSchema.parse(data);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/issues/new`, data);
      router.push('/issues');
    } catch (error) {
      setError('An unexpected error occured.');
    }
  };

  return (
    <div className='max-w-xl '>
      { error && 
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      <form 
        className='space-y-3' 
        onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input size='3' placeholder='Title' {...register('title')}/>
        </TextField.Root>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>}
        />
        <Button>Submit new issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage
