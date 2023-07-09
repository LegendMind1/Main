'use client'
import ManageAppointmentComponent from '@/app/components/ManageAppointmentComponent'
import Cookies from 'js-cookie'
import useSWR from 'swr'

export default function ManagaeAppointments() {


//**********************CHECK PATIENT HAS PROFILE ************** */

//-------------------Get Doctor API---------------------------------------
let doctors; // Variable to hold object array for MultiSelect Doctors field

const url =  `http://127.0.0.1:1337/api/doctors?[filters][userid][$eq]=${Cookies.get('userid')}`

const fetcher = (...args) => fetch(...args).then(res => res.json())
const {data, error, isLoading} = useSWR(`${url}`,fetcher)

let errorFlag = false

if (!isLoading) {
      try{
        // let dummy = 'DocName: ' + data.data[1].attributes.doctor_name + ' DocID: ' + data.data[0].attributes.userid
        // console.log(dummy)

        console.log('Doctor ID Exists in Doctors ' + data.data[0].attributes.doctor_name)
        }
        //console.log(doctors);
    
      //============== Manage Error ==================
      
      catch(err) {
        console.error(err.message);
        errorFlag=true
        console.log('Doctor ID Missing in Patients ' + Cookies.get('userid'))
        return (<div className='h-1/2 justify-center items-center flex'><div className='flex bg-red-800 text-yellow-400 rounded-full p-4'>Please make your profile for registering your E-ID first and try again for managing your appointments</div></div>)
         // throw new Error ('Something went to the moon', { cause: err }) // Custom Error
          //throw err;
      }
      finally {
        if (errorFlag) {<div className='h-1/2 justify-center items-center flex'><div className='flex bg-red-800 text-yellow-400 rounded-full p-4'>Either you have missing profile OR Something went to the moon</div></div>}
      }
  }
//--------------------------------------------------------------------

 //*************************************************************** */


  return (
    <>
      <ManageAppointmentComponent />
    </>
  )
}
