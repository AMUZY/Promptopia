'use client'
import { useState,useEffect} from 'react'

import PromptCard from './PromptCard'


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 mx-16 prompt_layout'>
      {data.map((post)=>{
        return (
          <PromptCard 
            key = {(post._id).$oid}
            post = {post}
            handleTagClick={handleTagClick}
          />
        )
      })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])
  const [origposts, setOrigPosts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    
  }

  // Function to check if str2 exists in str1. Returns Boolean
  function SearchStr(str1,str2){
    return str1.toLowerCase().includes(str2.toLowerCase()) 
  }

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch('api/prompt')
      const data = await response.json();
      setOrigPosts(data)
      setPosts(data)
    }

    fetchPosts();
  }, [])

  let tempPosts = []
  useEffect(()=>{
    tempPosts = origposts.filter((post)=>{ 
      return SearchStr(post.prompt, searchText) || SearchStr(post.tag, searchText) || SearchStr(post.creator.username, searchText) || SearchStr(post.creator.email, searchText)
    }) 
    
    if(searchText.trim().length > 0) {
      setPosts(tempPosts)
    }else{
      setPosts(origposts)
    }
  },[searchText])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder="Search for a tag or a username"
          value={searchText} 
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data = {posts}
        handleTagClick={(tag)=>{
          setSearchText(tag)
        }}
      />

    </section>
  )
}

export default Feed