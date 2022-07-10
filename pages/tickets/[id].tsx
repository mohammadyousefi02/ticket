import React, { useEffect, useState } from 'react'
import MainLayout from '../../src/layout/MainLayout'
import {FaTelegramPlane} from "react-icons/fa"
import axios from 'axios'
import { server } from '../../config/server'
import Message from '../../src/layout/components/Message'
import { useRouter } from 'next/router'
import useUserToken from '../../hooks/useUserToken'
import { Iticket } from '../../interfaces/ticketInterface'
import TextArea from '../../src/layout/components/TextArea'
import Button from '../../src/layout/components/Button'
import Badge from '../../src/layout/components/Badge'

function SingleTicket() {
    const router = useRouter()
    const [token] = useUserToken()
    if(!token) router.push("/")
    const [message,setMessage] = useState("")
    const [ticket,setTicket] = useState<Iticket>()
    const {id} = router.query
    function getMessages(){
        axios.get(`${server}/api/tickets/${id}`,{
            headers:{
                'x-auth-token':token
            }
        }).then(res=>setTicket(res.data.ticket)).catch(e=>console.log(e))
    }
    useEffect(()=>{
        getMessages()
        const ticketInterval = setInterval(()=>{
            getMessages()
        },5000)
        return ()=>{
            clearInterval(ticketInterval)
        }
    },[])
    const sendNewMessageHandler = async() => {
        if(message) {
            try {
                await axios.post(`${server}/api/tickets/send-new-message/${router.query.id}`,{message},{
                    headers:{
                        'x-auth-token' : token
                    }
                })
                setMessage("")
                getMessages()
            } catch (error) {
                console.log(error)
            }
        }
    }
    const changeTicketStatus = async() => {
        try {
            await axios.post(`${server}/api/tickets/change-ticket-status/${router.query.id}`,null,{
                headers:{
                    'x-auth-token' : token
                }
            })
            setMessage("")
            getMessages()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <MainLayout height='h-[92%]'>
        <div className='pb-4 bg-[#293145] h-full rounded-lg flex flex-col'>
            <div className='flex-1 flex flex-col py-2 overflow-auto px-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <span className='text-[#AAAAAA]'>موضوع درخواست : </span>
                        <span>{ticket?.subject}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span>وضعیت : </span>
                        <span>{ticket?.isSolved ? "بسته شده" : "باز"}</span>
                        <Badge className={`${ticket?.isSolved ? 'bg-green-500' : 'bg-yellow-500'}`}></Badge>
                        {!ticket?.isSolved && <Button title="بستن تیکت" onClick={changeTicketStatus} className="p-2"/>}
                    </div>
                </div>
                {ticket?.messages?.map((m)=>(
                    <Message key={m._id} message={m.message} date={m.date} name={m.user.username} isAdmin={m.user.isAdmin}/>
                ))}
            </div>
            {!ticket?.isSolved && (
                <div className='relative border-t border-[#304066]'>
                <TextArea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='پیام خود را تایپ کنید' className='bg-transparent focus:border-0 w-full p-2 rounded-lg outline-none'/>
                <div className='absolute bottom-0 left-1 bg-[#2352C3] rounded-full p-2' onClick={sendNewMessageHandler}>
                    <FaTelegramPlane className='cursor-pointer' fontSize={18}/>
                </div>
            </div>
            )}
        </div>
    </MainLayout>
  )
}


export default SingleTicket