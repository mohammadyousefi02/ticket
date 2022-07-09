import React from 'react'
import { AiOutlineBell } from 'react-icons/ai'

interface Props {
  unseenedMessages:number,
  onlineAdmins:number
}

function TicketPageHeader({unseenedMessages,onlineAdmins}:Props) {
  return (
    <div className='flex items-center justify-between border-b py-2'>
        <div className='relative'>
            <div className='text-[10px] px-[5px] right-0 bg-red-500 rounded-full text-center absolute'>{unseenedMessages}</div>
            <AiOutlineBell fontSize={28}/>
        </div>
        <span >تعداد پشتیبان آنلاین : {onlineAdmins} نفر</span>
    </div>
  )
}

export default TicketPageHeader