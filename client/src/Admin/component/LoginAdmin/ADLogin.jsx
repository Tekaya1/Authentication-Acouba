import React, { useState, useEffect} from "react";
import Axios from "axios";
import swal from 'sweetalert';
import Lottie from "react-lottie";
import * as location from "../Loader/1055-world-locations.json";
import * as success from "../Loader/1127-success.json";
export default function ADLogin() {

const [AdminPassword, setAdminPassword] = useState("");   
const [AdminEmail,setAdminEmail] = useState("");
const [loginStatus, setLoginStatus] = useState(false);
Axios.defaults.withCredentials= true

//login function 
const loginAdmin = () => {
Axios.post("http://localhost:3001/Admin/loginAdmin",{
    emailadmin: AdminEmail,
    passwordadmin : AdminPassword}).then((response) => { 
        if (!response.data.auth) {
            // setLoginStatus(response.data.message);
            swal({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              button: "Ok !",
            });
            
        } else {
            localStorage.setItem('tokenAdmin',response.data.token)
            setLoginStatus(true)
            console.log(response);
            swal({
              title: "Connected!",
              text: `Welcome Back,  Admin`,
              icon: "success",
              button: "Ok !",
            }).then(function() {
              window.location = "/Admin/HomeAdmin";
          });    
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
                    <h3 class="mb-4 text-center">Login In</h3>
                    
                    
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="email" onChange={(e) => { setAdminEmail(e.target.value); } } class="form-control" placeholder="Enter your Email" required />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input type="password" onChange={(e) => { setAdminPassword(e.target.value); } } class="form-control" placeholder="Enter your password" required></input>
                          </div>
                        </div>
                       
                        
                        
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="submit" id="B1" value="Connect" onClick={loginAdmin} class="btn btn-primary"/>
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
      </>
    )}
  </>
  )
}