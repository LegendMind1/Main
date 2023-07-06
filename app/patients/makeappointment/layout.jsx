'use client'
import React from "react"
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';


export default function MakeAppointmentLayout( {children} ) {
  return (
    <>
      <PrimeReactProvider>

         {/* <div className='bg-gradient-to-t from-[#59ab7a] to-[#000000] h-screen'> */}
        <div className='bg-[url("/images/bg2.jpg")] bg-fixed bg-cover'>
        {/*--Container div Started -- */}
            {children}
            </div> {/*--Container div Ended -- */}

      </PrimeReactProvider>

    </>
  )
}
