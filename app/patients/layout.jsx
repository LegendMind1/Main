'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import PatientBar from '@/app/components/PatientBar'
import Mainbar from '../components/Mainbar';

export default function PatientsLayout({ children }) {
    const router = useRouter();

  if (Cookies.get('usertype') != undefined) {
        
    return (
    <>
    <div className='h-screen'>
        <div>
          <Mainbar />
        </div>
        <div>
          <PatientBar />
        </div>
        {children}
    </div>
    
    </>
    )}
    else {
        router.push('/')
    }
}