import React from 'react';
import Input from './Input';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login as storeLogin} from '../store/authSlice';



const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const navigate = useNavigate();

    const create = async (data) => {
        setLoading(true);
        setError("");
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(storeLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }
    return (
        <div className="flex justify-center h-screen z-10 bg-[#00000090] animate">
            <div className={`my-2 mx-auto md:w-full max-w-lg h-3/4 bg-stone-300  p-4 md:p-10 border border-black/10 animate-[fadeIn_0.5s]`}>
                <div className='flex justify-end'>
                    <Link to='/' className='flex justify-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='h-6 cursor-pointer'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                    </Link >
                </div>
                
                <h2 className="text-center md:text-3xl leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-xs md:text-sm text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5 mt-4'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
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
                        <Button type="submit" className="w-full flex gap-2 justify-center" >
                            Creat Account
                            {loading ? <div className="h-6 w-6 border-4 border-t-blue-500 rounded-full animate-spin "></div> : null}
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUp