import React from 'react'

function TicketCardsHeader() {
  return (
    <>
        <span className='my-2'>لیست درخواست های ایجاد شده</span>
        <div className='flex items-center justify-between my-2 px-2 min-w-[500px]'>
            <span>موضوع</span>
            <span className='translate-x-8'>واحد پشتیبانی</span>
            <span className='translate-x-8'>وضعیت</span>
            <span>مشاهده</span>
        </div>
    </>
  )
}

export default TicketCardsHeader