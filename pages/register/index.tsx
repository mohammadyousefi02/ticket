import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { server } from '../../config/server'
import useUserToken from '../../hooks/useUserToken'
import MainLayout from '../../src/layout/MainLayout'

function Register() {
    const router = useRouter()
    const [token,setToken] = useUserToken()
    if(token)router.push("/tickets")
    const [username,setUsername ] = useState("")
    const [email,setEmail ] = useState("")
    const [password,setPassword ] = useState("")
    const [error,setError ] = useState("")
    const registerHandler = async() => {
      try {  
        const res = await axios.post(`${server}/api/auth/register`,{username,email,password})
        setToken(res.data.token)
        setUsername("")
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
        <div className='h-full flex flex-col gap-4 justify-center text-black px-[100px]'>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className='p-2 md:p-4 rounded' placeholder='یوزرنیم خود را وارد کنید' />
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='p-2 md:p-4 rounded' placeholder='ایمیل خود را وارد کنید' />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='p-2 md:p-4 rounded' placeholder='پسورد خود را وارد کنید' />
            <button className='bg-[#2352C3] py-2 md:py-4 rounded text-white' onClick={registerHandler}>ثبت نام</button>
            <p>{error}</p>
        </div>
      </>
    </MainLayout>
  )
}

export default Register