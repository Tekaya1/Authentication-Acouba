import React, {  useState ,useRef } from "react";
import Axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';
import "./Form.css"
// type conges array \
export default function Form() {
  const [SelectReg, setSelectReg] = useState("");
  const [TextAreaReg, setTextAreaReg] = useState("");
  const [StartDateReg, setStartDateReg] = useState(new Date());
  const [EndDateReg, setEndDateReg] = useState(new Date());
  const [User, SetUser] = useState("");
  const [NameReg, setNameReg] = useState("");
  const [SurnameReg, setSurnameReg] = useState("");
  const [EmailReg, setEmailReg] = useState("");
 

  //Form submission
  const submitRev = () => {
    Axios.post('http://localhost:3001/Email/Insert',{
      Name:NameReg,
      SurName:SurnameReg,
      username:User,
      Select:SelectReg,
      TextArea:TextAreaReg,
      StartDate:StartDateReg,
      EndDate:EndDateReg,
      Email:EmailReg
    })
}
    //Email service by emailjs
    const form = useRef();
    const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_a7ylvfp', 'template_ywg2ae8', form.current, 'hjTAUdY8_qNmjQvmL')
      .then((result) => {
        submitRev()
        swal({
          title: "Good!",
          text: `Your Message has been sent Successsfely`,
          icon: "success",
          button: "Ok !",
        }).then(function() {
          window.location = "/CheckConge";
      });       
      }, (error) => {
        swal({
          title: "Error",
          text: `Error While Sending Data`,
          icon: "error",
          button: "Ok !",
        }).then(function() {
          window.location = "/Form";
      });
      });
  };

  // fetching email with users 
  const [EmailData, setEmailData] = useState([]);
  const fetchEmail= () => {
    Axios.post('http://localhost:3001/EmailFetch', {
      email:EmailReg
    })
    .then((response) => {
      return response.data
      
    })
    .then(data => {
      setEmailData(data)
      
    })
  }

  //tracking function fetchemail
  useState(() => {
    fetchEmail()
  }, [])


  useState(() => {
    if(localStorage.getItem("token")==null) {
      window.location.href = "/"
    }
  }, [])

  // logout function  
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
                    {EmailData.map(auth => (
                      <div class="dbox w-100 text-center">
                        <div class="icon d-flex align-items-center justify-content-center">
                        
                          <img alt="Avatar" class="avatar" style={{verticalalign: "middle",
                          width: "100px",
                          height:"100px",
                          borderradius: "50%"}} src={process.env.PUBLIC_URL + `/upload/${auth.image}`} />
                        
                        </div> <br ></br> 
                        
                        <div class="text">        
                          <span><input type="text"  id="Username" value={auth.username} class="form-control"  onFocus={(e) => { SetUser(e.target.value); }} autoFocus readOnly></input></span>
                          <br />
                          <button class="btn btn-primary" id="BL" onClick={logout}>log out</button>
                        </div>
                      </div>
                      ))}
                    </div>
                    
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="contact-wrap">
                    <h3 class="mb-4 text-center">Get in touch with us</h3>
                    
                    {EmailData.map(auth => (
                      <form ref={form} onSubmit={sendEmail}>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="text" class="form-control"  value={auth.Name}  onFocus={(e) => { setNameReg(e.target.value); }}  autoFocus  readOnly name="EName" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="text" class="form-control"   value={auth.SurName} onFocus={(e) => { setSurnameReg(e.target.value); }} readOnly autoFocus name="SName"   />
                          </div>
                        </div>
                        <div class="col-md-12"> 
                          <div class="form-group">
                            <input type="email" class="form-control" value={auth.Email}  onFocus={(e) => { setEmailReg(e.target.value); }} readOnly autoFocus name="Hello" />
                          </div>
                        </div>
                        
                        <div class="col-md-12">
                          <div class="form-group">
                         <select required id="IDCOL" class="form-control" onChange={(e) => {setSelectReg(e.target.value);}} name="typeC">
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
                          <input required type="date" class="form-control"  name="STD" onChange={(e) => setStartDateReg(e.target.value)}  placeholder="MM/DD/YYYY" min={disablePastDate()}/>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                          <input required type="date" class="form-control" placeholder="Hello" name="END" onChange={(e) => setEndDateReg(e.target.value)} min={disablePastDate()}/>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <textarea name="STE" class="form-control" id="message" cols="30" rows="8" placeholder="Please type the problem of the conge only" onChange={(e) => { setTextAreaReg(e.target.value); } } ></textarea>
                          </div>
                        </div>
                        
                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="submit" value="Send Message"  class="btn btn-primary"/>
                            
                            <div class="submitting"></div>
                            
                          </div>
                        </div>
                      </div>
                      </form>))}
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