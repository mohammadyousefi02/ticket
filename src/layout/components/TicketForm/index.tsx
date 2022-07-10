import React, { MouseEventHandler } from 'react'
import Button from '../Button'
import Input from '../Input'
import MySelect from '../Select'
import TextArea from '../TextArea'

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
  addNewTicketHandler:MouseEventHandler<HTMLButtonElement>,
  error:boolean
}

function TicketForm({subject,setSubject,setSupportUnit,message,setMessage,addNewTicketHandler,error}:Props) {
  return (
    <div className='bg-[#313A55] flex-1 flex flex-col gap-4 rounded-lg p-4'>
        <span className='text-sm text-right'>ثبت درخواست پشتیبانی</span>
        <Input value={subject} label="موضوع" id={"subject-input"} placeholder='موضوع خود را درج کنید' onChange={(e)=>setSubject(e.target.value)} />
        <MySelect options={options} label={"واحد پشتیبانی"} placeholder={"واحد مرتبط را انتخاب کنید"} setter={setSupportUnit}/>
        <TextArea value={message} onChange={(e)=>setMessage(e.target.value)} id={"message-input"}
          placeholder='پیغام خود را درج کنید' label="توضیحات"
        />
        <Button onClick={addNewTicketHandler} title="ثبت درخواست"/>
        {error && <p className='text-white text-[18px] text-center'>همه فیلد ها باید پر شود</p>}
    </div>
  )
}

export default TicketForm