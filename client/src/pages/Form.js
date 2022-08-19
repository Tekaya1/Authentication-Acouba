import React, {  useState ,useRef,useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from '@emailjs/browser';



// type conges array \
const TypeConges = [
    { value: "CONGE_PAYE" ,label:"CONGÉ PAYÉ"},
    { value: "CONGE_INDIVIDUEL_DE_FORMATION", label:"CONGÉ INDIVIDUEL DE FORMATION"},
    { value: "CONGE_FORMATION_ECONOMIQUE_SOCIALE ET SYNDICALE" ,label:"CONGÉ FORMATION ÉCONOMIQUE, SOCIALE ET SYNDICALE"},
    { value: "CONGÉ_D-ENSEIGNEMENt_ET_DE_RECHERCHE" ,label:"CONGÉ D’ENSEIGNEMENT ET DE RECHERCHE"},
    { value: "CONGE_MALADIE" ,label:"CONGÉ MALADIE"},
    { value: "CONGE_MATERNITE" ,label:"CONGÉ MATERNITÉ"},
    { value: "CONGE_CREATION_D-ENTREPRISE" ,label:"CONGÉ CRÉATION D’ENTREPRISE"},
    { value: "CONGE_POUR_CATASTROPHE_NATURELLE" ,label:"CONGÉ POUR CATASTROPHE NATURELLE"}
    
];

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
        alert("Email has been send");
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

  // logout function  
  const logout = () => {
    Axios.post('http://localhost:3001/logout').then((response)=> {
      window.localStorage.clear()
      window.location.href = '/'
    })
  }
  return ( 
    <div class="container">
    <div class="title">Registration</div>
    <div class="content">
      <form ref={form} onSubmit={sendEmail}>
      <h1>Formulaire de congé</h1>
        <div class="user-details">
        
        

        {EmailData.map(auth => (
                       <>
                       <div class="input-box">    
        <span class="details">User: </span>
        <input type="text"  value={auth.username} style={{background: "#ccc"}} onFocus={(e) => { SetUser(e.target.value); }} autoFocus ></input>
        </div>  
        <div class="input-box">   
        <span class="details">Email: </span>
        <input type="email"  value={auth.Email} style={{background: "#ccc"}} onFocus={(e) => { setEmailReg(e.target.value); }} autoFocus name="Hello"></input>
        </div>
        <div hidden={true} key={auth.id}>
        <label>Name: </label>
        <input type="text"  value={auth.Name}  onFocus={(e) => { setNameReg(e.target.value); }}  autoFocus  name="EName" hidden={true} ></input>
        <label>Surname: </label>
        <input type="text"  value={auth.SurName} onFocus={(e) => { setSurnameReg(e.target.value); }} autoFocus name="SName" hidden={true} ></input>
        </div></>
                  ))}
        
        
        <br />
        <div class="input-box">
            <span class="details">Type Conges:</span>
            <Select options={TypeConges}  onChange={Conge}   isSearchable={false}  name="typeC" ></Select>  
          </div>
        
        <div class="button">
        <input onClick={fetchData}  value="Confirm"> 
        </input></div><br /> 

       
        {
         
        showhide===SelectReg && (
        
          <>
          <div>
              
            </div>
            {Data.length > 0 && (
                <div>
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
     {/* <button onClick={logout}>logout</button> */}
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
                      <textarea  onFocus={(e) => { setTextAreaReg(e.target.value); } } name="STE" id="text" key={conges.id} defaultValue={SelectReg.value} autoFocus>{conges.EmailCON}</textarea>
                      <div class="button">
                      <button type="submit"  onClick={submitRev}  id="button" > Submit </button>
                      </div></>
                  ))}
                </div>
              )}
              
            <div>
                <br/>
              </div>
              </>
          )
      }
      </div>
      </form>
      </div>
    </div>
  );
}