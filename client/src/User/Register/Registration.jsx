import React, { useState,useRef } from "react";
import Axios from "axios";
import "./Register.css";
import PasswordStrengthBar from 'react-password-strength-bar';
import swal from 'sweetalert'; 
import emailjs from '@emailjs/browser';
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
  

  const onSub = async ()=>{
    let formData=new FormData();
    formData.append("imgfile",image[0])
    formData.append("username",usernameReg)
    formData.append("Name",NameReg)
    formData.append("SurName",SurnameReg)
    formData.append("password",passwordReg)
    formData.append("Phone",PhoneReg)
    formData.append("Gender",GenderReg)
    formData.append("Email",EmailReg)
    

 Axios.post("http://localhost:3001/imgupload",formData).then((response) => {
  console.log(response)
  if(response.data.errno===1062) {
    swal({
  title: "Error",
  text: `This email address ${EmailReg} or Phone Number is  already exists, Please login using this email address or use another email`,
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


const [, setMessage] = useState('');
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

  
    const form = useRef();
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_ubhjb7p', 'template_0nvkt3y', form.current, 'hjTAUdY8_qNmjQvmL')
        .then((result) => {
            
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

   
  
  return (
    <body id="register">
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
                    <h2 class="heading-section">User Register</h2>
                    
                 
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="text" class="form-control" onChange={(e) => {setNameReg(e.target.value);}} id="N1" placeholder="Enter your Firstname" name="FN" required />                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="text" class="form-control" onChange={(e) => {setSurnameReg(e.target.value);}} id="S1" placeholder="Enter your Surname"  required/>                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="text" class="form-control" onChange={(e) => {setUsernameReg(e.target.value);}}  placeholder="Enter your Username"  required />                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="email" class="form-control" onBlur={handleChange}  onChange={(e) => {setEmailReg(e.target.value);}}  placeholder="Enter your Email"  required/>
                          </div>
                          {error && <h2 style={{color: 'red'}}>{error}</h2>}
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="number" class="form-control" onChange={(e) => {setPhoneReg(e.target.value)}} placeholder="Enter your number"  ></input>                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="password" class="form-control" onChange={(e) => {setPasswordReg(e.target.value)}} placeholder="Enter your password" required ></input>
                          <PasswordStrengthBar password={passwordReg} />                          
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">                     
                          <input type="file" name="imgfile" className="form-control"   onChange={(e)=>setImage(e.target.files)}  required />  
                          <code id="ErrorIMG">Only jpg ,jpeg and png are supported</code>                
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
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
        
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="submit" value="register" disabled={!passwordReg} onClick={onSub} class="btn btn-primary"/>
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
