// import {  SignUp } from '@clerk/nextjs'
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center bg-gradient-to-t from-slate-300 to-slate-500'>
        <SignUp />     
    </main>
  )
}

export default SignUpPage