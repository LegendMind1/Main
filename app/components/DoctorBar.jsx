import Link from "next/link"    

export default function DoctorBar (){
    return (
       
        <div className='flex items-center justify-center bg-[#B22727] border-indigo-700'>
            <div className='flex p-2'>
                <div className='ml-7 bg-yellow-400 text-red-950 rounded-full p-1 hover:bg-yellow-50 max-md:text-[12px]'><Link href='/doctors/doctorprofile'>Make Profile</Link></div>
                <div className='ml-7 bg-yellow-400 text-red-950 rounded-full p-1 hover:bg-yellow-50 max-md:text-[12px]'><Link href='/'>Update Profile</Link></div>
                <div className='ml-7 bg-yellow-400 text-red-950 rounded-full p-1 hover:bg-yellow-50 max-md:text-[12px]'><Link href='/doctors/manageappointments'>Manage Appointments</Link></div>
                <div className='ml-7 bg-yellow-400 text-red-950 rounded-full p-1 hover:bg-yellow-50 max-md:text-[12px]'><Link href='/'>Appointment History</Link></div>
            </div>
        </div>
    
    )
}