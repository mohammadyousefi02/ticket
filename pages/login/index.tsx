import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { server } from '../../config/server'
import useUserToken from '../../hooks/useUserToken'
import MainLayout from '../../src/layout/MainLayout'
import {useRouter} from "next/router"
import Link from 'next/link'

function Login() {
    const router = useRouter()
    const [token,setToken] = useUserToken()
    if(token)router.push("/tickets")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const loginHandler = async() => {
        try {  
            const res = await axios.post(`${server}/api/auth/login`,{email,password})
            setToken(res.data.token)
            setEmail("")
            setPassword("")
            router.push('/tickets')
        } catch (error) {
            const err:any = error as AxiosError
            setError(err.response?.data.error)
        }
    }
  return (
    <MainLayout height='h-[92%]'>
        <>
            <Link href={'/'}><button className='bg-[#2352C3] py-2 md:p-4 rounded'>بازگشت</button></Link>
            <div className='h-full flex flex-col justify-center gap-4 text-black md:px-[100px]'>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='p-2 md:p-4 rounded' placeholder='ایمیل خود را وارد کنید' />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='p-2 md:p-4 rounded' placeholder='پسورد خود را وارد کنید' />
                <button className='bg-[#2352C3] py-2 md:p-4 rounded text-white' onClick={loginHandler}>ورود</button>
                <p>{error}</p>
            </div>
        </>
    </MainLayout>
  )
}

export default Login