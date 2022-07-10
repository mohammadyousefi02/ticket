import React, { ChangeEventHandler } from 'react'

interface Props {
    value:string,
    onChange:ChangeEventHandler<HTMLInputElement>,
    type?:string,
    placeholder?:string,
    className?:string,
    id?:string,
    label?:string
}

function Input({value,onChange,type="text",placeholder="",className="",id="",label=""}:Props) {
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor={id}>{label}</label>
        <input value={value} id={id} onChange={onChange} type={type} placeholder={placeholder} className={`bg-[#122640] p-2 rounded-lg outline-none focus:border-2 focus:border-[#396A9B] ${className}`} />
    </div>
  )
}

export default Input