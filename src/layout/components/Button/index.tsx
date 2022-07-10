import React from 'react'

interface Props {
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    title:string,
    className?:string
}

function Button({onClick,title,className=""}:Props) {
  return (
    <button onClick={onClick} className={`bg-[#2352C3] py-3 rounded-lg ${className}`}>{title}</button>
  )
}

export default Button