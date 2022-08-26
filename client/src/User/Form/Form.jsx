import React, {  useState ,useRef,useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';
import "./Form.css"



// type conges array \
const TypeConges = [
    { value: "CONGE_ANNUEL_NON_PAYE" ,label:"CONGÉ ANNUEL NON PAYÉ"},
    { value: "CONGE_MALADIE_NON_PAYE", label:"CONGÉ MALADIE NON PAYÉ"},
    { value: "CONGE_MALADIE_PAYE" ,label:"CONGÉ MALADIE PAYÉ"},
    { value: "CONGE_ANNUELLE" ,label:"CONGÉ ANNUELLE"},
    { value: "CONGE_MALADIE" ,label:"CONGÉ MALADIE"},
    { value: "CONGE_MATERNITE" ,label:"CONGÉ MATERNITÉ"},
    { value: "PRESENT" ,label:"PRESENT"},
    { value: "ABSENT" ,label:"ABSENT"},
    { value: "JOUR_FERIER" ,label:"JOUR FERIER"},
    { value: "JOUR_FERIER_TRAVAILLER" ,label:"JOUR FERIER TRAVAILLER"},
    
];
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
const newdate = year + "/" + month + "/" + day;
console.log(newdate);
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
    }).then(()=> {
      swal({
        title: "Good!",
        text: `Your Message has been sent Successsfely`,
        icon: "success",
        button: "Ok !",
      }).then(function() {
        window.location = "/Form";
    });    
  })
}
  



  // function show textarea
  const [showhide,setshowhide] = useState('');
  const showhandler = (e) =>{
    const getuser = e.value;
    setshowhide(getuser);
  }

  //fetching data (importing typeconge)
  const [Data, setData] = useState([]);
  const fetchData = () => {
    Axios.post('http://localhost:3001/Data', {
      list:SelectReg
    })
    .then((response) => {
      return response.data
    })
    .then(data => {
      setData(data)
      // alert("Data fetched")
    })
  }

  // tracking function fetchData()
  useState(() => {
    fetchData()
  }, [])


  // show list conge with show hide option
  const Conge = e => {
    setSelectReg(e.value);
    showhandler(e);
  };



    //Email service by emailjs
    const form = useRef();
    const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('servic_a7ylvfp', 'template_ywg2ae8', form.current, 'hjTAUdY8_qNmjQvmL')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
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
  return ( 
    <body id="Form">
      
    <div class="container">
    <div class="title">Formulaire de congé
    
    </div>
    <div class="content">
      <form ref={form} onSubmit={sendEmail}>
      <div class="button"style={{top:"100%"}}>
    <input type="submit" onClick={logout} value="Log Out" style={{width: "29%",float:"right"}}></input>
    </div>
        {EmailData.map(auth => (
                       <>
                       <div class="user-details">
                       <div class="input-box">    
        <span class="details">User: </span>
        <input type="text"  value={auth.username} style={{background: "#ccc"}}  onFocus={(e) => { SetUser(e.target.value); }} autoFocus readOnly></input>
        </div>  
        <div class="input-box">   
        <span class="details">Email: </span>
        <input type="email" readOnly value={auth.Email} style={{background: "#ccc"}} onFocus={(e) => { setEmailReg(e.target.value); }} autoFocus name="Hello"></input>
        </div>
        </div>
        <div hidden={true} key={auth.id}>
        <label>Name: </label>
        <input type="text"  value={auth.Name}  onFocus={(e) => { setNameReg(e.target.value); }}  autoFocus  name="EName" hidden={true} ></input>
        <label>Surname: </label>
        <input type="text"  value={auth.SurName} onFocus={(e) => { setSurnameReg(e.target.value); }} autoFocus name="SName" hidden={true} ></input>
        </div>
        </>
                  ))}
        
        
        <br />
        <div class="input-box">
            <span class="details">Type Conges:</span>
            <Select options={TypeConges}  onChange={Conge}   isSearchable={false}  name="typeC" ></Select>  
          </div>
        
        <div class="button">
        <input onClick={fetchData}  value="Confirm" type="submit"> 
        </input></div>
        {
         
        showhide===SelectReg && (
          <>
            {Data.length > 0 && (
                <div class="user-details">
                  
                  <div class="input-box">
                    <span class="details">Start:</span>
                  <DatePicker
       selected={StartDateReg}
       selectsStart
       startDate={StartDateReg}
       endDate={EndDateReg}
       onChange={date => setStartDateReg(date)} name="STD"/>
       </div>
       <div class="input-box">
            <span class="details">end:</span>
     {/*  */}
     <DatePicker
       selected={EndDateReg}
       selectsEnd
       startDate={StartDateReg}
       endDate={EndDateReg}
       minDate={StartDateReg}
       onChange={date => setEndDateReg(date)}
     name="END"/>
      </div>
                  {Data.map(conges => (
                       <>
                       <div class="user-details">
                        <div >
                          
                      <textarea style={{background: "#ccc"}}  readOnly onFocus={(e) => { setTextAreaReg(e.target.value); } } name="STE" id="text" key={conges.id} defaultValue={SelectReg.value} autoFocus>{conges.EmailCON}</textarea>
                      </div>
                      <div className="button"  style={{position: "inherit"}}>
                          <input  type="submit" value={" Send 📨"} onClick={submitRev} oncap></input>
                      </div>
                      </div>
                      </>
                  ))}
                </div>
              )}
              </>
          )
      }
      </form>
      </div>
    </div>
    </body>
  );
}