import React, { useState,useEffect } from "react";
import Axios from "axios";
import PasswordStrengthBar from 'react-password-strength-bar';
import swal from 'sweetalert'; 
import Swal from 'sweetalert2'

export default function Update()   {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [NameReg, setNameReg] = useState("");
  const [SurnameReg, setSurnameReg] = useState("");
  const [EmailReg, setEmailReg] = useState("")
  const [PhoneReg, setPhoneReg] = useState("");
  const [GenderReg, setGenderReg] = useState("");
  const [Idreg, setIdreg] = useState(null);

  // const [image, setImage] = useState([]);
  Axios.defaults.withCredentials = true;

  const logout = () => {
    Axios.post('http://localhost:3001/logout').then((response)=> {
      window.localStorage.clear()
    }).then(()=> {
      swal("Are you sure you want to do this?",{
        title: "Good!",
        text: `Logged Out`,
        icon: "info",
        button: 'Ok',
      }).then(function() {
        window.location = "/";
    });    
    }) 
  }
  useEffect(() => {
    Axios.get('http://localhost:3001/UserIsAuth', {
        headers:
        {"x-access-token":localStorage.getItem('token')
    }}).then((response)=>{
        if(response.data.auth==true) {
          console.log("response")
        } else {
          localStorage.removeItem('token')
          if(localStorage.getItem("token")==null) {
            Swal.fire({
                 title: 'Session Expire',
                   html:
                     'Please Reconnect<br/><br/>',
                   timer: 
                     "3000",
         didOpen: () => {
           const content = Swal.getHtmlContainer()
           content.querySelector.bind(content)
           Swal.showLoading()
         }
         }).then(function() {
                window.location.href = "/"
           })
           }
        }
    })
})


  
const Update = (id) => {
    Axios.put("http://localhost:3001/UpdateUser", {
        id:id,
        username:usernameReg,
        password:passwordReg,
        Name:NameReg,
        SurName:SurnameReg,
        Email:EmailReg,
        Phone:PhoneReg,
        Gender:GenderReg
    }).then(() => {
      if(localStorage.getItem("token")==null) {
        Swal.fire({
             title: 'Session Expire',
               html:
                 'Please Reconnect<br/><br/>',
               timer: 
                 "3000",
     didOpen: () => {
       const content = Swal.getHtmlContainer()
       content.querySelector.bind(content)
       Swal.showLoading()
     }
     }).then(function() {
            window.location.href = "/"
       })
       } else {
      swal({
        title: "Done",
        text: `Update Has been succesfully, Please Reconnect`,
        icon: "success",
        button: `Done`,
      }).then(function() {
          logout()
      })
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

  const fetchEmail= () => {
    Axios.post('http://localhost:3001/EmailFetch')
    .then((response) => {
      setIdreg(response.data[0].id)
      setUsernameReg(response.data[0].username)
      setNameReg(response.data[0].Name)
      setSurnameReg(response.data[0].SurName)
      setEmailReg(response.data[0].Email)
      setPhoneReg(response.data[0].Phone)
      setPasswordReg(response.data[0].password)
      setGenderReg(response.data[0].Gender)
      })
  }
  //tracking function fetchemail
  useState(() => {
    fetchEmail()
  }, [])


   

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
                    <h2 class="heading-section">User Profile</h2>
                    
                    
                      
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="text" class="form-control" value={NameReg}  onChange={(e) => {setNameReg(e.target.value)}} id="N1" placeholder="Enter your Firstname" name="FN"   required />                          </div>
                          
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="text" class="form-control" value={SurnameReg}  onChange={(e) => {setSurnameReg(e.target.value)}} id="S1" placeholder="Enter your Surname"   required/>                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="text" class="form-control" value={usernameReg}  onChange={(e) => {setUsernameReg(e.target.value)}}  placeholder="Enter your Username"  required />                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="email" class="form-control" value={EmailReg}   onBlur={handleChange}  onChange={(e) => {setEmailReg(e.target.value)}}  placeholder="Enter your Email"   required/>
                          </div>
                          {error && <h2 style={{color: 'red'}}>{error}</h2>}
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="number" class="form-control" value={PhoneReg}    onChange={(e) => {setPhoneReg(e.target.value)}} placeholder="Enter your number"  ></input>                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="password" class="form-control" value={passwordReg}   onChange={(e) => {setPasswordReg(e.target.value)}} placeholder="Enter your password" required  ></input>
                          <PasswordStrengthBar password={passwordReg} /> 
                                        
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="submit" value="Update" disabled={!passwordReg}   onClick={() => {Update(Idreg)}} class="btn btn-primary"/>
      
                            <div class="submitting"></div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <div className="gender-details">
                            <form action="">
        <input type="radio" name="gender" id="dot-1" value="Male" onChange={(e) => {setGenderReg(e.target.value);}}></input>
          <input type="radio" name="gender" id="dot-2" value="Female"  onChange={(e) => {setGenderReg(e.target.value);}}></input>
          <input type="radio" name="gender" id="dot-3" value="Undefined"  onChange={(e) => {setGenderReg(e.target.value);}}></input>
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
          </form>
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
</div>
  </body>
  );
}
