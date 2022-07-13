import React, { ChangeEventHandler } from 'react'

interface Props {
    value:string,
    onChange:ChangeEventHandler<HTMLTextAreaElement>,
    placeholder?:string,
    className?:string,
    id?:string,
    label?:string,
    row?:number,
    bg?:string,
    gap?:string
}
function TextArea({value,onChange,placeholder="",className="",id="",label="",gap="gap-2",row=5,bg="bg-[#122640]"}:Props) {
  return (
    <div className={`flex flex-col flex-1 ${gap}`}>
            <label htmlFor={id}>{label}</label>
            <textarea value={value} dir="auto" onChange={onChange} id={id} rows={row} placeholder={placeholder} className={`${bg} p-2 resize-none rounded-lg outline-none focus:border-2 placeholder:text-end focus:border-[#396A9B] ${className}`} />
    </div>

  )
}

export default TextArea