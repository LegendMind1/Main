'use client'

export default function MyAppointmentsLayout( {children} ) {
  return (
    <>

         {/* <div className='bg-gradient-to-t from-[#59ab7a] to-[#000000] h-screen'> */}
        <div className='bg-[url("/images/bg2.jpg")] bg-fixed bg-cover'>
        {/*--Container div Started -- */}
            {children}
            </div> {/*--Container div Ended -- */}

    </>
  )
}
