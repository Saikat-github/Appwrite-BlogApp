import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { set, useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { login as storeLogin } from '../store/authSlice'




const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {isSubmitting}, reset} = useForm();
    const navigate = useNavigate();

    const login = async (data) => {
        setLoading(true);
        setError("");
        try {
            const session = await authService.login(data);
            if(session) {
                // const userData = await authService.getCurrentUser();
                // if(userData) dispatch(storeLogin(userData));
                // navigate("/")
                authService.getCurrentUser().then((userData) => {
                    if(userData) dispatch(storeLogin(userData));
                    navigate("/");
                })
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            reset();
        }
    }


    return (
        <div
            className='flex justify-center h-screen z-10 bg-[#00000090]'
        >
            <div className={`my-2 md:mx-auto md:w-full max-w-lg h-3/4 bg-stone-300  p-4 md:p-10 border border-black/10 animate-[fadeIn_1s] `}>
                <div className='flex justify-end'>
                    <Link to='/' className='flex justify-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='h-6 cursor-pointer'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                    </Link >
                </div>
                {/* <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <p className="logo text-4xl sm:text-6xl text-gray-900">
                            Logo
                        </p>
                    </span>
                </div> */}
                <h2 className="text-center md:text-3xl leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-xs text-center md:text-sm text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full flex gap-2 justify-center"
                            disabled={isSubmitting}
                        >Login{loading ? <div className="h-6 w-6 border-4 border-t-blue-500 rounded-full animate-spin "></div> : null}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login