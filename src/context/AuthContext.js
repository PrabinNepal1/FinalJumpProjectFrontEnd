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

async function getUserData(username){
  const config = {
    headers: {Authorization : "Bearer" + sessionStorage.getItem("user")}
   };

   await axios.get((baseurl + "/user/username/" + username),{
                    config
                })
              .then((response) => {
                  setUserDetails(response.data);
                })
}

async function update(username, password, email, displayname){
  const config = {
    headers: {
      Authorization : "Bearer" + sessionStorage.getItem("user")}
   };
  return await axios
          .patch((baseurl + "/user"), {
            "username": username,
            "password": password
          },{
            config
        });
}

useEffect(() =>{
    const token = sessionStorage.getItem("user");

    if(token != null ){
        setCurrentUser(parseJwt(token));
      }
    else{
      setCurrentUser(null);
    }
    setLoading(false)

  },[])

  const value = {
    currentUser,
    authenticate,
    token,
    signup,
    logout,
    update,
    getUserData,
    userDetails
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}



