'use client'
import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const CreatePrompt = () => {
    const Router = useRouter();
    const { data: session } = useSession();

    const [submitting,setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    
    const PromptCreate = async (e)=>{
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', 
            {
                method : 'POST',
                body : JSON.stringify({
                    userid : session?.user.id,
                    prompt : post.prompt,
                    tag : post.tag 
                })
            })

            if(response.ok){
                Router.push('/')
            }
        } catch(error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <Form 
        type="Create "
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={PromptCreate}
    />
  )
}

export default CreatePrompt