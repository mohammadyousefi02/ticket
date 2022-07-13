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
            {unseenedMessages > 0 && <div className='text-[9px] font-bold flex items-center justify-center  w-[14px] h-[14px] right-0 bg-red-500 rounded-full text-center absolute'>{unseenedMessages}</div> }
            <AiOutlineBell fontSize={20}/>
        </div>
        <span >تعداد پشتیبان آنلاین : {onlineAdmins} نفر</span>
    </div>
  )
}

export default TicketPageHeader