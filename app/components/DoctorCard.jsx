import Cookies from 'js-cookie';
import {GetDoctor} from '../components/Middlewares';
import useSWR from 'swr'
import { useState } from 'react';


export default function DoctorCard() {
  //let docInfo = GetDoctor(Cookies.get('userid'))
  const url =  `http://localhost:1337/api/doctors?[filters][userid][$eq]=${Cookies.get('userid')}`
  let args = {
    next: { revalidate: 0 },
    method: 'GET'  // Sending a GET request
  }
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const {data, error, isLoading} = useSWR(`${url}`,fetcher)

  if (error) return <div>Failed to load... No Doctor ID Found</div>
  if (isLoading) return <div>Loading...</div>
  let errdet = false
  try{
    let cc = data.data[0].attributes.doctor_name
  }
  catch(err) {
    console.error(err.message);
    errdet=true
    throw new Error ('Something went to the moon') // Custom Error
    //throw err;
  }
  finally {
    if (errdet) {return <div>Something went to the moon</div>}
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
