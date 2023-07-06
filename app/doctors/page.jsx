'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

export default function DoctorHome () {
  const router = useRouter();

    if (Cookies.get('usertype') != undefined) {
    return (
        <>
            <div>
              Home Page of Doctor
            </div>
        </>
    )}
    else {
        router.push('/')
    }
}