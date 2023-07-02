'use client'
import secureLocalStorage from 'react-secure-storage';
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import { useFormik } from "formik";
import * as Yup from "yup";
import {RegisterUser} from '../components/Middlewares';

const Register = () => {
  const router = useRouter()
  /*-------------------- Formik and Yup --------------------*/
  /*
  const [loading, setLoading] = useState(false);
  const validateSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().notRequired(),
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    confirmPassword: Yup.string().when("password", (password, field) => {
      if (password) {
        return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
      }
    }),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    /*
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
        alert('wow')
      console.log(values);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        resetForm();
      }, 1000 * 2);
    },
    
  });
*/


  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      usertype:''
    },

    //----------Validation ------
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, 'Username must be 20 characters or less.')
        .required('Username is required'),
       email: Yup.string()
        .email('Invalid email address')
        .required ('Email is required'),
      usertype: Yup.string()
        .required ('Please select option for Health Professional or Patient'),
      password: Yup.string()
        .required("Password is required"),
        //.min(6, "Pasword must be 6 or more characters")
        //.matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
        //.matches(/\d/, "Password should contain at least one number")
        //.matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
      confirmPassword: Yup.string().when("password", (password, field) => {
        if (password) {
          return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
        }
      })
    }),
    //----------Submit Form -----
    onSubmit: (values) => {
      RegisterUser(values).then(response => {

        //jwtt = JSON.stringify(data.bb)
        //console.log(output)
        //console.log(secureLocalStorage.getItem('jwtt'))
        //if(output){ router.push(`/?jwtt=${jwtt}`)}
        
        if(response.done){ 
          //router.push(`/`)
          const noerrorDiv = document.getElementById('noerrorDiv');
          noerrorDiv.style.visibility='visible'
          noerrorDiv.innerText = `Congrats! ${response.username} registered successfully as ${response.usertype}`
          setTimeout(()=>hideError('noerrorDiv'), 5000) 
          router.push(`/`)  
        } 
        else {
          const errorDiv = document.getElementById('errorDiv');
          errorDiv.style.visibility='visible'
          errorDiv.innerText = `${response.dberror}`
          console.log(`Lugger Message: ${response.dberror}`)
          setTimeout(()=>hideError('errorDiv'), 5000)  
  
        } 


      })
      
    }

  })
  function hideError(errorDivId){
    const errorDiv = document.getElementById(errorDivId);
    errorDiv.style.visibility='hidden'
    

  }
  /*--------------------------------------------------------*/

  return (

    <section className='h-full gradient-form md:h-screen'>
      <div className='container h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg w-[500px] max-md:w-fit'>
              <div className=''>
                <div className='px-2 py-2 md:px-0'>
                  <div className='md:p-2 md:mx-6 border-4 rounded-lg h-full'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-4 pb-1 text-red-800 border-b-2 border-red-100'>
                        Welcome to Hospital App
                      </h4>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                      <p className='mb-1'>
                        Please Sign Up if you don't have an account
                      </p>
                      <div className='mb-3'>
                        <label className={`block font-bold text-sm p-2 rounded-full ${formik.errors.username ? 'bg-red-800' : ''} text-red-100`}>
                          {formik.touched.username && formik.errors.username ? formik.errors.username : ''}
                        </label>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Username'
                          name='username'
                          id='username'
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className='mb-3'>
                      <label className='block font-bold text-sm pb-2 text-red-800'>
                          {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                        </label>
                        <input
                          type='email'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Email'
                          name='email'
                          id='email'
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className='mb-3'>
                      <label className='block font-bold text-sm pb-2 text-red-800 flex-wrap'>
                          {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                        </label>
                        <input
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Password'
                          name='password'
                          id='password'
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>

                      <div className='mb-3'>
                      <label className='block font-bold text-sm pb-2 text-red-800'>
                          {formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''}
                        </label>
                        <input
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Confirm Password'
                          name='confirmPassword'
                          id='consfirmPassword'
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>

                      <div className='mb-3'>
                      <label className='block font-bold text-sm pb-2 text-red-800'>
                          {formik.touched.usertype && formik.errors.usertype ? formik.errors.usertype : ''}
                        </label>
                          <div>
                            <input
                              type='radio'
                              className=''
                              name='usertype'
                              value='doctor'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />Sign up as Health Professional
                          </div>
                          <div>
                            <input
                              type='radio'
                              className=''
                              name='usertype'
                              value='patient'
                              onChange={formik.handleChange}
                            />Sign up as Patient
                          </div>
                      </div>

                      <div className='text-center pt-1 mb-3 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='submit'
                          disabled={/*loading*/ false} 
                        >
                          {
                          //loading ? "Loading..." : "Sign Up"
                          'Sign Up'}
                        </button>
                      </div>
                      <div className='flex items-center justify-between'>
                        <p className='mb-0 mr-2'>
                         
                          Already have an account?
                        </p>
                        <Link href='/login'>
                        <div
                          className='inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight whitespace-nowrap uppercase rounded hover:bg-green-600 hover:bg-opacity-40 focus:outline-none focus:ring-0 transition duration-300 ease-in-out'
                        >
                          Log In
                        </div>
                        </Link>
                      </div>
                      <div id='errorDiv' name='errorDiv' className='bg-red-800 text-red-100 p-2 px-4 rounded-full invisible'></div>
                      <div id='noerrorDiv' name='norrorDiv' className='bg-green-800 text-red-100 p-2 px-4 rounded-full invisible'></div>
                      
                      <div> 
                        <Link href='/'>
                          <span className='text-green-600'>{'\'<-'}</span>
                          <span className='pr-4 text-green-600 underline'>
                            Home
                          </span>
                        </Link>
                      </div>        

                    </form>
              
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Register