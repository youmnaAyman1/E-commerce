import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(); 

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
// decode token -- to get user data
// JWT 
const [userData,setUserData]=useState(null);

//   handling the conflict of refreshing or logout
  useEffect(function(){
const val=localStorage.getItem('tkn');
if(val!=null){
    setToken(val);
    setUserData(jwtDecode(val));
}

  },[])

  // get user data
  function getUserData(){
    const data=jwtDecode(localStorage.getItem('tkn'));
    setUserData(data);
    console.log("user data",data);
  }

  return (
    <AuthContext.Provider value={{ token, setToken,userData,setUserData,getUserData }}>  
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider; 
