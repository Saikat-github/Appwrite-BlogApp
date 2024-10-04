import React, { useState } from 'react'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice.js';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = ({setOptions}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setLoading(true);
    setOptions(false);
    await authService.logout();
    dispatch(logout());
    alert("User logged out succesfully");
    navigate("/login");
    setLoading(false);
  };


  return (
    <button onClick={logoutHandler}>
      {loading ? <div className="h-6 w-6 border-4 border-t-blue-500 rounded-full animate-spin "></div> :"Logout"}
    </button>
  )
}

export default LogoutBtn