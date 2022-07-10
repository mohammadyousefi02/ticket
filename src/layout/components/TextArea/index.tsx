import React, { ChangeEventHandler } from 'react'

interface Props {
    value:string,
    onChange:ChangeEventHandler<HTMLTextAreaElement>,
    placeholder?:string,
    className?:string,
    id?:string,
    label?:string,
    row?:number
}
function TextArea({value,onChange,placeholder="",className="",id="",label="",row=5}:Props) {
  return (
    <div className='flex flex-col flex-1 gap-2'>
            <label htmlFor={id}>{label}</label>
            <textarea value={value} onChange={onChange} id={id} rows={row} placeholder={placeholder} className={`bg-[#122640] p-2 rounded-lg outline-none focus:border-2 focus:border-[#396A9B] ${className}`} />
    </div>

  )
}

export default TextArea