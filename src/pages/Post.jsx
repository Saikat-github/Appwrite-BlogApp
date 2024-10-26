import React, { useCallback, useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import dbService from '../appwrite/data';
import { Button } from '../components';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import userLogo from "../assets/logo2.png"



const Post = () => {
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const [post, setPost] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAuthor = post && userData ? userData.$id === post.userId : false;

  useEffect(() => {
    setError("");
    if (slug) [
      dbService.getPost(slug).then((res) => {
        if (res) {
          setPost(res);
        }
      })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        })
    ]
  }, [slug]);


  const deletePost = () => {
    setLoading(true);
    if (post.$id) {
      dbService.deletePost(post.$id).then((res) => {
        if (res) {
          dbService.deleteFile(post.featuredImage);
          navigate("/");
        }
      })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        })
    } else {
      setLoading(false);
    }

  }

  const formatDate = useCallback((isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString(); // This will format the date and time based on the user's locale
  }, []);


  return post ? (
      <div className="sm:mx-16 md:mx-32 lg:mx-72 p-4 sm:p-8 flex flex-col gap-6">
          <div className="w-full">
            <h1 className="text-xl sm:text-4xl font-bold text-stone-800">{post.title}</h1>
          </div>
          <div className='flex gap-2 items-center'>
            <img src={userLogo} className='w-8 h-8 rounded-full' />
            <p className='text-xs'>John Jacab <br /> <span>{formatDate(post.$updatedAt)}</span></p>
          </div>
          <img
            src={dbService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full sm:h-80"
          />
          <div className="text-sm md:text-lg">
            {parse(post.content)}
          </div>

        {isAuthor && (
          <div className="w-full space-y-5 flex flex-col mt-10 sm:text-sm text-xs">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-600" className="sm:text-sm text-xs mr-3 w-36 hover:bg-opacity-85">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-700 flex gap-3" onClick={deletePost} className='sm:text-sm text-xs w-36 hover:bg-opacity-85 flex gap-3 justify-center'>
              Delete
              {loading && <div className="h-6 w-6 border-4 border-t-blue-500 rounded-full animate-spin "></div>}
            </Button>
          </div>
        )}
      </div>
  ) : (error ? <div className='h-[50vh] text-center text-3xl py-20'>{error}</div> : null);
}

export default Post