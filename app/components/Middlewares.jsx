/* ================================================

-------------Model Fetcher--------
async function postData() {
  //This data will be sent to the server with the POST request.
  const todoObject = {
    userId: 111,
    title: "Some title",
    completed: false
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(todoObject),
    headers: { 'Content-Type': 'application/json' }
  }

  const url = 'https://jsonplaceholder.typicode.com/todos';

  try {
    const response = await fetch(url, options)
    const jsonResponse = await response.json();
    console.log('JSON response', jsonResponse);
  } catch(err) {
    console.log('ERROR', err);
  }
}

Call from somewhere ---->  postData();

*/
export async function LoginUser(userInfo) {
  const getUser = {
    
    identifier: userInfo.email,
    password: userInfo.password
    
  };
  try{
    let response = await fetch('http://127.0.0.1:1337/api/auth/local', {
      method: 'POST',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${tokenRegister}`
      },
      body: JSON.stringify(getUser),
      
    });
/*
    if (!response.ok) {
      response = await fetch('http://192.168.18.165:1337/api/auth/local', {
      method: 'POST',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${tokenRegister}`
      },
      body: JSON.stringify(getUser),
      
    });
  }
  */
    //console.log (JSON.stringify(getUser))
    const userData = await response.json();
    if (response.ok) {
      //console.log('User Logged In successfully!');
      //console.log (userData);
      //console.log('TOKEN IS ' + userData.jwt)

      return Promise.resolve({
        done: true, 
        username: userData.user.username, 
        email: userData.user.email, 
        usertype: userData.user.usertype, 
        userid: userData.user.id, 
        authtoken: userData.jwt
      })

    } else {
      console.log('Failed to post data.');
      console.log (userData);
      /*
      let arr = userData.error.details.errors
      for(let i = 0; i < arr.length; i++){
        console.log(arr[i]);
      }
      */
      return Promise.resolve({done: false, dberror: userData.error.message})

    }
  } // Try Block End 
  catch (error) {
    console.log('Error:', error);
    return Promise.resolve({done: false, dberror: error})
  }
}






export async function RegisterUser(userInfo) {
    
    const postData = {

        email: userInfo.email,
        username: userInfo.username,
        password: userInfo.password,
        usertype: userInfo.usertype

      };
      //const postNow = JSON.stringify({data: postData})
      try{
          let response = await fetch('http://192.168.18.165:1337/api/auth/local/register', {
            method: 'POST',
            headers: {
              //'Accept': 'application/json',
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${tokenRegister}`
            },
            body: JSON.stringify(postData),
            
          });

          if (!response.ok) {
            response = await fetch('http://127.0.0.1:1337/api/auth/local/register', {
            method: 'POST',
            headers: {
              //'Accept': 'application/json',
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${tokenRegister}`
            },
            body: JSON.stringify(postData),
            
          });
        }
        

          //console.log (JSON.stringify(postData))
          const postedData = await response.json();
          if (response.ok) {
            console.log('Data posted successfully!');
            console.log (postedData);
            console.log('TOKEN IS ' + postedData.jwt)
            /*
            let arr = postedData.error.details.errors
            for(let i = 0; i < arr.length; i++){
              console.log(arr[i]);
            }
            */
            return Promise.resolve({done: true, username: postedData.user.username, usertype: postedData.user.usertype, userid: postedData.user.id, authtoekn: postedData.jwt})

          } else {
            console.log('Failed to post data.');
            console.log (postedData);
            
            console.log('Inferno message: ' + postedData.error.message)
            return Promise.resolve({done: false, dberror: postedData.error.message})
          }
        } // Try Block End 
        catch (error) {
          console.log('Error:', error);
          return Promise.resolve({done: false, dberror: error})
        }      
}

/*
export async function GetPatient(pid){

  try{
      const response = await fetch (`http://192.168.18.165:1337/api/patients?[filters][userid][$eq]=${pid}`, { 
        next: { revalidate: 0 },
        method: 'GET'  // Sending a GET request
      });
      
        const patientData = await response.json();
      
        if (response.ok) {
        console.log (patientData.data[0]);
          return Promise.resolve({
            done: true, 
            patientData: patientData.data[0], 
          })

      } 
      else {
          console.log('Failed to get patient data.');
          console.log (patientData);
          
         // let arr = userData.error.details.errors
         // for(let i = 0; i < arr.length; i++){
         //   console.log(arr[i]);
         // }
          
          return Promise.resolve({done: false, dberror: patientData.error.message})
      }
  }// End of Try Block
  catch (error) {
    console.log('Error:', error);
    return Promise.resolve({done: false, dberror: error})
  }
}
*/


//======= Fetching With Manual Options, Needs an IIFE Function To Trigger====
export async function GetPatient(pid){

  const url = `http://192.168.18.165:1337/api/patients?[filters][userid][$eq]=${pid}`;
  
  const options = {
    next: { revalidate: 0 },
    method: 'GET'  // Sending a GET request
  }

  try {
    const response = await fetch(url, options)
    const patientData = await response.json();
    //console.log('JSON response', patientData.data[0]);
    return patientData.data[0]; 
  } catch(err) {
    console.error(err.message);
    //throw new Error ('Something went to the moon') // Custom Error
    throw err;
  }
}
//==================================================




export async function PostPatients(values){
  const postData = {
    patient_name: values.txtname,
    patient_email: values.txtemail,
    patient_age: values.txtage,
    userid: values.txtuserid
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
        return Promise.resolve({done: true, username: postedData.data.attributes.patient_name})
      } else {
        console.log('Failed to post data.');
        console.log (postedData);
        return Promise.resolve({done: false})

      }
    } // Try Block End 
    catch (error) {
      console.log('Error:', error);
    }

}