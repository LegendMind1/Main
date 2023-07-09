'use client'
import Cookies from 'js-cookie'
import MakeAppointmentComponent from '@/app/components/MakeAppointmentComponent';
import useSWR from 'swr'
                            


export default function MakeAppointment() {
  //<Button onClick={()=>alert('what')} icon='pi pi-user'>Click Me</Button>
  /*  
    onChange={(e) => {
    formik.setFieldValue('txtDesc', e.target.value);
  }}
  */

  //**********************CHECK PATIENT HAS PROFILE ************** */

//-------------------Get Patient API---------------------------------------
let doctors; // Variable to hold object array for MultiSelect Doctors field

const url =  `http://127.0.0.1:1337/api/patients?[filters][userid][$eq]=${Cookies.get('userid')}`

const fetcher = (...args) => fetch(...args).then(res => res.json())
const {data, error, isLoading} = useSWR(`${url}`,fetcher)

let errorFlag = false

if (!isLoading) {
      try{
        // let dummy = 'DocName: ' + data.data[1].attributes.doctor_name + ' DocID: ' + data.data[0].attributes.userid
        // console.log(dummy)

        console.log('Patient ID Exists in Patients ' + data.data[0].attributes.patient_name)
        }
        //console.log(doctors);
    
      //============== Manage Error ==================
      
      catch(err) {
        console.error(err.message);
        errorFlag=true
        console.log('Patient ID Missing in Patients ' + Cookies.get('userid'))
        return (<div className='h-1/2 justify-center items-center flex'><div className='flex bg-red-800 text-yellow-400 rounded-full p-4'>Please make your profile for registering your E-ID first and try again for seeking appointment</div></div>)
        
         // throw new Error ('Something went to the moon', { cause: err }) // Custom Error
          //throw err;
      }
      finally {
        if (errorFlag) {<div id='successDiv' className='text-lg text-red-700'>Something went to the moon</div>}
      }
  }
//--------------------------------------------------------------------

 //*************************************************************** */
  return (
    <>
      <div>
      Appointment Page for Patients
      </div>

      <MakeAppointmentComponent />
      
    </>
  )
}
