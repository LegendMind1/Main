import Cookies from 'js-cookie';
import useSWR from 'swr'
import { useState } from 'react';


export default function DoctorCard() {

  const url =  `http://localhost:1337/api/doctors?[filters][userid][$eq]=${Cookies.get('userid')}`
  
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const {data, error, isLoading} = useSWR(`${url}`,fetcher)

  if (error) return <div>Failed to load... No Doctor ID Found</div>
  if (isLoading) return <div>Loading...!</div>
  
  //============== Manage Error ==================
  let errorFlag = false
  try{
    let dummy = data.data[0].attributes.doctor_name
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

    <div>Doctor Card</div>
    <div>User ID is: {Cookies.get('userid')}</div>
    <div>Hello Doctor {data.data[0].attributes.doctor_name}</div>
    <form>
      <input type='text' id='txtdoc' /> 
    </form>
    </>
    
  )
}


