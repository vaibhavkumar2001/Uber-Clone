import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [ firstname,setFirstName ] = useState('')
    const [ lastname,setLastName ] = useState('')
    const [ userData, setUserData ] = useState({})

    const SubmitHandler = (e) => {
        e.preventDefault();
        setUserData({
            fullname:{
                firstname:firstname,
                lastname:lastname
            },
            email:email,
            password:password 
        })
        console.log(userData)
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
    }

  return (
    <div className='p-7 flex flex-col justify-center'>
        <div>
        <img className='w-14 mb-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
        <form onSubmit={SubmitHandler}>
            <h3 className='text-base font-medium mb-2'>What's your name?</h3>
            <div className='flex gap-x-2.5 mb-5'>
                <input 
                required 
                className='rounded px-4 py-2  border w-1/2 text-lg placeholder:text-base bg-[#EEEEEE] '
                type='text' 
                placeholder='First Name'
                value={firstname}
                onChange={(e) => {
                    setFirstName(e.target.value)
                }}
                />

                <input 
                required 
                className='rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base bg-[#EEEEEE] '
                type='text' 
                placeholder='Last Name'
                value={lastname}
                onChange={(e) => {
                    setLastName(e.target.value)
                }}
                />
            </div>

            <h3 className='text-base font-medium mb-2'>What's your email?</h3>
            <input 
            required 
            className='rounded px-4 py-2 mb-7 border w-full text-lg placeholder:text-base bg-[#EEEEEE] '
            type='email' 
            placeholder='email@example.com'
            value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />

            <h3 className='text-base font-medium mb-2'>Enter Password</h3>

            <input
            required 
            className='rounded px-4 py-2 mb-7 border w-full text-lg placeholder:text-base bg-[#EEEEEE]'
            type='password' 
            placeholder='Password'
            value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />

            <button 
            className='rounded px-4 py-2 mb-7  w-full bg-[#111] text-white font-semibold'
            >Login</button>

        </form>
            <p className='text-center mb-[120px]'>Already have a account? <Link  to='/login' className='text-blue-600'>  Login here</Link></p>
        </div>
        <div>
            <p className='text-center text-xs leading-5'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
        </div>
    </div>
  )
}

export default UserSignup