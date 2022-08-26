import React, { useState } from "react";
import Axios from "axios";
import "./Register.css";
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
  const [image, setImage] = useState([]);
  Axios.defaults.withCredentials = true;
  

  const onSub= async (e)=>{
    let formData=new FormData();
    formData.append("imgfile",image[0])
    formData.append("username",usernameReg)
    formData.append("Name",NameReg)
    formData.append("SurName",SurnameReg)
    formData.append("password",passwordReg)
    formData.append("Phone",PhoneReg)
    formData.append("Gender",GenderReg)
    formData.append("Email",EmailReg)
e.preventDefault()

await Axios.post("http://localhost:3001/imgupload",formData).then((response) => {
  console.log(response)
  if(response.data.errno===1062) {
    swal({
  title: "Error",
  text: `This email address ${EmailReg} is  already exists, Please login using this email address or use another email`,
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
})

}  


const [message, setMessage] = useState('');
const [error, setError] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }

    setMessage(event.target.value);
  };

  return (
    <body id="register">
    <div className="container">
    <div className="title">Registration</div>
    <div className="content">
      <form  onSubmit={onSub}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Firstname</span>
            <input type="text" onChange={(e) => {setNameReg(e.target.value);}} id="N1" placeholder="Enter your Firstname" required />
          </div>
          <div className="input-box">
            <span className="details">Surname</span>
            <input type="text" onChange={(e) => {setSurnameReg(e.target.value);}} id="S1" placeholder="Enter your Surname"  required/>
          </div>
          <div className="input-box">
            <span className="details">Username</span>
            <input type="text" onChange={(e) => {setUsernameReg(e.target.value);}}  placeholder="Enter your Username"  required />
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input type="email" onBlur={handleChange}  onChange={(e) => {setEmailReg(e.target.value);}}  placeholder="Enter your Email"  required/>
            {error && <h2 style={{color: 'red'}}>{error}</h2>}
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input type="number" onChange={(e) => {setPhoneReg(e.target.value)}} placeholder="Enter your number"  ></input>
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" onChange={(e) => {setPasswordReg(e.target.value)}} placeholder="Enter your password" required ></input>
            <PasswordStrengthBar password={passwordReg} />
            <div className="input-box">
            <span className="details">Upload yout image</span>
                      <input type="file" name="imgfile" className="form-control"   onChange={(e)=>setImage(e.target.files)}  required />
                </div>        
          </div>
          
        </div>
        <div className="gender-details">
        <input type="radio" name="gender" id="dot-1" value="Male" onChange={(e) => {setGenderReg(e.target.value);}}></input>
          <input type="radio" name="gender" id="dot-2" value="Female" onChange={(e) => {setGenderReg(e.target.value);}}></input>
          <input type="radio" name="gender" id="dot-3" value="undefined" onChange={(e) => {setGenderReg(e.target.value);}}></input>
          <span className="gender-title">Gender</span>
          <div className="category">
            <label for="dot-1">
            <span className="dot one"></span>
            <span className="gender">Male</span>
          </label>
          <label for="dot-2">
            <span className="dot two"></span>
            <span className="gender">Female</span>
          </label>
          <label for="dot-3">
            <span className="dot three"></span>
            <span className="gender">Prefer not to say</span>
            </label>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Register"  disabled={!passwordReg}></input>
          <a href="/">Login Here</a>
        </div>
      </form>
    </div>
  </div>
  </body>
  );
}
