'use client'
import Cookies from 'js-cookie'
import useSWR from 'swr'

                            
export default function MyAppointments() {
  //<Button onClick={()=>alert('what')} icon='pi pi-user'>Click Me</Button>
  /*  
    onChange={(e) => {
    formik.setFieldValue('txtDesc', e.target.value);
  }}
  */

  const url =  `http://127.0.0.1:1337/api/appointments?[filters][patientid][$eq]=${Cookies.get('userid')}`
  
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
        
        <div className='text-2xl text-center'>Hello {Cookies.get('username')}!</div>
        <div className='text-right'>E-Reg ID: {Cookies.get('userid')}</div>
        <div className='text-center'>Your Appointments Trail is as below:</div> 
      </div>
    </div>

    <div className='w-full flex mb-6 cursor-default'>
        <div className='flex justify-center'>

              <table className='table-fixed w-[90%] border-2 border-red-400 text-justify mb-36'>
                <thead className='bg-black text-white text-xl'>
                  <tr className='items-center h-12'>
                    <th>Symptoms</th>
                    <th>Description</th>
                    <th>Doctor</th>
                    <th>Appointment Date</th>
                  </tr>
                </thead>
                <tbody>
                {data.data.map((d) => {
          return (
        
                  <tr className='items-center hover:bg-red-400 h-10'>
                    <td>{d.attributes.symptoms}</td>
                    <td>{d.attributes.desc}</td>
                    <td>{d.attributes.docname}</td>
                    <td>{d.attributes.aptdate}</td>
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
