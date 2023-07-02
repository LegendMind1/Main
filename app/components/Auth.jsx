import Cookies from 'js-cookie';

export async function SetToken(cookieData){
    //console.log('My Cookies! ' + cookieData.email)
      Cookies.set('username', cookieData.username);
      Cookies.set('email', cookieData.email);
      Cookies.set('usertype', cookieData.usertype);
      Cookies.set('userid', cookieData.userid);
      Cookies.set('authtoken', cookieData.authtoken);
    
      if (Cookies.get('authtoken')){
        return true
    }
    else{
        return false
    }
}


export function UnSetToken(){
    //console.log('My Cookies! ' + cookieData.email)
      Cookies.remove('username');
      Cookies.remove('email');
      Cookies.remove('usertype');
      Cookies.remove('authtoken');
    
      if (Cookies.get('authtoken')){
        return false
    }
    else{
        return true
    }
}