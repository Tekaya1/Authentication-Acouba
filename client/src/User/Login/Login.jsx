import React, { useEffect, useReducer, useState } from "react";
import {useHistory} from 'react-router-dom'
import Axios from "axios";
import PasswordStrengthBar from 'react-password-strength-bar';
import './Login.css'
import Cookies from "js-cookie";
import swal from 'sweetalert';
import Lottie from "react-lottie";
import * as location from "../Loader/1055-world-locations.json";
import * as success from "../Loader/1127-success.json";

export default function Login() {
    
const history = useHistory()
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");   
const [email,setemail] = useState("");
const [loginStatus, setLoginStatus] = useState(false);
Axios.defaults.withCredentials= true

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

//login function 
const login = () => {
Axios.post("http://localhost:3001/login",{
    email: email,
    password : password}).then((response) => { 
        if (!response.data.auth) {
            // setLoginStatus(response.data.message);
            swal({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              button: "Ok !",
            });
            
        } else {
            localStorage.setItem('token',response.data.token)
            setLoginStatus(true)
            console.log(response);
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

const [data, setData] = useState([]);
const [loading, setloading] = useState(undefined);
const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setloading(true);

          setTimeout(() => {
            setcompleted(true);
          }, 1000);
        });
    }, 2000);
  }, []);



return (
  <>
  
  {!completed ? (
    <>
      {!loading ? (
        <Lottie options={defaultOptions1} height={200} width={200} />
      ) : (
        <Lottie options={defaultOptions2} height={100} width={100} />
      )}
    </>
  ) : (
    <>
      <body id="login">

<div class="container">
  <div class="title">Login</div>
  <div class="content">
    <form action="javascript:void(0);">
      <div class="user-details">
        <div class="input-box">
          <span class="details">Email</span>
          <input type="email" onChange={(e) => { setemail(e.target.value); } } placeholder="Enter your Email" required />
        </div>
        <div class="input-box">
          <span class="details">Password</span>
          <input type="password" onChange={(e) => { setPassword(e.target.value); } } placeholder="Enter your password" required></input>
        </div>
      </div>
      <div class="button">
        <input type="submit" value="Connect" onClick={login}></input>
        <a href="/Registration">Not Registred yet</a>
      </div>
    </form>
    <h1>{(loginStatus)}</h1>
  </div>
</div>
</body>
    </>
  )}
</>
);
  
}