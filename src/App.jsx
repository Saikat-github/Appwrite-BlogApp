import React, { useEffect, useState } from 'react'
import { Footer, Header } from './components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // useEffect(() => {
  //   authService.getCurrentUser().then((userData) => {
  //       if(userData) {
  //         dispatch(login(userData))
  //       } else {
  //         dispatch(logout());
  //         navigate("/login")
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("User Can't be logged in, error in app.jsx", error.message);
  //     })
  //     .finally(() => setLoading(false));
  // }, [])

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login( userData ));
        } else {
          dispatch(logout())
          navigate("/login")
        }
      })
      .catch((error) => {
        console.log("Error occured in app.jsx, user can't be logged in", error)
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='font-OpenSans'>
      <Header />
      <main className='bg-stone-100'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App