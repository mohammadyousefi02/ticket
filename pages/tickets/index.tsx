import React, { useEffect, useLayoutEffect, useState } from 'react'
import MainLayout from '../../src/layout/MainLayout'
import {AiOutlineBell} from "react-icons/ai"
import {FiChevronsLeft,FiChevronsRight,FiChevronLeft,FiChevronRight} from "react-icons/fi"
import Select, { IndicatorsContainerProps,components } from "react-select"
import { ConsoleConstructorOptions } from 'console'
import useGetDecodedToken from '../../hooks/useGetDecodedToken'
import axios from 'axios'
import { server } from '../../config/server'
import Link from 'next/link'
import useUserToken from '../../hooks/useUserToken'
import { useRouter } from 'next/router'
import MySelect from '../../src/layout/components/Select'
import PaginationFooter from '../../src/layout/components/PaginationFooter'
import TicketForm from '../../src/layout/components/TicketForm'
import TicketCards from '../../src/layout/components/TicketCards'
import TicketPageHeader from '../../src/layout/components/TicketPageHeader'
import TicketCardsHeader from '../../src/layout/components/TicketCardsHeader'
import { addNewTicketHandler, getOnlineAdmins, getUserData, setUnseenedMessageNumber } from './actions/ticket'
import {useSelector,useDispatch} from "react-redux"
import usePagination from '../../hooks/usePagination'
import { Iuser } from '../../interfaces/userInterface'



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
    if(!token) router.push('/')
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
            setInterval(()=>{
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