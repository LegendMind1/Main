'use client'
import Cookies from 'js-cookie'
import Mainbar from '../../components/Mainbar'
import PatientProfile from '../../components/MakePatientProfile'
import DoctorProfile from '../../components/MakeDoctorProfile'

export default function DoctorProfile () {
    return (
    <>
    <div>
        <header>
            <div className='font-medium flex items-center text-lg m-0 max-md:rounded-b-[0px] rounded-b-[70px] bg-[#0b2c1f] bg-opacity-95 drop-shadow-lg max-md:h-[9vh]'>
              <Mainbar />
            </div>  
        </header>

        <MakeDoctorProfile />
</div>
    </>
    )
}