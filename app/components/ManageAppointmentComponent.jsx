'use client'
import Cookies from 'js-cookie'
import useSWR from 'swr'
import { AcceptAppointment, RejectAppointment } from './Middlewares'; 
import {useRouter} from 'next/navigation'

export default function MyAppointments() {
  //<Button onClick={()=>alert('what')} icon='pi pi-user'>Click Me</Button>
  /*  
    onChange={(e) => {
    formik.setFieldValue('txtDesc', e.target.value);
  }}
  */
  let router = useRouter();

  function AcceptApt(aptID){
    //alert (aptObj.attributes.patname + ' has ID: ' + aptID)
    AcceptAppointment(aptID).then(response => {
              
      if(response.done){ 

       
        
       console.log('Updated Appointment Successfully!')
       window.location.href ='/doctors/manageappointments'       
       //setUseEffectTrigger ([true])
        // Using useEffet based on variable change 
        // indicated here and in the return body below 
        // unhide hidden success message
      } 
      else {
        // We may show Error Message using useEffect as above here
        console.log('Could not Update Appointment!')

      } })

  }


  function RejectApt(aptID){
    //alert (aptObj.attributes.patname + ' has ID: ' + aptID)
    RejectAppointment(aptID).then(response => {
              
      if(response.done){ 

       
        
       console.log('Rejected Appointment Successfully!')
       window.location.href ='/doctors/manageappointments'
       
       //setUseEffectTrigger ([true])
        // Using useEffet based on variable change 
        // indicated here and in the return body below 
        // unhide hidden success message
      } 
      else {
        // We may show Error Message using useEffect as above here
        console.log('Could not Reject Appointment!')

      } })

  }


  const url =  `http://127.0.0.1:1337/api/appointments?[filters][doctorid][$eq]=${Cookies.get('userid')}`
  
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const {data, error, isLoading} = useSWR(`${url}`,fetcher)

  if (error) return <div>Failed to load... No Appointments Found</div>
  if (isLoading) return <div>Loading...!</div>
  
  //============== Manage Error ==================
  let errorFlag = false
  try{
    let dummy = data.data[0].attributes.aptdate
  }
  catch(err) {
    console.error(err.message);
    errorFlag=true
    throw new Error ('Something went to the moon') // Custom Error
    //throw err;
  }
  finally {
    if (errorFlag) {return <div>Something went to the moon</div>}
}

  return (
    <>

    <div className='flex items-center justify-center bg-red-800 rounded-full m-6 mb-4 text-white text-2xl p-3'>
      My Appointments
    </div>
    
    <div className='justify-center items-center content-center w-full flex'>
    <div className='bg-green-900 text-white items-center justify-center p-4 m-2 rounded-3xl w-1/2'>
        
        <div className='text-2xl text-center'>Hello Doctor {Cookies.get('username')}!</div>
        <div className='text-right'>E-Reg ID: {Cookies.get('userid')}</div>
        <div className='text-center'>Your Appointments</div> 
      </div>
    </div>

    <div className='w-full flex mb-6 cursor-default'>
        <div className='flex justify-center'>

              <table className='table-fixed w-[90%] mb-36 shadow-2xl shadow-slate-800'>
                <thead className='bg-red-900 text-white text-[14px]'>
                  <tr className='items-center h-12'>
                    <th className='w-[40px] px-2 text-sm text-left'>Sr.#</th>
                    <th className='px-2 text-sm text-left'>Patient Name</th>
                    <th className='px-2 text-sm text-left'>Symptoms</th>
                    <th className='px-2 text-sm text-left'>Description</th>
                    <th className='px-2 text-sm text-left'>Doctor</th>
                    <th className='px-2 text-sm text-left'>Appointment Date</th>
                    <th className='px-2 text-sm text-left w-[110px]'>Status</th>
                    <th className='px-2 text-center w-[110px] bg-yellow-600 text-[14px] text-gray-900'>
                      Accept/ Reject
                    </th>
                  </tr>
                </thead>
                <tbody>
                {data.data.map((d,index) => { 
                  let oddrow = index % 2;
                  let oddrowStyle = ''
                      oddrow == 0 ? oddrowStyle = 'bg-gray-200' : oddrowStyle = 'bg-green-400'
          return (
                   
                  <tr className={`items-center bg-opacity-50 ${oddrowStyle} hover:bg-red-400 h-10 hover:shadow-xl hover:shadow-red-800`}>
                    <td className='px-2 text-sm font-bold text-left border-r-2 border-red-600 w-[40px]'>{index+1}</td>
                    <td className='px-2 text-sm text-left border-r-2 border-red-600'>{d.attributes.patname}</td>
                    <td className='px-2 text-sm text-left border-r-2 border-red-600'>{d.attributes.symptoms}</td>
                    <td className='px-2 text-sm text-left border-r-2 border-red-600'>{d.attributes.desc}</td>
                    <td className='px-2 text-sm text-left border-r-2 border-red-600'>{d.attributes.docname}</td>
                    <td className='px-2 text-sm text-left border-r-2 border-red-600'>{d.attributes.aptdate}</td>
                    <td className='px-2 text-sm border-r-2 border-red-600 text-red-900 text-center w-[80px]'><span className='bg-yellow-500 rounded-full p-1 shadow-md shadow-slate-800 hover:mr-1'>{d.attributes.aptstatus}</span></td>
                    
                    <td className='px-2 text-sm text-red-900 text-center w-[80px]'>
                    
                    <span className='flex justify-around'>
                        <button onClick={()=>AcceptApt(d.id)}><img src='/images/check.png' width='28px' height='28px' className='rounded-full p-2 bg-green-600 shadow-md shadow-slate-800 hover:cursor-pointer' /></button>
                        <button onClick={()=>RejectApt(d.id)}><img src='/images/cross.png' width='28px' height='28px' className='rounded-full p-2 bg-red-500 shadow-md shadow-slate-800 hover:cursor-pointer' /></button>
                      </span>
                    </td>

                  </tr>
                  )
                })}
                </tbody>
              </table>

          
          </div>
    </div>

           
    </>
    
  )
}
