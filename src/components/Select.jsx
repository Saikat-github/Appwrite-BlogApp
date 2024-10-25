import React, { useId } from 'react'

const Select = ({ options = [], label, ...props }, ref) => {
  
  const id = useId();
  
  
  return (
    <div>
      {label && <label htmlFor={id} className='md:text-2xl'>{label}</label>}
      <select 
      ref={ref}
      id={id}
      {...props}
      className='flex flex-col border-2 border-gray-300 rounded-lg px-2 py-1'>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)