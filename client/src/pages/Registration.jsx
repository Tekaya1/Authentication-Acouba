import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import "../AUTH.css";
import PasswordStrengthBar from 'react-password-strength-bar';
import swal from 'sweetalert';  
export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [NameReg, setNameReg] = useState("");
  const [SurnameReg, setSurnameReg] = useState("");
  const [EmailReg, setEmailReg] = useState("");
  const [PhoneReg, setPhoneReg] = useState("");
  const [GenderReg, setGenderReg] = useState("");

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;
  const register = () => {
    Axios.post("http://localhost:3001/register", {
      Name: NameReg,
      SurName : SurnameReg,
      username: usernameReg,
      password: passwordReg,
      Email: EmailReg,
      Phone: PhoneReg,
      Gender: GenderReg
    }).then((response) => {
     if(response.data.errno==1062) {
          swal({
        title: "Error",
        text: `This email address ${EmailReg} or Phone Number ${PhoneReg} already exists, Please login using this email address or use another email`,
        icon: "error",
        button: `Retry`,
      }) 
     } else {
      swal({
        title: "Congratulation!",
        text: `Welcome To Our Platform, ${usernameReg}`,
        icon: "success",
        button: "Go !",
      }).then(function() {
        window.location = "/";
    });   
  }     
    });
  
  };

  return (
    <div class="container">
    <div class="title">Registration</div>
    <div class="content">
      <form action="javascript:void(0);">
        <div class="user-details">
          <div class="input-box">
            <span class="details">Firstname</span>
            <input type="text" onChange={(e) => {setNameReg(e.target.value);}} id="N1" placeholder="Enter your Firstname" required />
          </div>
          <div class="input-box">
            <span class="details">Surname</span>
            <input type="text" onChange={(e) => {setSurnameReg(e.target.value);}} id="S1" placeholder="Enter your Surname"  required/>
          </div>
          <div class="input-box">
            <span class="details">Username</span>
            <input type="text" onChange={(e) => {setUsernameReg(e.target.value);}}  placeholder="Enter your Username"  required />
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input type="email" onChange={(e) => {setEmailReg(e.target.value);}}  placeholder="Enter your Email"  required/>
          </div>
          <div class="input-box">
            <span class="details">Phone Number</span>
            <input type="number" onChange={(e) => {setPhoneReg(e.target.value)}} placeholder="Enter your number" required ></input>
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input type="password" onChange={(e) => {setPasswordReg(e.target.value)}} placeholder="Enter your password" required ></input>
            <PasswordStrengthBar password={passwordReg} />
          </div>
          
        </div>
        <div class="gender-details">
          <input type="radio" name="gender" id="dot-1" value="Male" onChange={(e) => {setGenderReg(e.target.value);}}></input>
          <input type="radio" name="gender" id="dot-2" value="Female" onChange={(e) => {setGenderReg(e.target.value);}}></input>
          <input type="radio" name="gender" id="dot-3" value="undefined" onChange={(e) => {setGenderReg(e.target.value);}}></input>
          <span class="gender-title">Gender</span>
          <div class="category">
            <label for="dot-1">
            <span class="dot one"></span>
            <span class="gender">Male</span>
          </label>
          <label for="dot-2">
            <span class="dot two"></span>
            <span class="gender">Female</span>
          </label>
          <label for="dot-3">
            <span class="dot three"></span>
            <span class="gender">Prefer not to say</span>
            </label>
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Register" onClick={register} disabled={!passwordReg}></input>
          <a href="/">Login Here</a>
        </div>
      </form>
    </div>
  </div>
  );
}
