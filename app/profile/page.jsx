'use client'
import Cookies from 'js-cookie'
import Mainbar from '../components/Mainbar'
import PatientProfile from '../components/PatientProfile'
import DoctorProfile from '../components/DoctorProfile'

export default function Profile () {
    return (
    <>
        <header>
            <div className='font-medium flex items-center text-lg m-0 max-md:rounded-b-[0px] rounded-b-[70px] bg-[#0b2c1f] bg-opacity-95 drop-shadow-lg max-md:h-[9vh]'>
              <Mainbar />
            </div>  
        </header>

        {
            Cookies.get('usertype') === 'patient' ? <PatientProfile /> : <DoctorProfile />
        }

    </>
    )
}