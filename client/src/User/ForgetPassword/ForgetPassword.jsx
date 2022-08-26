import React, { useEffect, useReducer, useState } from "react";
import {useHistory} from 'react-router-dom'
import Axios from "axios";
import './Reset.scss'
import swal from 'sweetalert';
export default function ResetPaasword() {

const [email,setemail] = useState("");
const [username,setUsername] = useState("");


Axios.defaults.withCredentials= true


//Reset function 
const Reset = () => {
Axios.post("http://localhost:3001/ResetPassword",{
    email: email,
    username : username}).then((response) => { 
        if (!response.data.auth) {
            
            swal({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              button: "Ok !",
            });
            
        } else {
            swal({
              title: "Connected!",
              text: `Welcome Back,  ${response.data.result[0].username}`,
              icon: "success",
              button: "Ok !",
            }).then(function() {
              window.location = "/Navbar";
          });    
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


// const userauth  = () => {
//     Axios.get('http://localhost:3001/UserIsAuth', {
//         headers:
//         {"x-access-token":localStorage.getItem('token')

//     }}).then((response)=>{
//         console.log(response);
//     })
// }




return (
  
      <body id="Reset">

<div class="container">
  <div class="title">Reset Password</div>
  <div class="content">
    <form action="javascript:void(0);">
      <div class="user-details">
        <div class="input-box">
          <span class="details">Email</span>
          <input type="email" onChange={(e) => { setemail(e.target.value); } } placeholder="Enter your Email" required />
        </div>
        <div class="input-box">
          <span class="details">Username</span>
          <input type="text" onChange={(e) => { setUsername(e.target.value); } } placeholder="Enter your username" required></input>
        </div>
        
      </div>
      <div class="button">
        <input type="submit" value="Check" onClick={Reset}></input>
        
      </div>
    </form>
    
  </div>
</div>
</body>
  

);
  
}