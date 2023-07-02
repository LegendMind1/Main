'use client'
import Mainbar from './components/Mainbar'
import Cookies from 'js-cookie';

export default function Home() {
  

   return (
    <>
    <div className='h-screen'>
        <header>
            <div className='font-medium flex items-center text-lg m-0 max-md:rounded-b-[0px] rounded-b-[70px] bg-[#0b2c1f] bg-opacity-95 drop-shadow-lg max-md:h-[9vh]'>
              <Mainbar />
            </div>  
        </header>
    <div className='flex items-center justify-center'>
      <div className='rounded-full mt-10 p-8 w-1/2 max-md:w-[80%] flex items-center justify-center text-4xl max-md:text-3xl bg-green-800 text-white'>
        Welcome to SHIS
      </div>
    </div>
    <div className='flex items-center justify-center flex-wrap whitespace-normal h-1/2'>
      <div id='abc' name='abc' className='p-2 px-4 bg-red-800 text-red-100 rounded-full mt-4 flex justify-center items-center w-1/2 max-md:w-[85%] flex-wrap break-words content-center'>{Cookies.get('authtoken') ? 'We have recogized you ' + Cookies.get('username') + ' as ' + Cookies.get('usertype')  : 'You are logged out! Please Sign in first.'}</div>
    </div>
    </div>
    </>
  )
  
}