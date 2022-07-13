import React from 'react'

function TicketCardsHeader() {
  return (
    <>
        <span>لیست درخواست های ایجاد شده</span>
        <div className='flex items-center gap-8 justify-between my-2 mt-6 px-2 min-w-[calc(100%+12.8rem)] sm:min-w-[500px]'>
            <span>موضوع</span>
            <span className='translate-x-8'>واحد پشتیبانی</span>
            <span className='translate-x-8'>وضعیت</span>
            <span>مشاهده</span>
        </div>
    </>
  )
}

export default TicketCardsHeader