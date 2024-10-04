import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dbService from '../appwrite/data';
import { PostForm } from '../components';
import { useSelector } from 'react-redux';

const EditPost = () => {
  const {slug} = useParams();
  const [post, setPost] = useState();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? userData.$id === post.userId : false;


  useEffect(() => {
    if(slug) {
      dbService.getPost(slug).then((res) => {
        setPost(res)
      })
      .catch((error) => {
        console.log("Error occured in Post.jsx, can't find post", error)
      })
    }
  }, [slug]);


  return (post && isAuthor) ? <PostForm post={post} /> : <div className='h-screen text-center text-4xl text-red-700 pt-28'>You don't have permissions to manipulate the post</div>
    
}

export default EditPost