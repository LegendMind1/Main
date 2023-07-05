'use client'
import React from 'react'
import Mainbar from '../../components/Mainbar'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import PatientBar from '@/app/components/PatientBar'

export default function PatientHome () {
  const router = useRouter();

  if (Cookies.get('usertype') != undefined) {
    return (
    <>
    <div className='h-screen'>
        <header>
            <div id='mainbarbg' className={`font-medium flex items-center text-lg m-0 max-md:rounded-b-[0px] rounded-b-[70px] bg-opacity-95 drop-shadow-lg max-md:h-[9vh]`}>
              
              <Mainbar />
              
                {
                  useEffect(() => {
                    if (Cookies.get('usertype') == 'patient'){
                    document.getElementById('mainbarbg').style.backgroundColor = '#862B0D'
                    }

                  })
                }
              
            </div>  
        </header>
        <div>
          <PatientBar />
        </div>
    </div>
    </>
    )}
    else {
        router.push('/')
    }
}