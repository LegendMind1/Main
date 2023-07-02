'use client'
import Cookies from 'js-cookie';
import { GetPatient, PostPatients } from '../components/Middlewares';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";


export default function PatientCard() {
  /*
  let patientInfo
  (async function(){
    patientInfo = await GetPatient(Number(Cookies.get('userid')))
    console.log(patientInfo.attributes.patient_name)
    document.getElementById('txtname').value = patientInfo.attributes.patient_name
    document.getElementById('txtemail').value = patientInfo.attributes.patient_email
    document.getElementById('patient_age').value = patientInfo.attributes.patient_age
    document.getElementById('txtuserid').value = patientInfo.attributes.userid
    //alert ('i am called')
  })();
  */
  //let pinfo = GetPatient(Number(Cookies.get('userid')))
    //console.log(' ANDDDD ' + pinfo)
   
  

    const formik = useFormik({
      initialValues: {
        
        txtuserid: Cookies.get('userid'),
        txtage: '',
        txtname: Cookies.get('username'),
        txtemail: Cookies.get('email'),
      },
      //----------Validation ------
      validationSchema: Yup.object({
        patient_age: Yup.string()
          .required ('Age is a required field'),
      
      }),
  
      onSubmit: (values) => {
        alert('wwww')
        PostPatients(values).then(response => {
          
          if(response.done){ 
            //router.push(`/`)
            const noerrorDiv = document.getElementById('noerrorDiv');
            noerrorDiv.style.visibility='visible'
            noerrorDiv.innerText = `Congrats! ${response.username} Profile Created Successfully`
            setTimeout(()=>hideError('noerrorDiv'), 5000) 
            router.push(`/`)  
          } 
          else {
            const errorDiv = document.getElementById('errorDiv');
            errorDiv.style.visibility='visible'
            errorDiv.innerText = `${response.dberror}`
            console.log(`Lugger Message: ${response.dberror}`)
            setTimeout(()=>hideError('errorDiv'), 5000)  
    
          } 
  
  
        })
        
      }
  
    })
    function hideError(errorDivId){
      const errorDiv = document.getElementById(errorDivId);
      errorDiv.style.visibility='hidden'
      
  
    }

  return (
    <>
    <section className='flex justify-center'>
    <div className='w-1/2 max-md:w-4/5 mb-20 bg-cyan-800 rounded-3xl text-white h-auto justify-center items-center flex p-10'>
        <div className='flex flex-col w-full'>
          <div className='flex'>Patient Card</div>
          <div>User ID is: {Cookies.get('userid')}</div>
          <div id='dd'></div>
          <div className='w-full'>
            <form className='text-red-700 w-full' onSubmit={formik.handleSubmit}>
              
              <div className='flex'>
                <div className='m-2 flex flex-col w-1/2'>
                  <label for='txtname' className='p-1 px-2 text-black bg-yellow-500 w-24'>User ID</label>
                  <input type='text' id='txtuserid' className='p-1 w-full' 
                  value={formik.values.txtuserid}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  />
                </div>
                <div className='m-2 flex flex-col w-1/2'>
                  <label for='txtage' className='p-1 px-2 text-black bg-yellow-500 w-24'>Age</label>
                  <input type='text' id='txtage' className='p-1 w-full' 
                  value={formik.values.txtage}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              <div className='m-2'>
                <label for='txtname' className='p-1 px-2 text-black bg-yellow-500'>Name</label>
                <input type='text' id='txtname' className='p-1 w-full' 
                value={formik.values.txtname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
              </div>
              <div className='m-2'>
                <label for='txtemail' className='p-1 px-2 text-black bg-yellow-500'>Email</label>
                <input type='text' id='txtemail' className='p-1 w-full' 
                value={formik.values.txtemail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
              </div>
              <div>
                <button type='submit'>Make Profile</button>
              </div>
              
            </form>
            <div id='errorDiv' name='errorDiv' className='bg-red-800 text-red-100 p-2 px-4 mt-2 rounded-full invisible'></div>
            <div id='noerrorDiv' name='noerrorDiv' className='bg-green-800 text-red-100 px-4 mt-2 p-2 rounded-full invisible'></div>
          </div>
        </div>
    </div>
    </section>
    </>
  )
}