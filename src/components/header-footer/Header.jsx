import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LogoutBtn from '../LogoutBtn';
import cross from '../../assets/cross2.svg';
import hamburger from '../../assets/hamburger2.svg'
import logo from '../../assets/logo2.png'

const Header = () => {
    const [options, setOptions] = useState(false);

    const authstatus = useSelector((state) => state.auth.status);
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
            <nav className='w-full bg-stone-100 h-20 flex justify-between px-4 sm:px-12 items-center'>
                <Link>
                    <img src={logo} className='w-20 h-16 rounded-xl object-cover' alt="" />
                </Link>

                <div className='flex z-10'>
                    <ul className={`navitems md:flex gap-7 text-sm ${options ? "flex flex-col gap-7 mt-48 bg-stone-300 py-6 px-2" : "hidden"}`}>
                        {navItems.map((item, idx) => (
                            item.active ? <li className='px-5  hover:bg-gray-300 cursor-pointer py-2' key={idx} onClick={() => onClickHandler(item.url)}>{item.name}</li> : null
                        ))}

                        {authstatus && <li className='px-5 hover:bg-gray-300 cursor-pointer py-2 border-sky-600 border-2'><LogoutBtn setOptions={setOptions}/></li>}

                    </ul>
                    {
                        options ? <img src={cross} className='w-8 cursor-pointer md:hidden' alt="" onClick={() => setOptions((prev) => !prev)} /> : <img src={hamburger} className='w-8 cursor-pointer  md:hidden' onClick={() => setOptions((prev) => !prev)} />
                    }
                </div>
            </nav>
            <hr className='h-0.5 bg-black'/>
        </div>
    )
}

export default Header