import React from 'react'
import { useId } from 'react';

const Input = ({ label, type = "text", className = "", ...props }, ref) => {
    
    const id = useId();
    
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1 md:text-2xl'
                htmlFor={id}>
                {label} :
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-2 border-gray-300 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
}

export default React.forwardRef(Input);