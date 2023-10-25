'use client';

import React from 'react'
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';


interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => { 
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/issues/new`, data);
      router.push('/issues');
    } catch (error) {
      console.error('Error creating the issue:', error);
      // We are using fetch elsewhere, need to decide which to use going forward
    }
  };

  return (
    <>
      <form className='max-w-xl space-y-3'
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
    </>
  )
}

export default NewIssuePage