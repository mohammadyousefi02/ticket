import Link from 'next/link'
import React from 'react'

interface Props {
    id:string,
    subject:string,
    supportUnit:string
}

function TicketCard({id, subject, supportUnit}:Props) {
  return (
    <Link key={id.toString()} href={`/tickets/${id.toString()}`}>
        <div className='bg-[#313A55] flex justify-between items-center py-2 rounded-lg px-2'>
            <span className='text-[#EBBA07]'>{subject}</span>
            <span>{supportUnit}</span>
        </div>
    </Link>
  )
}

export default TicketCard