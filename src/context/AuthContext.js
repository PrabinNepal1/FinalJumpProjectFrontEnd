import React, {useContext, useState, useEffect} from "react";

import axios from 'axios';

const baseurl = "http://localhost:8080/api";


const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
  }

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

async function signup(username, password, email, displayname){
  return await axios
          .post(baseurl + "/add/user", {
                  username,
                  password,
                  email,
                  displayname
          });
}

async function login(username, password){
  return await axios
          .post(baseurl + "/authenticate", {
                  username,
                  password
          })
          .then((response) => {
              
              sessionStorage.setItem("user", JSON.stringify(response.data));
              return response.data;
          })
}

function logout(){
   sessionStorage.clear();
}

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

useEffect(() =>{
    const token = sessionStorage.getItem("user");

    if(sessionStorage.getItem("user") != null ){
        setCurrentUser(parseJwt(token))
      }
    else{
        setCurrentUser(null);
    }
    setLoading(false)
  },[])

  const value = {
    currentUser,
    login,
    signup,
    logout

  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}



