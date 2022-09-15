import React, { useEffect, useState } from "react";
import Axios from "axios";
import swal from 'sweetalert2';
import Lottie from "react-lottie";
import * as location from "../Loader/1055-world-locations.json";
import * as success from "../Loader/1127-success.json";
import './Login.css'
export default function Login() {
const [password, setPassword] = useState("");   
const [email,setemail] = useState("");
const [, setLoginStatus] = useState(false);
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
              window.location = "/Home";
          });    
             
        }
    })

    

   
}


// useState(() => {
//     Axios.get('http://localhost:3001/UserIsAuth', {
//         headers:
//         {"x-access-token":localStorage.getItem('token')
//     }}).then((response)=>{
//        console.log(response);
//     })
// })

const [, setData] = useState([]);
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
                    <h3 className="mb-4 text-center">Login In</h3>
                    
                    
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                          <input type="email" onChange={(e) => { setemail(e.target.value); } } className="form-control" placeholder="Enter your Email" required />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                          <input type="password" onChange={(e) => { setPassword(e.target.value); } } className="form-control" placeholder="Enter your password" required></input>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <a href="/ResetPassword" id="Reset1">Reset Password</a>
                            <a href="/registration" id="registration">Register</a>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            
                          </div>
                        </div>
                       
                        
                        
                        <div className="col-md-12">
                          <div className="form-group">
                            <input type="submit" id="B1" value="Log In" onClick={login} className="btn btn-primary"/>
                            
                            <div className="submitting"></div>
                            
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
    </>
  )}
</>
);
  
}