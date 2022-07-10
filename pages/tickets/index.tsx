import React, { useEffect, useState } from 'react'
import MainLayout from '../../src/layout/MainLayout'
import useGetDecodedToken from '../../hooks/useGetDecodedToken'
import useUserToken from '../../hooks/useUserToken'
import { useRouter } from 'next/router'
import PaginationFooter from '../../src/layout/components/PaginationFooter'
import TicketForm from '../../src/layout/components/TicketForm'
import TicketCards from '../../src/layout/components/TicketCards'
import TicketPageHeader from '../../src/layout/components/TicketPageHeader'
import TicketCardsHeader from '../../src/layout/components/TicketCardsHeader'
import { addNewTicketHandler, getOnlineAdmins, getUserData, setUnseenedMessageNumber } from '../../actions/ticket'
import {useSelector,useDispatch} from "react-redux"
import usePagination from '../../hooks/usePagination'
import { Iuser } from '../../interfaces/userInterface'

let interval:any;

function Tickets() {
    const dispatch = useDispatch()
    const {tickets:adminTickets} = useSelector((store:any)=>store.adminTickets)
    const {tickets:userTickets} = useSelector((store:any)=>store.userTickets)
    const {page} = useSelector((store:any)=>store.pagination)
    const userTicketsList = usePagination(userTickets,page)
    const router = useRouter()
    const userInfo = useGetDecodedToken()
    const [token] = useUserToken()
    const [onlineAdmins,setOnlineAdmins] = useState(0)
    if(!token) {
        router.push('/')
        interval && clearInterval(interval)
    }
    const [user,setUser] = useState<Iuser>()
    const [unseenedMessages,setUnseenedMessages] = useState(setUnseenedMessageNumber(user!))
    useEffect(()=>{
        if(!userInfo.isAdmin){
            getOnlineAdmins(setOnlineAdmins)
            getUserData(userInfo,setUser,dispatch)
        }
    },[])
    useEffect(()=>{
       if(!userInfo.isAdmin){
            setUnseenedMessages(setUnseenedMessageNumber(user!))
           interval = setInterval(()=>{
                getUserData(userInfo,setUser,dispatch)
                setUnseenedMessages(setUnseenedMessageNumber(user!))
                getOnlineAdmins(setOnlineAdmins)
            },15000)
       }
    },[])
    const [supportUnit, setSupportUnit] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const addNewTicket = () => {
        addNewTicketHandler({supportUnit,subject,message},token,setSupportUnit,setSubject,setMessage,userInfo,setUser,dispatch)
    }
  return (
    <MainLayout>
        <div className='px-4 pb-4 bg-[#293145] h-full rounded-lg flex flex-col'>
            {!userInfo?.isAdmin && <TicketPageHeader unseenedMessages={unseenedMessages!} onlineAdmins={onlineAdmins!}/>}
            <TicketCardsHeader/>
            {userInfo?.isAdmin ? <TicketCards tickets={adminTickets}/> : <TicketCards userTickets={userTicketsList}/>}
            <PaginationFooter/>
            {!userInfo.isAdmin && <TicketForm subject={subject} setSubject={setSubject} setSupportUnit={setSupportUnit} message={message}
                setMessage={setMessage} addNewTicketHandler={addNewTicket}
            />}
        </div>
    </MainLayout>
  )
}


export default Tickets