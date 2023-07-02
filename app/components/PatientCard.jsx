'use client'
import Cookies from 'js-cookie';
import { GetPatient } from '../components/Middlewares';

/*
export default function PatientCard() {
  //let patientInfo = GetPatient(Number(Cookies.get('userid')))
 
  pinfo = GetPatient(Number(Cookies.get('userid'))).then(response => {
    //pinfo = response.patientData.data.map(({attributes}) => attributes)
    //pinfo = response.patientData
    console.log(response.done + ' ANDDDD ' + response.patientData.id)
   return response.patientData
  }).then() 
  
  
  return (
    <>
    <div>Patient Card</div>
    <div>User ID is: {Cookies.get('userid')}</div>
    <div>
      <button onClick={handlePop}>Click Me</button>
    </div>
    <div id='mazaq'></div>
    </>
  )
}
*/
 let patientInfo
export default function PatientCard() {
  (async function(){
    patientInfo = await GetPatient(Number(Cookies.get('userid')))
    console.log(patientInfo.attributes.patient_name)
    document.getElementById('txtname').value = patientInfo.attributes.patient_name
    document.getElementById('txtemail').value = patientInfo.attributes.patient_email
    document.getElementById('txtage').value = patientInfo.attributes.patient_age + ' Years'
    document.getElementById('txtuserid').value = patientInfo.attributes.userid
    //alert ('i am called')
  })();
  



  let pinfo = GetPatient(Number(Cookies.get('userid')))
    //console.log(' ANDDDD ' + pinfo)
   
  
  return (
    <>
    <section className='flex justify-center'>
    <div className='w-1/2 max-md:w-4/5 bg-cyan-800 rounded-3xl text-white h-auto justify-center items-center flex p-10'>
        <div className='flex flex-col w-full'>
          <div className='flex'>Patient Card</div>
          <div>User ID is: {Cookies.get('userid')}</div>
          <div id='dd'></div>
          <div className='w-full'>
            <form className='text-red-700 w-full'>
              
              <div className='flex'>
                <div className='m-2 flex flex-col w-1/2'>
                  <label for='txtname' className='p-1 px-2 text-black bg-yellow-500 w-24'>User ID</label>
                  <input type='text' id='txtuserid' className='p-1 w-full' />
                </div>
                <div className='m-2 flex flex-col w-1/2'>
                  <label for='txtname' className='p-1 px-2 text-black bg-yellow-500 w-24'>Age</label>
                  <input type='text' id='txtage' className='p-1 w-full' />
                </div>
              </div>
              <div className='m-2'>
                <label for='txtname' className='p-1 px-2 text-black bg-yellow-500'>Name</label>
                <input type='text' id='txtname' className='p-1 w-full' />
              </div>
              <div className='m-2'>
                <label for='txtname' className='p-1 px-2 text-black bg-yellow-500'>Email</label>
                <input type='text' id='txtemail' className='p-1 w-full' />
              </div>
              
              
            </form>
          </div>
        </div>
    </div>
    </section>
    </>
  )
}