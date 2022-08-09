import React, {  useState ,useRef,useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from '@emailjs/browser';
import logo from './acoba.png';
let UserN = sessionStorage.getItem('emailid')


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

  



  const [showhide,setshowhide] = useState('');
  const showhandler = (e) =>{
    const getuser = e.value;
    setshowhide(getuser);
  }


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


  useState(() => {
    fetchData()
  }, [])



  const Conge = e => {
    setSelectReg(e.value);
    showhandler(e);
  };



  
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


  const [EmailData, setEmailData] = useState([]);
  const fetchEmail= () => {
    Axios.post('http://localhost:3001/EmailFetch', {
      User:UserN
    })
    .then((response) => {
      return response.data
    })
    .then(data => {
      setEmailData(data)
      // alert("Data fetched")
    })
  }


  useState(() => {
    fetchEmail()
  }, [])



 
  

  return ( 
   <div className="App">
      <div className="Form">
      <form ref={form} onSubmit={sendEmail}>
        <h1>Formulaire de congé</h1>
        

        {EmailData.map(auth => (
                       <>
                       
        <label>User: </label><br />
        <input type="text"  value={UserN} style={{background: "#ccc"}} onFocus={(e) => { SetUser(e.target.value); }} autoFocus ></input><br />
        <label>Email: </label><br />
        <input type="email"  value={auth.Email} style={{background: "#ccc"}} onFocus={(e) => { setEmailReg(e.target.value); }} autoFocus key={auth.id} name="Hello"></input>
        <div hidden={true}>
        <label>Name: </label>
        <input type="text"  value={auth.Name}  onFocus={(e) => { setNameReg(e.target.value); }}  autoFocus key={auth.id} name="EName" hidden={true}></input>
        <label>Surname: </label>
        <input type="text"  value={auth.SurName} onFocus={(e) => { setSurnameReg(e.target.value); }} autoFocus key={auth.id} name="SName" hidden={true}></input>
        </div></>
                  ))}
        
        
        <br />
        <label>Type De Conge: </label>
        <Select options={TypeConges}  onChange={Conge}   isSearchable={false}  name="typeC" ></Select>  
      
        <button onClick={fetchData} style={{top: "65%"}}> Confirm
        </button><br /> 

       
        {
         
        showhide===SelectReg && (
        
          <>
          <div>
              
            </div>
            {Data.length > 0 && (
                <div>
                  <label>Start: </label>
                  <DatePicker
       selected={StartDateReg}
       selectsStart
       startDate={StartDateReg}
       endDate={EndDateReg}
       onChange={date => setStartDateReg(date)} name="STD"/>
     <label>End: </label>
     <DatePicker
       selected={EndDateReg}
       selectsEnd
       startDate={StartDateReg}
       endDate={EndDateReg}
       minDate={StartDateReg}
       onChange={date => setEndDateReg(date)}
     name="END"/>

                  {Data.map(conges => (
                       <>
                      <textarea  onFocus={(e) => { setTextAreaReg(e.target.value); } } name="STE" id="text" key={conges.id} defaultValue={SelectReg.value} autoFocus>{conges.EmailCON}</textarea>
                      <button type="submit"  onClick={submitRev}  id="button" > Submit </button></>
                  ))}
                </div>
              )}
              
            <div>
                <br/>
              </div>
              </>
          )
      }
      
      </form>
      </div>
    </div>
  );
}