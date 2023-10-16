import React, { useState, useEffect } from 'react'
import { asyncFetchLogin,imageLoader } from '../utils/util'
import Particle from '@/components/Particles/Particles'
import Image from 'next/image'
import {useRouter} from 'next/router'
import { useContext } from 'react'
import {IContext,Auth_Ctx } from '../store/context'

export default function Login() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setUser} = useContext(Auth_Ctx) as IContext

  const submitHandler = async (e: any) => {
    e.preventDefault()
    const mssg = await asyncFetchLogin(email, password)
     
    if (mssg && mssg.message === 'User succesfully Logged'){
      setUser({userId: mssg.userId, username: mssg.username})
      router.push('/liveChat')
    }
  }


  useEffect(() => {

    }, [])
  return (
    <div className='flex items-center justify-center min-w-full min-h-screen'>
      <div className='max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-16 '>
        <Particle />
        <form className='flex flex-col'>
          <div className='flex flex-row text-3xl font-bold text-center'>
            <span className='text-blue'>Lets Chat !</span>
              <Image className='ml-4' 
              loader={imageLoader}
              src={'pineapple.png'} 
              alt='pinneapple' width={35} height={35}/>
          </div>
          <input
            placeholder='Email'
            className='p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='Password'
            placeholder='Password'
            className='p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='p-3 mt-6 rounded-md bg-blue-700 font-bold text-white'
            type='submit'
            onClick={submitHandler}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
