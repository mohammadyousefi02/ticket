import React, { ChangeEventHandler } from 'react'

interface Props {
    value:string,
    onChange:ChangeEventHandler<HTMLInputElement>,
    type?:string,
    placeholder?:string,
    className?:string,
    id?:string,
    label?:string,
    bg?:string
}

function Input({value,onChange,type="text",placeholder="",className="",id="",label="",bg="bg-[#122640]"}:Props) {
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor={id}>{label}</label>
        <input dir='auto' value={value} id={id} onChange={onChange} type={type} placeholder={placeholder} className={`${bg} p-2 rounded-lg outline-none focus:border-2 focus:border-[#396A9B] placeholder:text-end ${className}`} />
    </div>
  )
}

export default Input