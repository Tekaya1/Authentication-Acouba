import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from "./Navbar.style";
import Axios from "axios";
import swal from 'sweetalert';
export default function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
   // fetching email with users 
   const [EmailData, setEmailData] = useState([]);
   const [EmailReg, setEmailReg] = useState("");
   
   const fetchEmail= () => {
     Axios.post('http://localhost:3001/EmailFetch', {
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



  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/Navbar">Home</NavbarLink>
            <NavbarLink to="/Form">Request Conge</NavbarLink>
            <NavbarLink to="/contact">Check Conge</NavbarLink>
            <NavbarLink to="/">Logout</NavbarLink>
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
        {EmailData.map(auth => (
                 <>   
                    <NavbarLink> Hello, {auth.username} </NavbarLink><img src={process.env.PUBLIC_URL + `/upload/${auth.image}`} /></>
                       ))} 
        </RightContainer>
 
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/products"> Products</NavbarLinkExtended>
          <NavbarLinkExtended to="/contact"> Contact Us</NavbarLinkExtended>
          <NavbarLinkExtended to="/about"> About Us</NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}