import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth';
import LogoutBtn from '../LogoutBtn';
import cross from '../../assets/cross.svg';
import hamburger from '../../assets/hamburger.svg'

const Header = () => {
    const [options, setOptions] = useState(false);

    const authstatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    const navigate = useNavigate();

    const navItems = [
        {
            url: "/",
            name: "Home",
            active: true
        },
        {
            url: "/login",
            name: "Login",
            active: !authstatus
        },
        {
            url: "/signup",
            name: "SignUp",
            active: !authstatus
        },
        {
            url: "/add-post",
            name: "Add Post",
            active: authstatus
        },
        {
            url: "/profile",
            name: "Profile",
            active: authstatus
        }
    ]

    const onClickHandler = (url) => {
        setOptions(false);
        navigate(url)
    }


    return (
        <div>
            <nav className='w-full bg-gray-900 h-28 flex justify-between px-12 items-center'>
                <Link className="logo text-5xl text-white">
                    Logo
                </Link>

                <div className='flex z-10'>
                    <ul className={`navitems text-white md:flex gap-7 text-xl ${options ? "flex flex-col gap-7 mt-48 bg-gray-900 py-6 px-2 rounded-lg" : "hidden"}`}>
                        {navItems.map((item, idx) => (
                            item.active ? <li className='px-5 rounded-full hover:bg-gray-600 cursor-pointer py-1' key={idx} onClick={() => onClickHandler(item.url)}>{item.name}</li> : null
                        ))}

                        {authstatus && <li className='px-5 rounded-full hover:bg-gray-600 cursor-pointer py-1'><LogoutBtn setOptions={setOptions}/></li>}

                    </ul>
                    {
                        options ? <img src={cross} className='w-8 cursor-pointer md:hidden' alt="" onClick={() => setOptions((prev) => !prev)} /> : <img src={hamburger} className='w-8 cursor-pointer  md:hidden' onClick={() => setOptions((prev) => !prev)} />
                    }
                </div>
            </nav>
        </div>
    )
}

export default Header