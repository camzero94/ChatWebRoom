import React, { useState } from 'react'
import Image from 'next/image'
import Particle from '../components/Particles/Particles'
import { useRouter } from 'next/router'
import { imageLoader } from '../utils/util'

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmitSignUp = async (e: any) => {
    e.preventDefault()

    if (email !== '' && password !== '' && password === confirmPassword) {
      console.log(process.env.API_URL)
      const signUpReq = new Request(`${process.env.API_URL}/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      })

      try {
        const res = await fetch(signUpReq)
        if (!res.ok) throw new Error('Error Fetching Data')
        const data = await res.json()
        if (data.message === 'User created successfully.') {
          console.log(data)
          router.push('/login')
        } else {
          console.log('Error Serializing the recieved data')
        }
      } catch (err) {
        console.log(`Error:${err}`)
      }
    }
  }

  return (
    <div className='flex items-center justify-center min-w-full min-h-screen'>
      <div className='max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-16 '>
        <Particle />
        <form className='flex flex-col'>
          <div className='flex flex-row text-3xl font-bold text-center'>
            <span className='text-blue'>Come Join Us!</span>
            <Image
              className='ml-4'
              loader={imageLoader}
              src={'watermelon.png'}
              alt='pinneapple'
              width={45}
              height={35}
            />
          </div>
          <input
            placeholder='Enter Email'
            className='p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Enter Password'
            className='p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            className='p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className='p-3 mt-6 rounded-md bg-blue-700 font-bold text-white'
            type='submit'
            onClick={handleSubmitSignUp}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
