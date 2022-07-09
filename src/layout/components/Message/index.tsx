import React from 'react'

import { DateObject } from "react-multi-date-picker"

import persian from "react-date-object/calendars/persian"


interface Iprops {
    name:string,
    message:string,
    isAdmin?:boolean,
    date:number
}

function Message({name,message,isAdmin=false,date}:Iprops) {
  const messagedate = new DateObject({
    date ,
    calendar: persian,
    format:"YYYY/MM/DD HH:mm:ss"
  })
  return (
    <div className={`${!isAdmin ? "bg-[#313A55]" : "bg-[#2352C3] self-end"} w-[250px] py-2 rounded-lg my-2`}>
        <div className='flex flex-col gap-1 border-b pb-2 px-2 text-[#808080] border-[#AAA]'>
            <span>{name}</span>
            <span>{messagedate.format()}</span>
        </div>
        <p className='my-2 px-2 '>{message}</p>
    </div>
  )
}

export default Message