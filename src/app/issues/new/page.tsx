'use client';

import React, { useState } from 'react'
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { createIssueSchema } from '../../createIssueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting ] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      createIssueSchema.parse(data);
      setSubmitting(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/issues/new`, data);
      router.push('/issues');
    } catch (error) {
      setSubmitting(false)
      setError('An unexpected error occured.');
    }
  });

  return (
    <div className='max-w-xl'>
      { error && 
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      <form 
        className='space-y-3' 
        onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input size='3' placeholder='Title' {...register('title')}/>
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder='Description'
            />
          )}
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit new issue  { isSubmitting &&  <Spinner/> }
        </Button>
      </form>
    </div>
  );
}

export default NewIssuePage
