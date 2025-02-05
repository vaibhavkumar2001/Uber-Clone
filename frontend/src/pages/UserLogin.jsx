import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const UserLogin = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [ userData,setUserData ] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        setUserData({
            email:email,
            password:password,
        })

        console.log(userData)
        console.log(email,password)

        setEmail('')
        setPassword('')
    }

  return (
    <div className='p-7 flex flex-col justify-center'>
        <div>
        <img className='w-14 mb-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
        <form onSubmit={submitHandler}>
            <h3 className='text-lg font-medium mb-2'>What's your email?</h3>

            <input 
            required 
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            className='rounded px-4 py-2 mb-7 border w-full text-lg placeholder:text-base bg-[#EEEEEE] '
            type='email' 
            placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

            <input
            required 
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
            className='rounded px-4 py-2 mb-7 border w-full text-lg placeholder:text-base bg-[#EEEEEE]'
            type='password' 
            placeholder='Password'
            />

            <button 
            className='rounded px-4 py-2 mb-7  w-full bg-[#111] text-white font-semibold'
            >Login</button>

        </form>
            <p className='text-center mb-[170px]'>New here? <Link  to='/signup' className='text-blue-600'>Create New Account</Link></p>
        </div>
        <div>
            <Link 
            to='/captain-login'
            className='text-[#606060] font-semibold mb-7 rounded px-4 py-1 w-full text-lg bg-[#FAFA33] flex items-center justify-center'
            >Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin