import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/data';
import { useSelector } from 'react-redux';
import { Button, PostCard } from '../components';
import Homebg from '../assets/homebg1.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        if (userData) {
          const result = await dbService.getPosts();
          setPosts(result.documents);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userData]);



  return (loading ? (
    <div className='h-screen flex'>
      <div className="h-20 w-20 border-8 border-t-red-500 rounded-full animate-spin mx-auto mt-40"></div>
    </div>
  ) :

    <div className="py-10 flex flex-col gap-10 p-6 sm:mx-32 lg:mx-60">
      {
        posts ? posts.map((post) => (
          <div key={post.$id}>
            <PostCard {...post} />
          </div>
        )) :
          <div className='text-4xl flex flex-col lg:flex-row justify-between md:ml-20 '>
            <div className='md:mt-10'>
              <p className='font-Cormorant text-6xl md:text-9xl text-stone-800'>Human, <br />stories & ideas</p>
              <p className='font-Cormorant my-6 text-xl md:text-3xl'>A place to read, write and deepen your understanding.</p>
              <Button onClick={() => navigate("/login")} className='bg-stone-900 hover:bg-stone-950 trnasition duration-200' bgColor={"bg-green-700"}>Start Reading</Button>
            </div>
            <img src={Homebg} className='lg:w-1/3 mt-10 lg:mt-0' alt="" />
          </div>
      }
    </div>
  )
}

export default Home

