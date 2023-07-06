'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import DoctorBar from '../components/DoctorBar';
import Mainbar from '../components/Mainbar';

export default function DoctorsLayout({ children }) {
    const router = useRouter();

  if (Cookies.get('usertype') != undefined) {
        
    return (
    <>
    <div className='h-screen'>
        <div>
          <Mainbar />
        </div>
        <div>
          <DoctorBar />
        </div>
        {children}
    </div>
    
    </>
    )}
    else {
        router.push('/')
    }
}