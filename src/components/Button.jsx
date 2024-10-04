import React from 'react'

const Button = ({children, bgColor, type="submit", className="", ...props}) => {
  return (
    <button type={type} className={`bg-blue-700 px-12 py-2 text-white ${className} ${bgColor} text-lg`} {...props}>
        {children}
    </button>
  )
}

export default Button