import React, {useContext, useState, useEffect} from "react";

import axios from 'axios';

const baseurl = "http://localhost:8080/api";


const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
  }

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState()
    const [userDetails, setUserDetails] =useState([])
    

async function signup(username, password, email, displayname){
  return await axios
          .post(baseurl + "/add/user", {
                  username,
                  password,
                  email,
                  displayname
          });
}

async function authenticate(username, password){
  return await axios
          .post(baseurl + "/authenticate", {
                  username,
                  password
          })
          .then((response) => {
              setToken(JSON.stringify(response.data));
              setIsLoggedIn(true);
              sessionStorage.setItem("user", JSON.stringify(response.data));
              return response.data;
          })
}

function logout(){
   sessionStorage.clear();
   setIsLoggedIn(false);
}

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

async function getUserData(username){
  const config = {
    headers: {Authorization : `Bearer ` + sessionStorage.getItem("user")}
   };

   await axios.get((baseurl + "/user/username/" + username),{
                    config
                })
              .then((response) => {
                  setUserDetails(response.data);
                })
}

async function update(username, password){

  const token = sessionStorage.getItem("user")
  const jwtToken = JSON.parse(token)["jwt"]
  console.log(jwtToken)
      
  const config = {
      Authorization : `Bearer ` + jwtToken
   };
  await axios
          .patch(baseurl + "/user", {
           username,
           password
          },{
            headers: config
          }  
        );
  return authenticate(username, password);
}

useEffect(() =>{

  (async () => {
    const token = sessionStorage.getItem("user");
    
    setCurrentUser(parseJwt(token));

    if(currentUser !== null){
      setIsLoggedIn(true);
    }
 
    setLoading(false)
  })();
    
  },[isLoggedIn])

  const value = {
    currentUser,
    authenticate,
    token,
    signup,
    logout,
    update,
    getUserData,
    userDetails,
    isLoggedIn
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}