'use client'
import secureLocalStorage from 'react-secure-storage';
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';


async function loginUser (id, pass) {
  
  
  const getUser = {
  
    identifier: id,
    password: pass
    
  };
  try{
    let response = await fetch('http://192.168.18.165:1337/api/auth/local', {
      method: 'POST',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${tokenRegister}`
      },
      body: JSON.stringify(getUser),
      
    });

    if (!response.ok) {
        response = await fetch('http://127.0.0.1:1337/api/auth/local', {
        method: 'POST',
        headers: {
          //'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${tokenRegister}`
        },
        body: JSON.stringify(getUser),
        
      });
    }

    console.log (JSON.stringify(getUser))
    const userData = await response.json();
    if (response.ok) {
      console.log('User Logged In successfully!');
      
      console.log (userData);
      console.log('TOKEN IS ' + userData.jwt)
      
      return Promise.resolve({aa: true, bb: 'what', cc: 'hmmm', jwtt: userData.jwt})
    } else {
      console.log('Failed to post data.');
      console.log (userData);
      let arr = userData.error.details.errors
      for(let i = 0; i < arr.length; i++){
        console.log(arr[i]);
      }
      
      return Promise.resolve({aa: false})
    }
  } // Try Block End 
  catch (error) {
    console.log('Error:', error);
    return false
  }
}





function handleSubmit(){

}




const Register = () => {
  const router = useRouter()

  function handleMe(){
  

    router.push('/')
  }

  function handleLogIn () {
    let output = false
    let jwtt
    loginUser(formData.email, formData.password).then(data => {
      //alert('Result is' + JSON.stringify(data)) 
      
      secureLocalStorage.setItem('jwtt', data.jwtt);

      output = JSON.stringify(data.aa)
      jwtt = JSON.stringify(data.bb)
      console.log(output)
      //console.log(secureLocalStorage.getItem('jwtt'))
      //if(output){ router.push(`/?jwtt=${jwtt}`)}
      if(output){ 
        router.push(`/`)
      } 
      else {
        const errorDiv = document.getElementById('errorDiv');
        errorDiv.style.visibility='visible'
        errorDiv.innerText = 'Username or Password not correct!'
        setTimeout(hideError, 2000)  

      } 
     });
    
    //if(aa){ alert ('HI'); router.push('/')}
    //console.log()
  }
  function hideError(){
    const errorDiv = document.getElementById('errorDiv');
    errorDiv.style.visibility='hidden'

  }
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  //const [email, setEmail] = useState("")
  
  //const [password, setPassword] = useState("")

  return (

    <section className='h-full gradient-form md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1 text-red-800 border-b-2 border-red-100'>
                        Welcome to Hospital App
                      </h4>
                    </div>
                    <form>
                      <p className='mb-4'>
                        Please Sign Up if you do not have an account
                      </p>
                      <div className='mb-4'>
                        <input
                          type='email'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Your Email'
                          name='email'
                          id='email'
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className='mb-4'>
                        <input
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Password'
                          name='password'
                          id='password'
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                      </div>
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={handleSubmit}
                        >
                          Sign Up
                        </button>
                      </div>
                      <div className='flex items-center justify-between pb-6'>
                        <p className='mb-0 mr-2'>
                         <Link href='/'><span className='text-green-600'>{'\'<-'}</span><span className='pr-4 text-green-600 underline'>Home</span></Link>
                          Do you have an account?
                        </p>
                        <button
                          type='button'
                          className='inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight whitespace-nowrap uppercase rounded hover:bg-green-600 hover:bg-opacity-40 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                          onClick={handleLogIn}
                        >
                          Log In
                        </button>
                        
                      </div>
                    </form>
                    <div id='errorDiv' name='errorDiv' className='invisible bg-red-900 text-yellow-100 mb-2 rounded-full p-2 pl-4 max-sm:mb-10'>Error Message</div>
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