'use client'
import Cookies from "js-cookie"
import PatientCard from "./PatientCard"
import Image from "next/image"
import { GetPatient, PostPatients } from './Middlewares';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

//theme
import "primereact/resources/themes/vela-green/theme.css";     
    
//core
import "primereact/resources/primereact.min.css"; 
import 'primeicons/primeicons.css';

import { Button } from 'primereact/button'; 
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';

export default function MakeAppointmentComponent() {
    const router = useRouter();

    //========= Multiselect Symptoms Const======

    const [selectedSymptoms, setSelectedSymptoms] = useState(null);
    const symptoms = [
        { name: 'Fever', code: 'Fever' },
        { name: 'Headache', code: 'Headache' },
        { name: 'Cold', code: 'Cold' },
        { name: 'Heart Pepation', code: 'Heart Peptation' },
        { name: 'Fever', code: 'Fever' },
        { name: 'Headache', code: 'Headache' },
        { name: 'Cold', code: 'Cold' },
        { name: 'Heart Pepation', code: 'Heart Peptation' },
        { name: 'Fever', code: 'Fever' },
        { name: 'Headache', code: 'Headache' },
        { name: 'Cold', code: 'Cold' },
        { name: 'Heart Pepation', code: 'Heart Peptation' },
        { name: 'Fever', code: 'Fever' },
        { name: 'Headache', code: 'Headache' },
        { name: 'Cold', code: 'Cold' },
        { name: 'Heart Pepation', code: 'Heart Peptation' },
        { name: 'Diarrhoea', code: 'Diarrhoea' }
    ];


    //=================================


    //=========== Doctor List Const===========

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const doctors = [
        { name: 'Dr. Azam', doctorid: '12' },
        { name: 'Dr. Ahmer', doctorid: '33' },
        { name: 'Dr. Baqir', doctorid: '45' },
        { name: 'Dr. Niaz Bashir', doctorid: '11' },
        { name: 'Paris', doctorid: '10' }
    ];

    //========================================


      const formik = useFormik({
          initialValues: {
            
            txtDesc: '',
            slctSymptoms:'',
            
            //txtname: Cookies.get('username'),
            //txtemail: Cookies.get('email'),
          },
          //----------Validation ------
          validationSchema: Yup.object({
            txtDesc: Yup.string()
              .required ('Please enter a short description of your illness / symptoms'),
          
          }),
      
          onSubmit: (values) => {

            //console.log('wwww')
            PostPatients(values).then(response => {
              
              if(response.done){ 
                //router.push(`/`)
                const noerrorDiv = document.getElementById('noerrorDiv');
                noerrorDiv.innerText = `Congrats! ${response.username} Profile Created Successfully`
                noerrorDiv.style.visibility='visible'
                setTimeout(()=>hideError('noerrorDiv'), 2000) 
                
                
              } 
              else {
                const errorDiv = document.getElementById('errorDiv');
                errorDiv.innerText = `${response.dberror}`
                errorDiv.style.visibility='visible'
                console.log(`Lugger Message: ${response.dberror}`)
                setTimeout(()=>hideError('errorDiv'), 3000)  
        
              } })
            
          }
      
        })
        function hideError(errorDivId){
          const errorDiv = document.getElementById(errorDivId);
          errorDiv.style.visibility='hidden'
          if (errorDiv.id=='noerrorDiv') router.push('/')
        }
  
      return (
          <>
          <div className="flex items-center justify-center text-[22px] mt-3 flex-col">
              <div className="bg-[#B5C99A] rounded-full text-red-800 p-4 mb-4">
                  <u>{Cookies.get('username')}! </u> Request an Appointment 
              </div>
          </div>
          
          <section className='flex justify-center'>
              <div className='w-10/12 max-md:w-4/5 mb-10 bg-cyan-800 rounded-3xl text-white h-auto justify-center items-center flex pt-10 pr-10 pl-10 pb-2'>
                  <div className='flex flex-col w-full'>
                  <div className='flex bg-red-800 w-full justify-center text-lg rounded-full p-2'>You are one click away from best health care!</div>
                  <div className='flex justify-end'>Your E-Reg. ID is: {Cookies.get('userid')}</div>
                  <div id='dd'></div>
                  <div className='w-full mt-6'>
                      <form className='text-red-700 w-full' onSubmit={formik.handleSubmit}>
                      
                {/*==================== ROW 1========================== */}
                       {/*------------ Description ----------- */}

                        <div className='flex flex-row justify-between max-md:w-full max-md:flex-col'> 

                            <div className='m-2 flex w-full'>
                                <div className="flex flex-col w-full">
                                    
                                    <span className='block font-bold text-sm pb-2 text-yellow-400'>
                                      {formik.touched.txtDesc && formik.errors.txtDesc ? formik.errors.txtDesc : ''}
                                    </span>
                                    
                                    <span className="block">
                                    <InputText
                                        id="txtDesc"
                                        name="txtDesc"
                                        placeholder="Description"
                                        value={formik.values.txtDesc}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full"
                                    />   
                                   </span>
                                                      
                                </div>
                            </div>
                          
                          {/* ------------------------------------*/}


                          {/*------------ Symptoms -------------- */}
                          <div className='m-2 flex w-full'>
                            <div className="card flex justify-content-center w-full max-md:w-full">
                                <MultiSelect 
                                  id="slctSymptoms" 
                                  name="slctSymptoms" 
                                  value={formik.values.slctSymptoms} 
                                  onChange={(e) => {formik.setFieldValue('slctSymptoms', e.value)}} 
                                  options={symptoms} 
                                  optionLabel="name" 
                                  display="chip" 
                                  placeholder="Select Symptoms" 
                                  maxSelectedLabels={3} 
                                  className="w-full max-md:full md:w-20rem" 
                                />
                            </div>
                          </div>  

                      </div>
                        {/* ------------------------------------*/}
                
                {/*=========================================================*/}




                {/*==================== ROW 2========================== */}
                  
                  {/*------------ Select Doctor ----------- */}

                  <div className='flex flex-row justify-between max-md:w-full max-md:flex-col'> 

                <div className='m-2 flex w-full'>
                    <div className="flex flex-col w-full">
                        
                    <span className="p-float-label">
                      <Dropdown
                        inputId="slctDoctor"
                        name="slctDoctor"
                        value={formik.values.slctDoctor}
                        options={doctors}
                        optionLabel="name"
                        placeholder="Select a Doctor"
                        onChange={(e) => {formik.setFieldValue('slctDoctor', e.value)}}
                        className='w-full'
                      />
                      <label htmlFor="slctDoctor">Select a Doctor</label>
                    </span>
                                          
                    </div>
                </div>

                {/* ------------------------------------*/}


                {/*------------ Appointment Date -------------- */}
                <div className='m-2 flex w-full'>
                <div className="card flex justify-stretch w-full max-md:w-full">
                    
                <label htmlFor="cal_date" className="flex mr-2 text-yellow-500 w-1/2">Appointment Date</label>
                    <Calendar
                        inputId="cal_date"
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        className="w-full"
                        touchUI 
                        showButtonBar 
                    />
                </div>
                </div>  

                </div>
                {/* ------------------------------------*/}

                {/*=========================================================*/}






                     
                      <div className="flex justify-around w-full">
                          <div className='mt-2 p-4 w-full'>
                              <Button type="submit" icon="pi pi-check" className="w-full">Request Appointment</Button>
                          </div>

                          <div className='mt-2 p-4 w-full'>
                              <Button onClick={(e) => {e.preventDefault(); formik.resetForm();}} icon="pi pi-times" className="w-full">Cancel</Button>
                          </div>
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