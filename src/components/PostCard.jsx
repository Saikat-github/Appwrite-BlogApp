import React from 'react'
import { Link } from 'react-router-dom'
import dbService from '../appwrite/data'

const PostCard = ({ $id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-80  bg-gray-100 shadow-xl hover:scale-105 transition duration-300'>
        <div className='w-full justify-center'>
          <img src={dbService.getFilePreview(featuredImage)} alt={title}
            className='w-full' />

        </div>
        <h2
          className='text-xl font-bold mx-2 my-3'
        >{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard