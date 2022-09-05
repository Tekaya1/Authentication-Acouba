import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  OpenLinksButton,
  NavbarLinkExtended,
} from "./Navbar.style";
import Axios from "axios";
import swal from 'sweetalert';


export default function Home() {
  const [extendNavbar, setExtendNavbar] = useState(false);
   // fetching email with users 
   const [EmailData, setEmailData] = useState([]);
   const fetchEmail= () => {
     Axios.post('http://localhost:3001/EmailFetch', {
     })
     .then((response) => {
      if(response.data.length===0) {
        swal({
          title: "Error",
          text: "You Are Not Connected",
          icon: "error",
          button: 'Ok',
        }).then(function() {
          window.location = "/";
      });    
       } else {
        return response.data
       }
     })
     .then(data => {
       setEmailData(data)
     })
   }
 
   //tracking function fetchemail
   useState(() => {
     fetchEmail()
   }, [])

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
  
  const GetCode = (code) => {
    swal({
      title: "Save This Reset Code Please!",
      text: code,
      icon: "warning",
      button: 'Ok',
  }).then(function() {
    window.location = "/Home";
});  
}
  useState(() => {
    if(localStorage.getItem("token")==null) {
      window.location.href = "/"
    }
  }, [])


  return (
    <NavbarContainer extendNavbar={extendNavbar}>
       {EmailData.map(auth => (
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/Navbar">Home</NavbarLink>
            <NavbarLink to="/Form">Request Conge</NavbarLink>
            <NavbarLink to="/CheckConge">Check Conge</NavbarLink>
            <NavbarLink to="/Update">Update Profile</NavbarLink>
            <NavbarLink><a onClick={logout}>Logout</a></NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
       
                 <>   
                   <NavbarLink id="hello">Hello, {auth.Name}</NavbarLink><img src={process.env.PUBLIC_URL + `/upload/${auth.image}`} /></>
                       
        </RightContainer>
 
      </NavbarInnerContainer>
      ))} 
      {extendNavbar && EmailData.map(auth => (
        <NavbarExtendedContainer>
          <NavbarLinkExtended readOnly disabled>Hello, {auth.Name}</NavbarLinkExtended>
          <NavbarLinkExtended to="/Home">Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/Form"> Request Conge</NavbarLinkExtended>
          <NavbarLinkExtended to="/CheckConge"> Check Conge</NavbarLinkExtended>
          <NavbarLinkExtended to="/Update">Update Profile</NavbarLinkExtended>
          <NavbarLinkExtended><a onClick={logout}>Logout</a></NavbarLinkExtended>
        </NavbarExtendedContainer>
      ))}
      
    </NavbarContainer>
  );
}