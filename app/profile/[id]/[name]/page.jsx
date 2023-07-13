'use client'
import { useState,useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'
 

const MyProfile = ({ params }) => {
    const {data : session} = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState([])
    let idcheck =  params.id;
    let username = params.name;
    console.log(session?.user.id + " " + idcheck)


    useEffect(()=>{
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${idcheck}/posts`)
          const data = await response.json();

          setPosts(data);
        }
    
        if(idcheck){
            fetchPosts();
        }
      }, [idcheck])
      
    const handleEdit = (post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post)=>{
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if(hasConfirmed) {
          try{
            await fetch(`/api/prompt/${post._id.toString()}`, {
              method : 'DELETE'
            });

            const filteredPosts = posts.filter((p)=>
              p._id !== post._id
            )

            setPosts(filteredPosts)
          }catch(error){
            console.log(error)
          }
        }
    }

  return (
    <Profile 
        name={session?.user.id === idcheck ? 'My' : `${username}'s`}
        desc={session?.user.id === idcheck ? `Welcome to your personalized profile page` : `Welcome to ${username}'s profile page, you can only see the profile of others while you're logged in`}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile