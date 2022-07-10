import Link from 'next/link'
import React from 'react'

interface Props {
    id:string,
    subject:string,
    supportUnit:string,
    status:boolean
}

function TicketCard({id, subject, supportUnit,status}:Props) {
  return (
        <div className='bg-[#313A55] flex justify-between items-center py-2 rounded-lg px-2'>
            <span className='text-[#EBBA07]'>{subject}</span>
            <span>{supportUnit}</span>
            <span className='bg-[#122640] py-1 w-[80px] text-center rounded-full'>{status ? "بسته شده" : "باز"}</span>
            <div className='flex gap-2'>
              <div className='w-[1px] h-auto bg-[#AAA]'></div>
              <Link href={`/tickets/${id.toString()}`}><span className='text-[#EBBA07] cursor-pointer'>مشاهده</span></Link>
            </div>
        </div>
  )
}

export default TicketCard