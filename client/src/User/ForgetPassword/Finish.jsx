import React, { useEffect, useReducer, useState } from "react";
import {useHistory} from 'react-router-dom'
import Axios from "axios";
import './Reset.scss'
import swal from 'sweetalert';
export default function Finish() {

const [NewPassword,setNewPassword] = useState("");
Axios.defaults.withCredentials= true
//Reset function 
    const SubmitReset = () => {
      Axios.post("http://localhost:3001/ForwardResetPassword",{
        NewPassword : NewPassword}).then((response) => { 
              if (response.data.affectedRows===0 && response.data.affectedRows===0) {
                  swal({
                    title: "Error!",
                    text: "Failed To Update, please Reconnect",
                    icon: "error",
                    button: "Ok !",
                  }).then(function() {
                    window.location.href = "/"
                  })
              } else  {
                swal({
                  title: "Good!",
                  text: "Update Success",
                  icon: "success",
                  button: "Ok !",
                }).then(function() {
                  sessionStorage.removeItem("ResetPass")
                  window.location.href = "/"
                }) 
              }
              })
          }
        
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

<div class="container1">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
            <h2 class="heading-section">Acoba Plateform🔒 </h2>
            
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10 col-md-12">
            <div class="wrapper">
              <div class="row justify-content-center">
                <div class="col-lg-8 mb-5">
                  <div class="row">
                 
                    
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="contact-wrap">
                    <h3 class="mb-4 text-center"></h3>
                    
                    
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="text" onChange={(e) => {setNewPassword(e.target.value)}} placeholder="New Password"  class="form-control"></input>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="submit" id="B1" value="reset" onClick={SubmitReset} class="btn btn-primary"/>
                            <div class="submitting"></div>
                          </div>
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</body>
  

);
  
}