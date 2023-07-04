'use client'
import Cookies from 'js-cookie';
import { GetPatient, PostPatients } from '../components/Middlewares';
import { useFormik } from "formik";
import * as Yup from "yup";


export default function PatientCard() {
  /*
  let patientInfo
  (async function(){
    patientInfo = await GetPatient(Number(Cookies.get('userid')))
    console.log(patientInfo.attributes.patient_name)
    document.getElementById('txtname').value = patientInfo.attributes.patient_name
    document.getElementById('txtemail').value = patientInfo.attributes.patient_email
    document.getElementById('patient_age').value = patientInfo.attributes.patient_age
    document.getElementById('txtuserid').value = patientInfo.attributes.userid
    //alert ('i am called')
  })();
  */
  //let pinfo = GetPatient(Number(Cookies.get('userid')))
    //console.log(' ANDDDD ' + pinfo)
   
  

    

  return (
    <>
    Patient Card will be here
    </>
  )
}