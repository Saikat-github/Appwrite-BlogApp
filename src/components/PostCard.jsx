import React from 'react'
import { Link } from 'react-router-dom'
import dbService from '../appwrite/data'

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-60  bg-gray-100 rounded-xl p-4 shadow-2xl shadow-pink-700 hover:scale-105 transition-[0.6s]'>
        <div className='w-full justify-center mb-4'>
          <img src={dbService.getFilePreview(featuredImage)} alt={title}
            className='rounded-xl w-full' />

        </div>
        <h2
          className='text-xl font-bold'
        >{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard