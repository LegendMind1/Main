'use client'
import Cookies from "js-cookie"
import Image from "next/image"
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function ManageAppointmentComponent() {
    const router = useRouter();

    
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
                      
                {/*==================== ROW 1========================== */}
                       {/*------------ Description ----------- */}

                        <div className='flex flex-row justify-between max-md:w-full max-md:flex-col'> 

                            <div className='m-2 flex w-full'>
                                <div className="flex flex-col w-full">
                                    
                                    <span className="block">
                                        <p className="text-[14px] text-[#3ec26c]"> <span className="border-2 border-indigo-700">Description: lknldkasndlnsadlnsl</span>  <span className="border-2 border-black"> asldnlasbndlas landlansd lnlknda </span></p>
                                   </span>
                                                      
                                </div>
                            </div>
                          
                          {/* ------------------------------------*/}


                          {/*------------ Symptoms -------------- */}
                          <div className='m-2 flex w-full'>
                            <div className="card flex justify-content-center w-full max-md:w-full">
                            <span className="block">
                                        patient Symptoms:
                                   </span>
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
                        
                    <span className="block">
                       Doctor Requested for apponitment:
                    </span>
                                          
                    </div>
                </div>

                {/* ------------------------------------*/}


                {/*------------ Appointment Date -------------- */}
                <div className='m-2 flex w-full'>
                <div className="card flex justify-stretch w-full max-md:w-full">
                    
                <label htmlFor="cal_date" className="flex mr-2 text-yellow-500 w-1/2">Appointment Date</label>
                <span className="block">
                        Appointment Date requested:
                </span>
                </div>
                </div>  

                </div>
                {/* ------------------------------------*/}

                {/*=========================================================*/}






                     
                      <div className="flex justify-around w-full">
                          <div className='mt-2 p-4 w-full'>
                              <button icon="pi pi-check" className="w-full">Accept Appointment</button>
                          </div>

                          <div className='mt-2 p-4 w-full'>
                              <button icon="pi pi-times" className="w-full">I am Unavailable</button>
                          </div>
                      </div>
                      
                      <div id='errorDiv' name='errorDiv' className='bg-red-800 text-red-100 p-2 px-4 mt-1 rounded-full invisible'></div>
                      <div id='noerrorDiv' name='noerrorDiv' className='bg-green-800 text-red-100 px-4 mt-1 p-2 rounded-full invisible'></div>
                  </div>
                  </div>
              </div>
          </section>
          </>
        )
  }