'use client'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie';
import { UnSetToken } from '../components/Auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

let flag = 1
const Mainbar = () => {
  const router = useRouter()

  function handleLogOut(){
    (Cookies.get('usertype') == 'patient') ? flag = 2 : flag =3  // Ensures that our useEffect Hook triggers where Mainbar color is handled
    UnSetToken();
    router.push('/');
    router.refresh(); // So that our Mainbar Component re-mount and change its color contextually
  }

  return (
    <>
    <div id='mainbarbg' className='font-medium flex items-center text-lg m-0 max-md:rounded-b-[0px] rounded-b-[70px] bg-[#0b2c1f] bg-opacity-95 drop-shadow-lg max-md:h-[9vh]'>
      <div className='flex justify-between items-center w-[92%] mx-auto'>
        
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
          <div className='max-sm:mt-5' id='divBtnMainBarLogInLogOut'>

          { 
            useEffect(() => {    

              if ((Cookies.get('authtoken'))!=undefined){
                  //document.getElementById('divLogOut').style.visibility='visible'
                  //document.getElementById('divSignIn').style.visibility='hidden'
                  document.getElementById('divLogOut').style.display='flex'
                  document.getElementById('divSignIn').style.display='none'
              
              }
              else  {

                //document.getElementById('divLogOut').style.visibility='hidden'
                //document.getElementById('divSignIn').style.visibility='visible' 
                document.getElementById('divLogOut').style.display='none'
                document.getElementById('divSignIn').style.display='flex' 
              }
              if (Cookies.get('usertype') == 'patient'){
                document.getElementById('mainbarbg').style.backgroundColor = '#820000'//'#862B0D'

              }
              else  if (Cookies.get('usertype') == 'doctor') {
                  document.getElementById('mainbarbg').style.backgroundColor = '#151D3B'
              }
              else {
                document.getElementById('mainbarbg').style.backgroundColor = '#183A1D'
            }
              },[flag])
          }
                
                <div className='flex flex-row items-center max-md:text-[12px] hidden' id='divLogOut'>
                <div>
                    <Link href='/'>
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
                
                <div className='hidden' id='divSignIn'>
                <button className='bg-[#e49c0b] text-[#000000] px-5 py-2 rounded-full hover:bg-[#ffffff] hover:text-[#000000]'>
                  <Link href='/login'>Sign in</Link>
                </button>
                </div>
          </div>
        
      </div>
    </div>  

    </>
  )
}

export default Mainbar