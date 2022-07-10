import React from 'react'
import { Iticket } from '../../../../interfaces/ticketInterface'
import { IuserTicket } from '../../../../interfaces/userInterface'
import TicketCard from '../TicketCard'

interface Props {
  userTickets?:IuserTicket[] | boolean,
  tickets?:Iticket[]
}

function TicketCards({userTickets=false, tickets}:Props) {
  return (
    <div className='flex flex-col gap-2 my-4 overflow-x-auto min-w-[500px]'>
        {typeof userTickets !== "boolean" ? userTickets?.map((t)=>(
            <TicketCard id={t.ticket} supportUnit={t.supportUnit} key={t.ticket} status={t.isSolved} subject={t.subject} />
        )) :  tickets?.map((t)=>(
          <TicketCard id={t._id} subject={t.subject} status={t.isSolved} supportUnit={t.supportUnit} key={t._id}/>
        ))}
    </div>
  )
}

export default TicketCards