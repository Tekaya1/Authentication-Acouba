import React, { useEffect, useReducer, useState } from "react";
import {useHistory} from 'react-router-dom'
import Axios from "axios";
import PasswordStrengthBar from 'react-password-strength-bar';
import '../AUTH.css'
import Cookies from "js-cookie";
export default function Login() {
    
const history = useHistory()
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");   
const [email,setemail] = useState("");
const [loginStatus, setLoginStatus] = useState("");
Axios.defaults.withCredentials= true

const login = () => {
Axios.post("http://localhost:3001/login",{
    email: email,
    password : password}).then((response) => { 
        if (response.data.message) {
            setLoginStatus(response.data.message)
        } else {
            setLoginStatus(response.data[0].username)
            sessionStorage.setItem('emailid',response.data[0].username)
            
        }
    })
}
useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response)  => 
    {   if(response.data.loggedIn == true){
            setLoginStatus(response.data.email[0].username)
        }
    })
})




return (
    <>
    <div class="container" onclick="onclick">
  <div class="top"></div>
  <div class="bottom"></div>
  <div class="center">
    <h2> Sign In </h2>
    <input
            type="email"
            placeholder="Email..."
            onChange={(e) => {
                setemail(e.target.value);
            } } /><br />

<input
            type="password"
            placeholder="Password..."
            onChange={(e) => {
                setPassword(e.target.value);
            } } />
        <button   onClick={login}>Submit</button>
        {/* <button type="submit" onClick={login}> Login </button> */}
        <h1>{loginStatus}</h1>
  
  </div>
</div>
</>
        
       
        
        
        
    
    
    


    
   
    
)
}