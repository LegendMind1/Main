'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie';
import { UnSetToken } from '../components/Auth';
import { useRouter } from 'next/navigation';


const Mainbar = () => {
  const router = useRouter()

  function handleLogOut(){
    UnSetToken();
    router.push('/');
  }

  return (
    <nav className='flex justify-between items-center w-[92%] mx-auto'>
       
        <div>

          <Link href="/">
                
            <Image
              alt="Logo"
              className="hidden md:block cursor-pointer m-5"
              height={80}
              width={80}
              src="/images/logo.png"
            />
             
            </Link>
            
        </div>

        <div className='flex items-center max-sm:mt-5'>
          <ul className='flex items-center gap-[4vw] max-md:text-[14px]'>
            <li>
                <Link className='text-[#e49c0b] hover:text-[#ffffff]' href='/'>Home</Link>
            </li>
            <li>
                <Link className='text-[#e49c0b] hover:text-[#ffffff]' href='/services'>Services</Link>
            </li>
            <li>
                <Link className='text-[#e49c0b] hover:text-[#ffffff]' href='/about'>About</Link>
            </li>
            <li>
                <Link className='text-[#e49c0b] hover:text-[#ffffff]' href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
        <div className='max-sm:mt-5'>
          {Cookies.get('authtoken')? 
          <div className='flex flex-row items-center max-md:text-[12px]'>
            
            <div>
              <Link href='/profile'>
            <Image
              alt="Logo"
              className="cursor-pointer m-4 rounded-full"
              height={36}
              width={36}
              src="/images/placeholder.jpg"
            />
            </Link>
            </div>

            <button onClick={handleLogOut} className='bg-[#e49c0b] text-[#000000] max-md:px-1 max-md:w-[70px] max-md:py-1 max-md:text-[12px] px-4 py-2 max-md:rounded-[20px] rounded-full hover:bg-[#ffffff] hover:text-[#000000]'>
            Log Out
            </button>

          </div>
           : 
          <button className='bg-[#e49c0b] text-[#000000] px-5 py-2 rounded-full hover:bg-[#ffffff] hover:text-[#000000]'>
          <Link href='/login'>Sign in</Link>
        </button>
          }
          
        </div>
      
    </nav>
  )
}

export default Mainbar