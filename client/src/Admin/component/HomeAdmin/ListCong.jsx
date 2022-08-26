import React, { useState } from "react";

import Axios from "axios";
import './home.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Home from "./Home";

export default function ListConges() {


  const [ListData, setListData] = useState([]);
  const fetchList= () => {
    Axios.post('http://localhost:3001/Admin/List', {
    })
    .then((response) => {
      return response.data
    })
    .then(data => {
        setListData(data)
      
    })
  }

  //tracking function fetchemail
  useState(() => {
    fetchList()
  }, [])

    const SetStatusApproved = (id) => {
      Axios.put("http://localhost:3001/Admin/StatusApproved",{
        id: id
      }).then((response) =>{
        console.log(response);
      })
    }

    const SetStatusDeclined = (id) => {
      Axios.put("http://localhost:3001/Admin/StatusDeclined",{
        id: id
      }).then((response) =>{
        console.log(response);
      })
    }


        return (
            <>
            {/* <section className="home-section" >
                <h1>Hello</h1>

                <table border={2} style={{marginleft: "auto",
  marginright: "auto"}}>
                    <thead>
                    <tr>
                        <th>username</th>
                        <th>TypeConge</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    
                    {ListData.map(congerequest => (
                        <tr key={congerequest.id}>
                        <td>{congerequest.username}</td>
                        <td>{congerequest.TypeConge}</td>
                        <td>{congerequest.Requests}</td>
                        <td>{congerequest.StartDate}</td>
                        <td>{congerequest.EndDate}</td>
                        <td>{congerequest.Status}</td>
                        <td><a href="#popup1"><button className="button-30" href="#popup1" onClick={() => {SetStatusDeclined(congerequest.id)}}>Reject</button></a><button className="button-30" onClick={()=> {SetStatusApproved(congerequest.id)}}>Accept</button></td>

                        </tr>
                    ))}
                    </thead>
                    

                </table>
            </section>
           */}
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
              <th>username</th>
              <th>TypeConge</th>
              <th>RequestesS</th>
              <th>StartDate</th>
               <th>EndDate</th>
               <th>Status</th>
              <th>Action</th>
        </tr>
      </thead>
      <tbody>
        
      {ListData.map(congerequest => (
                        <tr key={congerequest.id}>
                        <td>{congerequest.username}</td>
                        <td>{congerequest.TypeConge}</td>
                        <td>{congerequest.Requests}</td>
                        <td>{congerequest.StartDate}</td>
                        <td>{congerequest.EndDate}</td>
                        <td>{congerequest.Status}</td>
                        <td><Button variant="danger" onClick={()=> {SetStatusDeclined(congerequest.id)}}>Danger</Button><Button variant="success" onClick={()=> {SetStatusApproved(congerequest.id)}}>Accept</Button></td>
                        </tr>
                    ))}

      </tbody>
    </Table>
            </> 
        )




}