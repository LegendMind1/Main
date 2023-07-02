import Cookies from "js-cookie"
import PatientCard from "./PatientCard"
import Image from "next/image"

export default function PatientProfile() {
  
    return (
        <>
        <div className="flex items-center justify-center text-2xl mt-3 flex-col">
            <div className="bg-red-800 rounded-full text-blue-100 p-4">
                Patient {Cookies.get('username')} Profile
            </div>
            <div>
                <Image
                  alt="Profile Image"
                  className="cursor-pointer m-5 rounded-full"
                  height={120}
                  width={120}
                  src="/images/placeholder.jpg"
                />
            </div>
        </div>
        <PatientCard />
        </>
      )
}
