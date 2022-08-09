import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import "../AUTH.css";
import PasswordStrengthBar from 'react-password-strength-bar';
export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [NameReg, setNameReg] = useState("");
  const [SurnameReg, setSurnameReg] = useState("");
  const [EmailReg, setEmailReg] = useState("");

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
      Email: EmailReg
    }).then(() => {
      alert("User Regestrired")
      window.location = '/'
    });
  };

 


  return (
    <div className="App">
      <div className="registration">
        <h1>Register to the system</h1>
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => {
            setNameReg(e.target.value);
          }} id="N1"
        /> <label>Surname</label>
        <input
          type="text"
          onChange={(e) => {
            setSurnameReg(e.target.value);
          }} id="S1"
        />
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <PasswordStrengthBar password={passwordReg} />
         <br />
         <br />
      </div>
      <button onClick={register} style={{top: "88%"}}> Register </button>
    </div>
  );
}
