'use client'
import Cookies from "js-cookie"
import PatientCard from "./PatientCard"
import Image from "next/image"
import { GetPatient, PostPatients } from './Middlewares';
import { useFormik } from "formik";
import * as Yup from "yup";


export default function MakeDoctorProfile() {
  
    const formik = useFormik({
        initialValues: {
          
          txtuserid: Cookies.get('userid'),
          txtage: '',
          txtname: Cookies.get('username'),
          txtemail: Cookies.get('email'),
        },
        //----------Validation ------
        validationSchema: Yup.object({
          txtage: Yup.string()
            .required ('Age is a required field'),
        
        }),
    
        onSubmit: (values) => {
          //console.log('wwww')
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
      
            } })
          
        }
    
      })
      function hideError(errorDivId){
        const errorDiv = document.getElementById(errorDivId);
        errorDiv.style.visibility='hidden'
        
    
      }

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
        
        <section className='flex justify-center'>
            <div className='w-1/2 max-md:w-4/5 mb-10 bg-cyan-800 rounded-3xl text-white h-auto justify-center items-center flex pt-10 pr-10 pl-10 pb-2'>
                <div className='flex flex-col w-full'>
                <div className='flex bg-red-800 w-full justify-center text-lg rounded-full p-2'>Patient Card</div>
                <div className='flex justify-end'>User ID is: {Cookies.get('userid')}</div>
                <div id='dd'></div>
                <div className='w-full mt-6'>
                    <form className='text-red-700 w-full' onSubmit={formik.handleSubmit}>
                    
                    <div className='flex'>
                        <div className='m-2 flex flex-col w-1/2'>
                        <label htmlFor='txtname' className='p-1 px-2 text-black bg-yellow-500 w-24'>User ID</label>
                        <input type='text' id='txtuserid' className='p-1 w-full' 
                        value={formik.values.txtuserid}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                        </div>
                        <div className='m-2 flex flex-col w-1/2'>
                        <label htmlFor='txtage' className='p-1 px-2 text-black bg-yellow-500 w-24'>Age*</label>
                        <input type='text' id='txtage' className='p-1 w-full' 
                        value={formik.values.txtage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                        </div>
                    </div>
                    <div className='m-2'>
                        <label htmlFor='txtname' className='p-1 px-2 text-black bg-yellow-500'>Name</label>
                        <input type='text' id='txtname' className='p-1 w-full' 
                        value={formik.values.txtname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className='m-2'>
                        <label htmlFor='txtemail' className='p-1 px-2 text-black bg-yellow-500'>Email</label>
                        <input type='text' id='txtemail' className='p-1 w-full' 
                        value={formik.values.txtemail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className='mt-6'>
                        <button type='submit' className='bg-green-700 inline-block px-6 py-2.5 text-green-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full'>
                        Make Profile</button>
                    </div>
                    
                    </form>
                    <div id='errorDiv' name='errorDiv' className='bg-red-800 text-red-100 p-2 px-4 mt-1 rounded-full invisible'></div>
                    <div id='noerrorDiv' name='noerrorDiv' className='bg-green-800 text-red-100 px-4 mt-1 p-2 rounded-full invisible'></div>
                </div>
                </div>
            </div>
        </section>
        </>
      )
}
