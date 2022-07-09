import React, { MouseEventHandler } from 'react'
import MySelect from '../Select'

const options = [
    {label:'واحد فروش',value:'فروش'},
    {label:'واحد فنی',value:'فنی'},
    {label:'مدیریت',value:'مدیریت'},
    {label:'واحد مالی',value:'مالی'},
]

interface Props {
  subject:string,
  setSubject:(value:string)=>void,
  setSupportUnit:(value:string)=>void,
  setMessage:(value:string)=>void,
  message:string,
  addNewTicketHandler:MouseEventHandler<HTMLButtonElement>
}

function TicketForm({subject,setSubject,setSupportUnit,message,setMessage,addNewTicketHandler}:Props) {
  return (
    <div className='bg-[#313A55] flex-1 flex flex-col gap-4 rounded-lg p-4'>
        <span className='text-sm text-right'>ثبت درخواست پشتیبانی</span>
        <div className='flex flex-col gap-2'>
            <label htmlFor="">موضوع</label>
            <input value={subject} onChange={(e)=>setSubject(e.target.value)} type="text" placeholder='موضوع خود را درج کنید' className='bg-[#122640] p-2 rounded-lg outline-none' />
        </div>
        <MySelect options={options} label={"واحد پشتیبانی"} placeholder={"واحد مرتبط را انتخاب کنید"} setter={setSupportUnit}/>
        <div className='flex flex-col flex-1 gap-2'>
            <label htmlFor="">توضیحات</label>
            <textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={5} placeholder='پیغام خود را درج کنید' className='bg-[#122640] p-2 rounded-lg outline-none' />
        </div>
        <button onClick={addNewTicketHandler} className='bg-[#2352C3] py-3 rounded-lg'>ثبت درخواست</button>
    </div>
  )
}

export default TicketForm