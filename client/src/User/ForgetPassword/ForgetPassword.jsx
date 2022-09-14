import React, { useState } from "react";
import Axios from "axios";
import './Reset.scss'
import swal from 'sweetalert';
import {  useParams } 
        from 'react-router-dom'
export default function ResetPaasword() {
const [email,setemail] = useState("");
const [phone,setphone] = useState("");
const [show,setshow] = useState("")
Axios.defaults.withCredentials= true
const {token} = useParams()
//Reset function 
const Reset = () => {
Axios.post("http://localhost:3001/ResetPassword",{
    email: email}).then((response) => { 
      console.log(response); 
        if (response.data.length===0) {
            swal({
              title: "Error!",
              text: "The Email is Incorrect or Does not Exist",
              icon: "error",
              button: "Ok !",
            });  
        } else  {
          localStorage.setItem('TokenPassword',response.data.tokenPassword)
          swal({
            title: "Good!",
            text: `Verification Success`,
            icon: "success",
            button: "Ok !",
          }).then(function(){
            window.location =`/Verify/${localStorage.getItem("TokenPassword")}`;
          })
        }
        })
    }

    
    const ResetByphone = () => {
      Axios.post("http://localhost:3001/ResetPasswordPhone",{
        Phone:phone}).then((response) => { 
            console.log(response); 
              if (response.data.length===0) {
                  swal({
                    title: "Error!",
                    text: "The Phone  Is  Incorrect or Does Not Exist",
                    icon: "error",
                    button: "Ok !",
                  });  
              } else  {
                localStorage.setItem('TokenPassword',response.data.tokenPassword)
                swal({
                  title: "Good!",
                  text: `Verification Success`,
                  icon: "success",
                  button: "Ok !",
                }).then(function(){
                  window.location =`/Verify/${localStorage.getItem("TokenPassword")}`;
                })
              }
              })
          }
      

   

return (
  
      <body id="Reset">

<div className="container1">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Acoba Plateform🔒 </h2>
            
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <div className="wrapper">
              <div className="row justify-content-center">
                <div className="col-lg-8 mb-5">
                  <div className="row">
                 
                    
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="contact-wrap">
                    <form action="javascript:void(0);">
                    <div class="col-md-12">
                          <div class="form-group">
                          <div className="gender-details">
        <input type="radio" name="gender" id="dot-1" value="Phone" onChange={(e) => {setshow(e.target.value)}} ></input><br />
          <input type="radio" name="gender" id="dot-2" value="Email" onChange={(e) => {setshow(e.target.value)}}></input>
          <span className="gender-title">Select Reset Option</span>
          <div className="category">
            <label for="dot-1">
            <span className="dot one"></span>
            <span className="gender">Phone</span>
          </label><br />
          <label for="dot-2">
            <span className="dot two"></span>
            <span className="gender">Email</span>
          </label>
          </div>
        </div>
        
                          </div>
                        </div>
                        <div className="row">
                    {show==="Email" && (
                          
                          <><div className="col-md-12">
                          <div className="form-group">
                            <input type="text" onChange={(e) => { setemail(e.target.value); } } className="form-control" placeholder="Enter your Email" required />

                          </div>
                        </div><div className="col-md-12">
                            <div className="form-group">
                              <input type="submit" id="F1" value="Check" onClick={Reset} className="btn btn-primary" />
                              <div className="submitting"></div>
                            </div>
                          </div></>
                    )

                      }
 
                      {show==="Phone" && (
                          
                          <><div className="col-md-12">
                          <div className="form-group">
                            <input type="text" onChange={(e) => { setphone(e.target.value); } } className="form-control" placeholder="Enter your Phone Number" required />

                          </div>
                        </div><div className="col-md-12">
                            <div className="form-group">
                              <input type="submit" id="F1" value="Check" onClick={ResetByphone} className="btn btn-primary" />
                              <div className="submitting"></div>
                            </div>
                          </div></>
                      )
  
                      }   
                       
                       
                        
                        
                  
                  </div>
                  </form>
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