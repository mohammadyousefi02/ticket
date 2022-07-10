import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { server } from '../../config/server'
import useUserToken from '../../hooks/useUserToken'
import MainLayout from '../../src/layout/MainLayout'
import {useRouter} from "next/router"
import Link from 'next/link'
import Input from '../../src/layout/components/Input'
import Button from '../../src/layout/components/Button'

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
            <Link href={'/'}><button className='bg-[#2352C3] py-2 md:p-4 rounded px-2'>بازگشت</button></Link>
            <div className='h-full flex flex-col justify-center gap-4 md:px-[100px]'>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} className='p-2 md:p-4 bg-[#313A56]' placeholder='ایمیل خود را وارد کنید' />
                <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='p-2 md:p-4 bg-[#313A56]' placeholder='پسورد خود را وارد کنید' />
                <Button title="ورود" className=' py-2 md:p-4' onClick={loginHandler}/>
                <p className='text-lg text-center'>{error}</p>
            </div>
        </>
    </MainLayout>
  )
}

export default Login