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

              <table className='table-fixed w-[90%] mb-36 shadow-2xl shadow-slate-800'>
                <thead className='bg-red-900 text-white text-[14px]'>
                  <tr className='items-center h-12'>
                    <th className='w-[40px] px-2 text-sm text-left'>Sr.#</th>
                    <th className='px-2 text-sm text-left'>Symptoms</th>
                    <th className='px-2 text-sm text-left'>Description</th>
                    <th className='px-2 text-sm text-left'>Doctor</th>
                    <th className='px-2 text-sm text-left'>Appointment Date</th>
                    <th className='px-2 text-sm text-left w-[110px]'>Status</th>
                  </tr>
                </thead>
                <tbody>
                {data.data.map((d,index) => { 
                  let oddrow = index % 2;
                  let oddrowStyle = ''
                      oddrow == 0 ? oddrowStyle = 'bg-gray-200' : oddrowStyle = 'bg-green-400'
          return (
                   
                  <tr className={`items-center bg-opacity-50 ${oddrowStyle} hover:bg-red-400 h-10 hover:shadow-xl hover:shadow-red-800`}>
                    <td className='px-2 text-sm font-bold text-left border-r-2 border-red-600 w-[40px]'>{index+11}</td>
                    <td className='px-2 text-sm text-left border-r-2 border-red-600'>{d.attributes.symptoms}</td>
                    <td className='px-2 text-sm text-left border-r-2 border-red-600'>{d.attributes.desc}</td>
                    <td className='px-2 text-sm text-left border-r-2 border-red-600'>{d.attributes.docname}</td>
                    <td className='px-2 text-sm text-left border-r-2 border-red-600'>{d.attributes.aptdate}</td>
                    <td className='px-2 text-sm text-red-900 text-center w-[80px]'><span className='bg-yellow-500 rounded-full p-1 shadow-lg shadow-slate-800 hover:mr-1'>{d.attributes.aptstatus}</span></td>
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
