'use client'
import Mainbar from './components/Mainbar'
import Cookies from 'js-cookie';

export default function Home() {
  

   return (
    <>

        <header>
            <div className='font-medium flex items-center text-lg m-0 max-md:rounded-b-[0px] rounded-b-[70px] bg-[#0b2c1f] bg-opacity-95 drop-shadow-lg max-md:h-[9vh]'>
              <Mainbar />
            </div>  
        </header>
    
    <div>Home</div>
    <div className='flex items-center justify-center flex-wrap whitespace-normal'>
      <div id='abc' name='abc' className='p-2 px-4 bg-red-800 text-red-100 rounded-full mt-4 flex justify-center items-center w-1/2 flex-wrap break-words content-center'>{Cookies.get('authtoken') ? 'We have recogized you ' + Cookies.get('username') + ' as ' + Cookies.get('usertype')  : 'You are logged out! Please Sign in first.'}</div>
    </div>
    
    </>
  )
  
}