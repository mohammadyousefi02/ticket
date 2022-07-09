import React from 'react'

function TicketCardsHeader() {
  return (
    <>
        <span className='my-2'>لیست درخواست های ایجاد شده</span>
        <div className='flex items-center justify-between my-2 px-2'>
            <span>موضوع</span>
            <span>واحد پشتیبانی</span>
        </div>
    </>
  )
}

export default TicketCardsHeader