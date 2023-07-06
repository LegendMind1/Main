'use client'
import Cookies from 'js-cookie'
import Mainbar from '@/app/components/Mainbar'
import MakePatientProfile from '@/app/components/MakePatientProfile'
import PatientBar from '@/app/components/PatientBar';
import MakeAppointmentComponent from '@/app/components/MakeAppointmentComponent';

                            


export default function MakeAppointment() {
  //<Button onClick={()=>alert('what')} icon='pi pi-user'>Click Me</Button>
  /*  
    onChange={(e) => {
    formik.setFieldValue('txtDesc', e.target.value);
  }}
  */

  return (
    <>
      <div>
      Appointment Page for Patients
      </div>

      <MakeAppointmentComponent />
      
    </>
  )
}
