import Link from "next/link"    

export default function PatientBar (){
    return (
        <div className='flex items-center justify-center bg-[#862B0D] border-indigo-700 max-md:text-[8px]'>
            <div className='flex p-2'>
              <div className='ml-7 max-md:ml-1 bg-[#FFC95F] text-red-950 rounded-full p-1 hover:bg-[#B5C99A] max-md:text-[12px]'><Link className=' px-3' href='/patients/patientprofile'>Make Profile</Link></div>
              <div className='ml-7 max-md:ml-1 bg-[#FFC95F] text-red-950 rounded-full p-1 hover:bg-[#B5C99A] max-md:text-[12px]'><Link className=' px-3' href='/'> Update Profile</Link></div>
              <div className='ml-7 max-md:ml-1 bg-[#FFC95F] text-red-950 rounded-full p-1 hover:bg-[#B5C99A] max-md:text-[12px]'><Link className=' px-3' href='/'>Make Appointment</Link></div>
              <div className='ml-7 max-md:ml-1 bg-[#FFC95F] text-red-950 rounded-full p-1 hover:bg-[#B5C99A] max-md:text-[12px]'><Link className=' px-3' href='/'>Show History</Link></div>
            </div>
        </div>
    )
}