'use client'
import React from 'react'
import Mainbar from '../components/Mainbar'
import Cookies from 'js-cookie'
import Link from 'next/link'
const DoctorHome = () => {
    
  return (
    <>
    <div className='h-screen'>
        <header>
            <div className={`font-medium flex items-center text-lg m-0 max-md:rounded-b-[0px] rounded-b-[70px] ${Cookies.get('usertype')? 'bg-red-800' :  'bg-[#0b2c1f]' } bg-opacity-95 drop-shadow-lg max-md:h-[9vh]`}>
              <Mainbar />
            </div>  
        </header>
        <div className='flex items-center justify-center bg-red-800 border-indigo-700'>
            <div className='flex p-2'>
              <div className='ml-7 bg-yellow-400 text-red-950 rounded-full p-1 hover:bg-yellow-50 max-md:text-[12px]'><Link href='/'>Pending Appointments</Link></div>
              <div className='ml-7 bg-yellow-400 text-red-950 rounded-full p-1 hover:bg-yellow-50 max-md:text-[12px]'><Link href='/'>Current Appointments</Link></div>
              <div className='ml-7 bg-yellow-400 text-red-950 rounded-full p-1 hover:bg-yellow-50 max-md:text-[12px]'><Link href='/'>Appointment History</Link></div>
              <div className='ml-7 bg-yellow-400 text-red-950 rounded-full p-1 hover:bg-yellow-50 max-md:text-[12px]'><Link href='/'>cool</Link></div>
            </div>
        </div>
    
    </div>
    </>
  )
  
}

export default DoctorHome
