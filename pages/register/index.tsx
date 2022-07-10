import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { server } from '../../config/server'
import useUserToken from '../../hooks/useUserToken'
import Button from '../../src/layout/components/Button'
import Input from '../../src/layout/components/Input'
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
     if(username && email && password){
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
     }else{
        setError("همه فیلد ها باید پر شود")
     }
    }
  return (
    <MainLayout height='h-[92%]'>
      <>
        <Link href={'/'}><Button className='py-2 md:p-4 px-2' title='بازگشت'/></Link>
        <div className='h-full flex flex-col gap-4 justify-center md:px-[100px]'>
            <Input value={username} onChange={(e)=>setUsername(e.target.value)} className='p-2 md:p-4 bg-[#313A56]' placeholder='یوزرنیم خود را وارد کنید' />
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} className='p-2 md:p-4  bg-[#313A56]' placeholder='ایمیل خود را وارد کنید' />
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='p-2 md:p-4  bg-[#313A56]' placeholder='پسورد خود را وارد کنید' />
            <Button className='py-2 md:py-4' onClick={registerHandler} title="ثبت نام"/>
            <p className='text-lg text-center'>{error}</p>
        </div>
      </>
    </MainLayout>
  )
}

export default Register