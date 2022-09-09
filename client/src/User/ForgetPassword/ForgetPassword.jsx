import React, { useState , useEffect} from "react";
import Axios from "axios";
import './Reset.scss'
import swal from 'sweetalert';
export default function ResetPaasword() {
const [email,setemail] = useState("");
Axios.defaults.withCredentials= true
//Reset function 
const Reset = () => {
Axios.post("http://localhost:3001/ResetPassword",{
    email: email}).then((response) => { 
      console.log(response); 
        if (response.data.length===0) {
            swal({
              title: "Error!",
              text: "The Email  or Reset Code is  incorrect ",
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
            window.location = "/Verify";
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

// Hey, a popstate event happened!
window.addEventListener("popstate", e => {  // Nope, go back to your page
  this.props.history.go(1);});

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
                    <h3 className="mb-4 text-center"></h3>
                    
                    
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                          <input type="email" onChange={(e) => { setemail(e.target.value); } } className="form-control" placeholder="Enter your Email" required />
                          </div>
                        </div>
                       
                       
                        
                        
                        <div className="col-md-12">
                          <div className="form-group">
                            <input type="submit" id="F1" value="Check" onClick={Reset} className="btn btn-primary"/>
                            
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
  

);
  
}