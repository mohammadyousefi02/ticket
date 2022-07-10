import React from 'react'

interface Props {
    className?:string
}

function Badge({className}:Props) {
  return (
    <span className={`w-2 h-2 rounded-full mt-1 ${className}`}></span>
  )
}

export default Badge