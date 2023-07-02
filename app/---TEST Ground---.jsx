//const token = 'df7dbe60d6237c67ebd5251576528cae90127164ce5f20e8335d4d72b29ffb897626c6005e339994b0ede6ca4c4d9c350ed78c65b80ea0876d4f4022ef88c2a4d09d0d0a3b9cbcd6818877778a073ec486a5a7bed1bd95a56c31947dfb9de672be41ea43bd63754af3336b6032c87e23e9a1ee23f12d83ad3b0f3ea20bc02230'
//const tokenRegister = '7d7bbe3071a86092c2bbea29d55d7cf6fa3af7321c3b7a099112dc3797804ecfe25fb50a88e3d1b0fd3ac7aee1dc2262047470716734eb864abc383276fe13d11f5db0c16c74f5fbe3a531ab0ae69ce0be20e62ede3eb86adba6a8ec6f953d7e1a91108ad93f3a2d701136b5b4360d12470ad9017654ecdf3bb22b2781e561e1'
export const metadata = {
  title: 'Login Please',
  description: 'Login Please',
}


async function getPatients(){
    const res = await fetch (`http://127.0.0.1:1337/api/patients`, { 
      next: { revalidate: 0 },
      method: 'GET'  // Sending a GET request
    });
    const pat = await res.json();
    //return pat.data.map(({attributes}) => attributes);
    //console.log (pat.data)
  
    return pat
    
}


async function postPatients(){
  const postData = {
    patient_name: 'Bazinga',
    patient_email: 'bazinga@bazinga.com',
    patient_age: '76'
  };
  //const postNow = JSON.stringify({data: postData})
  try{
      const response = await fetch('http://127.0.0.1:1337/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({data: postData}),
        //body: postNow,
      });
      const postedData = await response.json();
      if (response.ok) {
        console.log('Data posted successfully!');
        console.log (postedData);
      } else {
        console.log('Failed to post data.');
        console.log (postedData);
      }
    } // Try Block End 
    catch (error) {
      console.log('Error:', error);
      return <div>Sorry, Can't Fetch Data from Strapi Server</div>
    }

}

async function registerUser(){
  const postData = {
    
    email: 'bazinga@bazinga.com',
    username: 'Bazinga',
    password: 'AMP786110'
    
  };
  //const postNow = JSON.stringify({data: postData})
  try{
      const response = await fetch('http://127.0.0.1:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          //'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${tokenRegister}`
        },
        body: JSON.stringify(postData),
        
      });
      console.log (JSON.stringify(postData))
      const postedData = await response.json();
      if (response.ok) {
        console.log('Data posted successfully!');
        console.log (postedData);
        console.log('TOKEN IS ' + postedData.jwt)
      } else {
        console.log('Failed to post data.');
        console.log (postedData);
        let arr = postedData.error.details.errors
        for(let i = 0; i < arr.length; i++){
          console.log(arr[i]);
        }
      }
    } // Try Block End 
    catch (error) {
      console.log('Error:', error);
    }
  }

  async function loginUser () {
    const getUser = {
    
      identifier: 'cc@cc.com',
      password: 'amp786110'
      
    };
    try{
      const response = await fetch('http://127.0.0.1:1337/api/auth/local', {
        method: 'POST',
        headers: {
          //'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${tokenRegister}`
        },
        body: JSON.stringify(getUser),
        
      });
      console.log (JSON.stringify(getUser))
      const userData = await response.json();
      if (response.ok) {
        console.log('User Logged In successfully!');
        console.log (userData);
        console.log('TOKEN IS ' + userData.jwt)
      } else {
        console.log('Failed to post data.');
        console.log (userData);
        let arr = userData.error.details.errors
        for(let i = 0; i < arr.length; i++){
          console.log(arr[i]);
        }
      }
    } // Try Block End 
    catch (error) {
      console.log('Error:', error);
      return <div>Sorry, Can't Fetch Data from Strapi Server</div>
    }
  }

export default async function LoginLayout({ children }) {
    const pats =  await getPatients();
    //console.log (pats)
    //postPatients()

    //registerUser()
    loginUser()
    return (
    <>
    
    <div>Hello
        {
          
      /* 
        pats.map((patients) => (
        <div>
        <div>ID: {patients.id}</div>
        <div>Name: {patients.patient_name}</div>
        <div>Age: {patients.patient_age}</div>
        <div>Email: {patients.patient_email}</div>
        </div>
        
        ))
         */
          pats.data.map((patients) => (
          <div>
          <div>ID: {patients.id}</div>
          <div>Name: {patients.attributes.patient_name}</div>
          <div>Age: {patients.attributes.patient_age}</div>
          <div>Email: {patients.attributes.patient_email}</div>
          </div>
        
        ))
        // For Single Record
        /*
          <div>
          <div>ID: {pats.data.id}</div>
          <div>Name: {pats.data.attributes.patient_name}</div>
          <div>Age: {pats.data.attributes.patient_age}</div>
          <div>Email: {pats.data.attributes.patient_email}</div>
          </div>
        */
        
          }

        
    </div>
      {children}
    </>
  )
}









/*------------ Use of searchParams and secureLocalStorage ---------*/

      secureLocalStorage.setItem('jwtt', data.jwtt);

      console.log(secureLocalStorage.getItem('jwtt'))
      if(output){ router.push(`/?jwtt=${jwtt}`)}

// Home Page gets redirected from above route

'use client'
import secureLocalStorage from 'react-secure-storage';

import {  useSearchParams  } from 'next/navigation';

import Mainbar from './components/Mainbar'

export default function Services() {
    const searchParams = useSearchParams();
  
    const search = searchParams.get('jwtt');
   
  return (
    <>

        <header>
            <div className='font-medium text-lg m-0 rounded-b-[70px] bg-[#0b2c1f] bg-opacity-95 drop-shadow-lg max-md:h-[10vh]'>
              <Mainbar />
            </div>  
        </header>
    
    <div>Services</div>
    <div>Recieved Data: {search} </div>
    <div>
        {secureLocalStorage.getItem('jwtt')}
      
    </div>

    </>
  )
}