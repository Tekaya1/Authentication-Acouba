import React, { useEffect, useState } from "react";
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
import Swal from 'sweetalert2'

export default function HomeAdmin() {
  const [extendNavbar, setExtendNavbar] = useState(false);
   // fetching email with users 
   const [EmailData, setEmailData] = useState([]);
   const fetchEmail= () => {
     Axios.post('http://localhost:3001/AdminEmailFetch', {
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
  
  useEffect(() => {
    Axios.get('http://localhost:3001/AdminVerif', {
        headers:
        {"x-access-token":localStorage.getItem('tokenAdmin')
    }}).then((response)=> {
          if(response.data.Status==true) {
            console.log("response")
          } else {
            localStorage.removeItem('tokenAdmin')
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


// useEffect(() => {
  

// }, [])



  return (
    <NavbarContainer extendNavbar={extendNavbar}>
       {EmailData.map(admin => (
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/Admin/HomeAdmin">Home</NavbarLink>
            <NavbarLink to="/Admin/ListCong">Check Requests</NavbarLink>
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
                   <NavbarLink id="hello">Hello, {admin.AdminName}</NavbarLink><img src={process.env.PUBLIC_URL + `/upload/${admin.image}`} /></>
                       
        </RightContainer>
 
      </NavbarInnerContainer>
      ))} 
      {extendNavbar && EmailData.map(admin => (
        <NavbarExtendedContainer>
          <NavbarLinkExtended readOnly disabled>Hello, {admin.AdminName}</NavbarLinkExtended>
          <NavbarLinkExtended to="/Home">Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/ListConges">Check Requests</NavbarLinkExtended>
          <NavbarLinkExtended to="/Update">Update Profile</NavbarLinkExtended>
          <NavbarLinkExtended><a onClick={logout}>Logout</a></NavbarLinkExtended>
        </NavbarExtendedContainer>
      ))}
      
    </NavbarContainer>
  );
}