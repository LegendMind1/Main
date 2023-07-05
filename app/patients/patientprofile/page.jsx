'use client'
import Cookies from 'js-cookie'
import Mainbar from '@/app/components/Mainbar'
import MakePatientProfile from '@/app/components/MakePatientProfile'
import { useRouter } from 'next/navigation';
import PatientBar from '@/app/components/PatientBar';

export default function PatientProfile () {
    const router = useRouter();

    if (Cookies.get('usertype') != undefined) {
    return (
    <>
    <div>
        <header>
            <div className='font-medium flex items-center text-lg m-0 max-md:rounded-b-[0px] rounded-b-[70px] bg-[#0b2c1f] bg-opacity-95 drop-shadow-lg max-md:h-[9vh]'>
              <Mainbar />
            </div>  
        </header>
        <PatientBar />
        <MakePatientProfile />
        </div>
    </>
    )}
    else {
        router.push('/')
    }

}