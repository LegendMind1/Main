'use client'
import { useEffect } from 'react';
import Mainbar from './components/Mainbar'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Home() {

  function callme(){
    window.location.href='/'
  }

  const router = useRouter();
  if (Cookies.get('authtoken') != undefined) {
      Cookies.get('usertype') == 'patient' ? router.push ('/patients') : router.push ('/doctors')
  }
   return (
    <>
    <div className='h-screen'>
        <div>
          <Mainbar />
        </div>
    <div className='flex items-center justify-center'>
      <div className='rounded-full mt-10 p-8 w-1/2 max-md:w-[80%] flex items-center justify-center text-4xl max-md:text-3xl bg-green-800 text-white'>
        Welcome to SHIS
      </div>
      

    </div>
    <div className='flex items-center justify-center flex-wrap whitespace-normal h-1/2'>
      <div id='abc' name='abc' className='p-2 px-4 bg-red-800 text-red-100 rounded-full mt-4 flex justify-center items-center w-1/2 max-md:w-[85%] flex-wrap break-words content-center'>
        {
          useEffect(() => {
            document.getElementById('abc').innerText = Cookies.get('authtoken') ? 'We have recogized you ' + Cookies.get('username') + ' as ' + Cookies.get('usertype')  : 'You are logged out! Please Sign in first.'
          },[Cookies.get('authtoken')])
        }
      </div>
    </div>
    </div>
    </>
  )
  
}