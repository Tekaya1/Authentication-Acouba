import React, { useEffect, useReducer, useState } from "react";
import Axios from "axios";
import './Reset.scss'
import swal from 'sweetalert';
import {useHistory } 
        from 'react-router-dom'
export default function Verify() {

const [code,setcode] = useState("");
Axios.defaults.withCredentials= true
//Reset function 

    const Verify = () => {
      Axios.post("http://localhost:3001/VerifyCode",{
        code:code}).then((response) => {
          
              if (response.data.length===0 ) {
                  swal({
                    title: "Error!",
                    text: "Failed To Verify, Code incorrect",
                    icon: "error",
                    button: "Ok !",
                  })
              } else  {
                swal({
                  title: "Good!",
                  text: "Verification Success",
                  icon: "success",
                  button: "Ok !",
                }).then(function() {
                  window.location.href = "/Finish"
                }) 
              }
              })
          }
         
            useEffect(() => {
              Axios.get('http://localhost:3001/ResetVerif', {
                  headers:
                  {"x-access-token":localStorage.getItem('TokenPassword')
              }}).then((response)=>{
                
                if(response.data.Status==true) {
                  // console.log(response)
                } else {
                if(localStorage.getItem("TokenPassword")==null) {
                swal({
                  title: "Error!",
                  text: "Your ResetSession has not Set, Please Reset Again",
                  icon: "warning",
                  button: "Ok !",
                }).then(function() {
                  window.location.href = "/"
                })
              } else if(response.data.err.name=="TokenExpiredError"){
                localStorage.removeItem("TokenPassword")
                swal({
                  title: "Error!",
                  text: "Your ResetSession has been Expired, Please Reset Again",
                  icon: "warning",
                  button: "Ok !",
                })

              }
            }
            })
            })    
        

          
        
  
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
                          <input type="text" onChange={(e) => {setcode(e.target.value)}} placeholder="Code "  class="form-control"></input>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="submit" id="B1" value="reset" onClick={Verify} class="btn btn-primary"/>
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