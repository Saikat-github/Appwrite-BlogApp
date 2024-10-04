import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/data';
import { useSelector } from 'react-redux';
import { PostCard } from '../components';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState();

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

    <div className="flex flex-wrap justify-center gap-10 p-6 h-screen">
      {
        posts ? posts.map((post) => (
          <div key={post.$id}>
            <PostCard {...post} />
          </div>
        )) : <div className='text-4xl'>No Posts to Show, Login to see Posts. </div>
      }
    </div>
  )
}

export default Home

