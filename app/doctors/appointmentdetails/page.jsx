'use client'
import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr'
import { useEffect } from 'react';

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation';

import { UpdateAppointmentDetails } from '@/app/components/Middlewares';
import { useState } from 'react';


export default function AppointmentDetails() {
  const searchParams = useSearchParams();
  
  const aptid = searchParams.get('aptid');



//--------------Start Get and then Update Appointment Details APIs--------------------------------

const aptID = Number(aptid); // Used to pass to call Middlewares API Function

const [txtSymptoms,setTxtSymptoms] = useState(''); 
const [txtDesc,setTxtDesc] = useState(''); 
const [txtDiag,setTxtDiag] = useState(''); 
const [txtDocComments,setTxtDocComments] = useState(''); 
const [txtPresc,setTxtPresc] = useState(''); 

let errorFlag = false
let formik

  let vSymptoms 
  let vDesc 
  let vDiag 
  let vDocComments
  let vPresc 


  let vPatName
  let vAptDate
  let vAptStatus
  let vDocName
  
//=================== Start of Get Appointment Details API ================

  const url =  `http://127.0.0.1:1337/api/appointments?[filters][id][$eq]=${Number(aptid)}`
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const {data, error, isLoading} = useSWR(`${url}`,fetcher)
 
  if (!isLoading) {
        
              try{
                // let dummy = 'DocName: ' + data.data[1].attributes.doctor_name + ' DocID: ' + data.data[0].attributes.userid
                // console.log(dummy)

                console.log('Appointment ID Exists in Appointments ' + data.data[0].attributes.docname)

                vSymptoms = data.data[0].attributes.symptoms
                vDesc = data.data[0].attributes.desc
                vDiag = data.data[0].attributes.diagnosis
                vDocComments = data.data[0].attributes.commentsbydoc
                vPresc = data.data[0].attributes.presc

                vPatName = data.data[0].attributes.patname
                vAptDate = data.data[0].attributes.aptdate
                vAptStatus = data.data[0].attributes.aptstatus
                vDocName = data.data[0].attributes.docname
              }
                //console.log(doctors);
            
              //============== Manage Error ==================
              
              catch(err) {
                console.error(err.message);
                errorFlag=true
                console.log('Appointment ID Missing in Appointments')
                return (<div className='h-1/2 justify-center items-center flex'><div className='flex bg-red-800 text-yellow-400 rounded-full p-4'>Please make your profile for registering your E-ID first and try again</div></div>)
                // throw new Error ('Something went to the moon', { cause: err }) // Custom Error
                  //throw err;
              }
              finally {
                if (errorFlag) {<div className='h-1/2 justify-center items-center flex'><div className='flex bg-red-800 text-yellow-400 rounded-full p-4'>Either you have missing profile OR Something went to the moon</div></div>}
              }
              
        } // --- End of If (!isLoading) Block----------------
        

    //------------------End of Update Appointment Details API ---------------

  
    function handleSubmitting ()  {
      //console.log('wwww')
      event.preventDefault();
  let values = {
     txtDesc :  txtDesc,
    txtSymptoms : txtSymptoms, 
    txtDiag : txtDiag, 
    txtDocComments : txtDocComments, 
    txtPresc : txtPresc, 
  }
  //console.log(values)
        //====================== Update Details API=========================
        UpdateAppointmentDetails(aptID, values).then(response => {
          if(response.done){ 
            //router.push(`/`)
            const noerrorDiv = document.getElementById('noerrorDiv');
            noerrorDiv.style.visibility='visible'
            noerrorDiv.innerText = 'Details updated'
            window.location.href ='/doctors/manageappointments'      
          } 
          else {
            const errorDiv = document.getElementById('errorDiv');
            errorDiv.style.visibility='visible'
            errorDiv.innerText = `${response.dberror}`
            console.log(`Logger Message: ${response.dberror}`)
            setTimeout(()=>hideError('errorDiv'), 3000)  

          } 
        })  

} 
    useEffect (()=>{
        setTxtSymptoms(vSymptoms)
        setTxtDesc(vDesc)
        setTxtDiag(vDiag)
        setTxtDocComments(vDocComments)
        setTxtPresc(vPresc)

    },[vSymptoms])

  return (
    <>
  
          <section className='flex justify-center'>
            <div className='w-[90%] max-md:w-4/5 mb-10 bg-cyan-800 rounded-3xl text-white h-auto justify-center items-center flex pt-10 pr-10 pl-10 pb-2'>
                <div className='flex flex-col w-full'>
                <div className='flex bg-red-800 w-full justify-center text-lg rounded-full p-2'>
                  View Appointment Details and Diagnose / Prescribe
                </div>
                <div className='flex justify-end'>Your E-Reg. ID is: {Cookies.get('userid')}</div>
                <div id='dd'></div>
                <div className='w-full mt-6'>
                <div className='flex justify-between'>
                          <div className='m-2'>
                                <label className='p-1 px-2 text-black bg-yellow-500'>
                                  Patient Name
                                </label>
                                <div>
                                  {vPatName}
                                </div>
                            </div>

                            <div className='m-2'>
                                <label className='p-1 px-2 text-black bg-yellow-500'>
                                  Appointment Date
                                </label>
                                <div>
                                  {vAptDate}
                                </div>
                            </div>

                            <div className='m-2'>
                                <label className='p-1 px-2 text-black bg-yellow-500'>
                                  Doctor Name
                                </label>
                                <div>
                                  {vDocName}
                                </div>
                        </div>

                        <div className='m-2'>
                            <label className='p-1 px-2 text-black bg-yellow-500'>
                              Appointment Status
                            </label>
                            <div>
                              {vAptStatus}
                            </div>
                        </div>

                      </div>

                    <form id='frm' name='frm' className='text-red-700 w-full' onSubmit={handleSubmitting}>

                    
                        <div className='m-2'>
                        <label htmlFor='txtSymptoms' className='p-1 px-2 text-black bg-yellow-500'>Symptoms</label>
                        <input type='textarea' id='txtSymptoms' className='p-1 w-full' rows='5'
                        value={txtSymptoms}
                        onChange={(e)=>setTxtSymptoms(e.target.value)}
                        />
                        
                        </div>
                        <div className='m-2'>
                            <label htmlFor='txtDesc' className='p-1 px-2 text-black bg-yellow-500'>
                              Description
                            </label>
                            <input type='text' id='txtDesc' className='p-1 w-full' 
                            value={txtDesc}
                            onChange={(e)=>setTxtDesc(e.target.value)}
                            />
                        </div>
                    
                        <div className='m-2'>
                              <label htmlFor='txtDocComments' className='p-1 px-2 text-black bg-yellow-500'>
                                Comments and Remarks
                              </label>
                              <input type='text' id='txtDocComments' className='p-1 w-full' 
                              value={txtDocComments}
                              onChange={(e)=>setTxtDocComments(e.target.value)}
                              />
                        </div>
                      <div className='m-2'>
                        <label htmlFor='txtDiag' className='p-1 px-2 text-black bg-yellow-500'>
                          Diagnosis
                        </label>
                        <input type='text' id='txtDiag' className='p-1 w-full' 
                        value={txtDiag}
                        onChange={(e)=>setTxtDiag(e.target.value)}
                        />
                    </div>
                    <div className='m-2'>
                        <label htmlFor='txtPresc' className='p-1 px-2 text-black bg-yellow-500'>
                          Prescription
                        </label>
                        <input type='text' id='txtPresc' className='p-1 w-full' 
                        value={txtPresc}
                        onChange={(e)=>setTxtPresc(e.target.value)}
                        />
                    </div>
                    
                    <div className='mt-6'>
                        <button type='submit' className='bg-green-700 inline-block px-6 py-2.5 text-green-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full'>
                        Save Prescription and Mark Appointment as Attended</button>
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
