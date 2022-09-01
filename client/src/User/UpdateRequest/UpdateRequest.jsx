import React, { useEffect, useState } from "react";
import Axios from "axios";
import swal from 'sweetalert'; 
import {  useParams } 
        from 'react-router-dom'

       
export default function UpdateRequest()   {

  const [NameReg, setNameReg] = useState("");
  const [SurnameReg, setSurnameReg] = useState("");
  const [EmailReg, setEmailReg] = useState("")
  const [TextAreaReg, setTextAreaReg] = useState("");
  const [StartDateReg, setStartDateReg] = useState(new Date());
  const [EndDateReg, setEndDateReg] = useState(new Date());
  const [User, SetUser] = useState("");
  const [SelectReg, setSelectReg] = useState("");
  const { id } = useParams()
  console.log(id);
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
  
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  
const UpdateRequest = () => {
    Axios.put(`http://localhost:3001/UpdateRequest/${(id)}`, {
        username:User,
        Name:NameReg,
        SurName:SurnameReg,
        Email:EmailReg,
        Select:SelectReg,
        TextArea:TextAreaReg,
        StartDate:StartDateReg,
        EndDate:EndDateReg
    }).then((response) => {
       
      swal({
        title: "Done",
        text: `Update Has been succesfully, Please Reconnect`,
        icon: "success",
        button: `Done`,
      }).then(function() {
          window.location.href = "/CheckConge"
      })
    
    })
  
}

useState(() => {
    if(localStorage.getItem("token")==null) {
      window.location.href = "/"
    }
  }, []);





  const fetchEmail= () => {
    Axios.post(`http://localhost:3001/RequestFetch/${id}`)
    .then((response) => {
      if(response.data.length>0) {
        SetUser(response.data[0].username)
        setNameReg(response.data[0].Name)
        setSurnameReg(response.data[0].SurName)
        setEmailReg(response.data[0].Email)
        setTextAreaReg(response.data[0].Requests)
        setSelectReg(response.data[0].TypeConge)
        setStartDateReg(response.data[0].StartDate)
        setEndDateReg(response.data[0].EndDate)
      } else {
        swal({
          title: "Error",
          text: "You Can't access Here",
          icon: "error",
          button: 'Ok',
        }).then(function() {
         logout()
      });    
      }
      
      })
  }
  //tracking function fetchemail
  useState(() => {
    fetchEmail()
  }, [])
   

  
  return (
    <body id="FOR1">
    
      <div class="container1">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
            <h2 class="heading-section">Conges Form 📝</h2>
            
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10 col-md-12">
            <div class="wrapper">
              <div class="row justify-content-center">
                <div class="col-lg-8 mb-5">
                  <div class="row">
                    <div class="col-md-4">

                    </div>
                    <div class="col-md-4">
                    
                      <div class="dbox w-100 text-center">
                        
                        
                        <div class="text">        
                          <span><input type="text"  id="Username" value={User} class="form-control"  onChange={(e) => { SetUser(e.target.value); }} autoFocus readOnly></input></span>
                          <br />
                          <button class="btn btn-primary" id="BL" onClick={logout}>log out</button>
                        </div>
                      </div>
                      
                    </div>
                    
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="contact-wrap">
                    <h3 class="mb-4 text-center">Get in touch with us</h3>
                    
                    
                      
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="text" class="form-control"  value={NameReg}  onChange={(e) => { setNameReg(e.target.value); }}    readOnly name="EName" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="text" class="form-control"   value={SurnameReg} onChange={(e) => { setSurnameReg(e.target.value); }} readOnly  name="SName"   />
                          </div>
                        </div>
                        <div class="col-md-12"> 
                          <div class="form-group">
                            <input type="email" class="form-control" value={EmailReg}  onChange={(e) => { setEmailReg(e.target.value); }} readOnly  name="Hello" />
                          </div>
                        </div>
                        
                        <div class="col-md-12">
                          <div class="form-group">
                         <select required id="IDCOL" value={SelectReg} class="form-control" onChange={(e) => {setSelectReg(e.target.value);}} name="typeC">
                          <option value="">Select Conge</option>
                          <option value="CONGE_ANNUEL_NON_PAYE">CONGÉ ANNUEL NON PAYÉ</option>
                          <option value="CONGE_MALADIE_NON_PAYE">CONGÉ MALADIE NON PAYÉ</option>
                          <option value="CONGE_MALADIE_PAYE">CONGÉ MALADIE PAYÉ</option>
                          <option value="CONGE_ANNUELLE">CONGÉ ANNUELLE</option>
                          <option value="CONGE_MALADIE">CONGÉ MALADIE</option>
                          <option value="CONGE_MATERNITE">CONGÉ MATERNITÉ</option>
                          <option value="PRESENT">PRESENT</option>
                          <option value="ABSENT">ABSENT</option>
                          <option value="JOUR_FERIER">JOUR FERIER</option>
                          <option value="JOUR_FERIER_TRAVAILLER">JOUR FERIER TRAVAILLER</option>
                         </select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input required type="date" value={StartDateReg} class="form-control"  name="STD" onChange={(e) => setStartDateReg(e.target.value)}  placeholder="MM/DD/YYYY" min={disablePastDate()}/>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input required type="date" value={EndDateReg} class="form-control" placeholder="Hello" name="END" onChange={(e) => setEndDateReg(e.target.value)} min={disablePastDate()}/>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <textarea name="STE" value={TextAreaReg} class="form-control" id="message" cols="30" rows="8" placeholder="Please type the problem of the conge only" onChange={(e) => { setTextAreaReg(e.target.value); } } ></textarea>
                          </div>
                        </div>
                        
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="submit" value="Update" onClick={() => UpdateRequest()} class="btn btn-primary"/>
                            
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
