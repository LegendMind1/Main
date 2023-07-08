'use client'
import Cookies from "js-cookie"
import PatientCard from "./PatientCard"
import Image from "next/image"
import { PostAppointment } from './Middlewares';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
import useSWR from 'swr'

export default function MakeAppointmentComponent() {
    const router = useRouter();

    //========== Used to Display Success Message Triggering after PostAppointment =========
    const [useEffectTrigger, setUseEffectTrigger] = useState([false]);
    
    useEffect (()=>{
      (useEffectTrigger[0] == true) ? document.getElementById('successDiv').style.visibility='visible' :  document.getElementById('successDiv').style.visibility='hidden'
    },[useEffectTrigger])
    //========================================================================




    //================= Custom Functions to prepare input ========================
      function handleCalendar () {
        let dt;
        dt = (String(formik.values.date) != 'undefined') ? String(formik.values.date) : ''
        return ((dt !='') ? dt.slice(0,15) : '')
      }

    function handleSymptoms (){
      
      let strSymptoms = ''
      try{
            formik.values.slctSymptoms.forEach(
              function (d) {
                strSymptoms = strSymptoms + d.name + ', ' 
              }
            )
            strSymptoms = strSymptoms.slice(0,-2)
          }
          catch {
            strSymptoms = ''
          }
      return strSymptoms

    }

      function handleDoctorList(){
        let docName = ''
        let docID = ''
          try{
            docName = formik.values.slctDoctor.name
            docID = formik.values.slctDoctor.doctorid
          }
          catch{ 
            docName = ''
            docID = ''          
          }
          return ({docName, docID})
        }
    //=====================================================================

    //================== Preparing Inputs =================================
    //------------- Multiselect Symptoms Const -----------

    const [selectedSymptoms, setSelectedSymptoms] = useState(null);
    const symptoms = [
      { name: 'Fever', code: 'Fever' },
      { name: 'Headache', code: 'Headache' },
      { name: 'Cold', code: 'Cold' },
      { name: 'Heart Pepation', code: 'Heart Peptation' },
      { name: 'Coughing', code: 'Coughing' },
      { name: 'Fatigue', code: 'Fatigue' },
      { name: 'Back Pain', code: 'Back Pain' },
      { name: 'Hallucination', code: 'Hallucination' },
      { name: 'Stomachache', code: 'Stomachache' },
      { name: 'Dizziness', code: 'Dizziness' },
      { name: 'Weakness in Muscles', code: 'Weakness in Muscles' },
      { name: 'Blurred vision', code: 'Blurred vision' },
      { name: 'Tooth Ache', code: 'Tooth Ache' },
      { name: 'Chest pain', code: 'Chest pain' },
      { name: 'Nausea', code: 'Nausea' },
      { name: 'Cramps', code: 'Cramps' },
      { name: 'Diarrhoea', code: 'Diarrhoea' },
      { name: 'Vomiting',  code: 'Vomiting' }
  ];


    //-----------------------------------------------


    //----------------- Doctor List Const ----------------

    const [selectedDoctor, setSelectedDoctor] = useState(null);


    //-------------------Get Doctors API---------------------------------------
          let doctors; // Variable to hold object array for MultiSelect Doctors field

          const url =  'http://127.0.0.1:1337/api/doctors?fields[0]=doctor_name&fields[1]=userid'
        
          const fetcher = (...args) => fetch(...args).then(res => res.json())
          const {data, error, isLoading} = useSWR(`${url}`,fetcher)
          
          let errorFlag = false

          if (!isLoading) {
                try{
                  // let dummy = 'DocName: ' + data.data[1].attributes.doctor_name + ' DocID: ' + data.data[0].attributes.userid
                  // console.log(dummy)

                  doctors = Array.from({length:data.data.length}, _ => ({}));
                  for (let i = 0; i < doctors.length; i += 1) {
                    doctors[i].name = data.data[i].attributes.doctor_name
                    doctors[i].doctorid = data.data[i].attributes.userid;
                  }
                  //console.log(doctors);

                }
              
                //============== Manage Error ==================
                
                catch(err) {
                  console.error(err.message);
                  errorFlag=true
                    throw new Error ('Something went to the moon', { cause: err }) // Custom Error
                    //throw err;
                }
                finally {
                  if (errorFlag) {<div id='successDiv' className='text-lg text-red-700'>Something went to the moon</div>}
                }
            }
    //--------------------------------------------------------------------

    /* 
    const doctors1 = [
        { name: 'Dr. Azam', doctorid: '12' },
        { name: 'Dr. Ahmer', doctorid: '33' },
        { name: 'Dr. Baqir', doctorid: '45' },
        { name: 'Dr. Niaz Bashir', doctorid: '11' },
        { name: 'Paris', doctorid: '10' }
    ];
    */
     //-----------------------------------------------


      const formik = useFormik({
          initialValues: {
            
            txtDesc: '',
            strSymptoms:'',       //---can't use  as it is an object
            strDoctorName: '',    //---can't use  as it is an object
            aptdate: '',
            ////////////////////////////////////////////////////////////////////
            aptStatus:'',
            patientid: '',
            doctorid: '',
            patname:'',
            
          },

          //----------Validation ------
          validationSchema: Yup.object({
            txtDesc: Yup.string()
              .required ('Please enter a short description of your illness / symptoms'),
          
          }),
      
          onSubmit: (values) => {
            //console.log('wwww')
            let docList = handleDoctorList()
            let strSymptoms = handleSymptoms ()
            let aptDate = handleCalendar()  
            let extraFields = {
                    txtDesc: values.txtDesc,
                    docName: docList.docName,
                    strSymptoms: strSymptoms,
                    aptDate: aptDate,
                    aptStatus:'REQUESTED',    // Appointment status: REQUESTED | SCHEDULED | EXPIRED
                    patientid: Cookies.get('userid'),
                    patname: Cookies.get('username'),
                    doctorid: docList.docID,
                }
                //console.log(extraFields)

            PostAppointment(extraFields).then(response => {
              
              if(response.done){ 
                
               console.log('Posted Appointment Successfully!')
               
               setUseEffectTrigger ([true])
                // Using useEffet based on variable change 
                // indicated here and in the return body below 
                // unhide hidden success message
              } 
              else {
                // We may show Error Message using useEffect as above here
                console.log('Could not Post Appointment!')
        
              } })
            
          }
      
        })
        
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
                                  onChange={formik.handleChange} //onChange={(e) => {formik.setFieldValue('slctSymptoms', e.value)}} 
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
                        onChange={formik.handleChange}  //onChange={(e) => {formik.setFieldValue('slctDoctor', e.value)}}
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
                        dateFormat="dd/mm/yy"
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
                      <div id='successDiv' name='successDiv' className='bg-green-800 text-red-100 px-4 mt-1 p-2 rounded-full invisible'>
                          Appointment Requested Successfully! Check Appointment Status in 'My Appointments' section for details.
                      </div>
                  </div>
                  </div>
              </div>
          </section>
          </>
        )
  }