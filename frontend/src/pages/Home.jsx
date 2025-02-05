import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
        <div className='bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center h-screen w-full pt-8 bg-red-400 flex justify-between flex-col'>
            <img className='w-14 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
            <div className='bg-white py-4 px-4'>
                <h2 className='text-2xl font-bold'>Get Started With User</h2>
                <Link to='/login' className='flex justify-center w-full bg-black text-white rounded py-3 mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home