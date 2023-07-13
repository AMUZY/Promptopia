'use client'
import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

export default function PromptCard ({ post , handleTagClick, handleEdit, handleDelete}) {
  const [copied, setCopied] = useState("");
  const pathName = usePathname()
  const { data: session } = useSession()
  const router = useRouter()
  const [highlight, setHighLight] = useState("")

  const handleCopy = ()=>{
    setCopied(post.prompt);
      navigator.clipboard.writeText(post.prompt);
      setTimeout(()=> setCopied(""), 3000)
  }


  return (
    <div className='prompt_card'>
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={()=>{
            session?.user.id && router.push(`/profile/${post.creator._id}/${post.creator.username}`)
          }}
        >
          <Image
          src = {post.creator.image}
          alt = 'user_image'
          width = {40}
          height = {40}
          className="rounded-full object-contain" 
          />

          <div className="flex items-start flex-col">
            <h3 className="font-satoshi text-base font-semibold text-gray-900">
              {post.creator.username}
              </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={()=>{
          handleCopy()
        }}>
          <Image 
            src = {copied === post.prompt ?
            '/assets/icons/tick.svg'
            : '/assets/icons/copy.svg'}
            width = {12}
            height= {12}
            alt='copy icon or tick icon'
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-left text-gray-700">
        {post.prompt}
      </p>
      <p className="font-inter text-sm text-left blue_gradient hover:text-red-300 cursor-pointer"
      onClick={()=>
        handleTagClick && handleTagClick(post.tag)
      }>#{post.tag}</p>

      {(session?.user.id === post.creator._id) && (pathName === `/profile/${session?.user.id}/${post.creator.username}`) && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}
          >
            Edit
          </p>
          <p
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}
