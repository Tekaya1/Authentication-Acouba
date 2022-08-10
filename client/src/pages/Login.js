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
const [loginStatus, setLoginStatus] = useState(false);
Axios.defaults.withCredentials= true

//login function 
const login = () => {
Axios.post("http://localhost:3001/login",{
    email: email,
    password : password}).then((response) => { 
        if (!response.data.auth) {
            setLoginStatus(response.data.message);
            
        } else {
            localStorage.setItem('token',response.data.token)
            setLoginStatus(true)
            window.location.href = '/Form'      
        }
    })
}
// useEffect(() => {
//     Axios.get("http://localhost:3001/login").then((response)  => 
//     {   if(response.data.loggedIn == true){
//             setLoginStatus(response.data.email[0].username)
            
//         }
//     })
// })


const userauth  = () => {
    Axios.get('http://localhost:3001/UserIsAuth', {
        headers:
        {"x-access-token":localStorage.getItem('token')

    }}).then((response)=>{
        console.log(response);
    })
}




return (
    <>
    <div className="container" >
  <div className="top"></div>
  <div className="bottom"></div>
  <div className="center">
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
        
  
  </div>
  <h1>{loginStatus}</h1>

</div>
</>
        
       
        
        
        
    
    
    


    
   
    
)
}