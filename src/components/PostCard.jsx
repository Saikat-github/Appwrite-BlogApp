import React from 'react'
import { Link } from 'react-router-dom'
import dbService from '../appwrite/data'
import parse from 'html-react-parser';
import userLogo from '../assets/logo2.png'

const PostCard = ({ $id, title, featuredImage, content }) => {


  return (
    <Link to={`/post/${$id}`} className='w-full bg-gray-100 shadow-xl hover:scale-105 transition duration-300 flex justify-between p-6 sm:p-10 lg:p-16 gap-6 sm:flex-row flex-col'>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <img src={userLogo} className='w-6 h-6 rounded-full' alt="" />
          <p className='text-xs'>John Jacab</p>
        </div>
        <h2
          className='md:text-xl font-bold my-3'
        >{title}
        </h2>
        <p className='text-stone-700 text-xs md:text-sm'>Read more ...</p>
      </div>
      <img src={dbService.getFilePreview(featuredImage)} alt={title}
        className='w-28 h-20' />
    </Link>
  )
}

export default PostCard