'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

export default function PatientHome () {
  const router = useRouter();

    if (Cookies.get('usertype') != undefined) {
    return (
        <>
            <div>
              Home Page of Patient
            </div>
        </>
    )}
    else {
        router.push('/')
    }
}