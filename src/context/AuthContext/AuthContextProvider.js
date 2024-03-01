import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(); 

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);


//   handling the conflict of refreshing or logout
  useEffect(function(){
const val=localStorage.getItem('tkn');
if(val!=null){
    setToken(val);
}



  },[])

  return (
    <AuthContext.Provider value={{ token, setToken }}>  
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider; 
