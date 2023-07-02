'use client'
import secureLocalStorage from 'react-secure-storage';

import {  useSearchParams  } from 'next/navigation';

import Mainbar from '../components/Mainbar'

export default function Services() {
    const searchParams = useSearchParams();
  
    const search = searchParams.get('jwtt');
   
  return (
    <>

        <header>
            <div className='font-medium text-lg m-0 rounded-b-[70px] bg-[#0b2c1f] bg-opacity-95 drop-shadow-lg max-md:h-[10vh]'>
              <Mainbar />
            </div>  
        </header>
    
    <div>Services</div>
    <div>Recieved Data: {search} </div>
    <div>
        {secureLocalStorage.getItem('jwtt')}
      
    </div>

    </>
  )
}