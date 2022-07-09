import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import {CgMenuRight} from "react-icons/cg"
import {IoArrowBackSharp} from "react-icons/io5"
import {BiLogOut} from "react-icons/bi"
import useUserToken from '../../hooks/useUserToken'
import useGetDecodedToken from '../../hooks/useGetDecodedToken'
import axios from 'axios'
import { server } from '../../config/server'
import {useDispatch} from "react-redux"
import {setAdminTickets} from "../../redux/slices/adminTicketsSlice"
import {setUserTickets} from "../../redux/slices/userTicketsSlice"

interface Iprops{
    children?:React.ReactNode,
    height?:string
}

function Header() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [token,setToken,removeToken] = useUserToken()
    const decoded = useGetDecodedToken()
    const [status,setStatus] = useState(false)
    useEffect(()=>{
        if(decoded?.isAdmin)setStatus(decoded.isOnline!)
    },[])
    const logOut = () => {
        removeToken()
        dispatch(setAdminTickets([]))
        dispatch(setUserTickets([]))
    }
    const getTickets = async() => {
        try {
            const res = await axios.get(`${server}/api/get-tickets`,{
                headers:{
                    'x-auth-token' : token
                }
            })
            dispatch(setAdminTickets(res.data.tickets))
        } catch (error) {
            console.log(error)
        }
    }
    const changeStatus = async() => {
        try {
            await axios.post(`${server}/api/change-status`,null,{
                headers:{
                    'x-auth-token' : token
                }
            })
            setStatus(!status)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <header className='py-4 border-b border-[#9c9c9c]'>
                <div className='flex items-center justify-between px-3'>
                    <div className='flex items-center gap-2'>
                        <CgMenuRight fontSize={18} className="mt-1"/>
                        <span>پشتیبانی</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        {router.query.id ? <Link href={"/tickets"}><IoArrowBackSharp fontSize={18}/></Link> : <BiLogOut onClick={logOut} fontSize={18}/> }
                        {decoded.isAdmin && (
                            <>
                                <div className='flex items-center gap-2'>
                                    <span className={`w-2 h-2 rounded-full ${status ? "bg-green-500" : "bg-red-500"} mt-1`}></span>
                                    <span>{status ? "online" : "offline"}</span>
                                </div>
                                <button onClick={changeStatus}>change status</button>
                                <button onClick={getTickets}>get tickets</button>
                            </>
                        )}
                    </div>
                </div>
            </header> 
    )
}

function MainLayout({children,height=""}:Iprops) {
    const [token,setToken] = useState('')
    const [tokenn] = useUserToken()
    useEffect(()=>{
        setToken(tokenn)
    },[tokenn])
  return (
    <div className='h-full text-white text-[12px] sm:px-[50px] md:px-[100px] lg:px-[150px] xl:px-[200px]' dir='auto'>
        {token && <Header/>}
        <main className={`py-6 px-3 pb-9 ${height}`}>
            {children}
        </main>
    </div>
  )
}

export default MainLayout