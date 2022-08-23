import React, { useEffect, useReducer, useState } from "react";
import {useHistory} from 'react-router-dom'
import Axios from "axios";
import './home.css'
import Cookies from "js-cookie";
import swal from 'sweetalert';
import Home from "./Home"
import  "./Table.css"



export default function ListConges() {
  const [Status, setstatus] = useState("")


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
      Axios.put("http://localhost:3001/Admin/Status",{
        id: id
      }).then((response) =>{
        console.log(response);
      })
    }


        return (
            <><Home />
            <section className="home-section">
                <h1>Hello</h1>

                <table border={2} className="fl-table">
                    <thead>
                    <tr>
                        <th>username</th>
                        <th>Email</th>
                        <th>TypeConge</th>
                        <th>Requests</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    
                    {ListData.map(congerequest => (
                      
                        <tr key={congerequest.id}>
                        <td>{congerequest.username}</td>
                        <td>{congerequest.Email}</td>
                        <td>{congerequest.TypeConge}</td>
                        <td>{congerequest.Requests}</td>
                        <td>{congerequest.StartDate}</td>
                        <td>{congerequest.EndDate}</td>
                        <td>{congerequest.Status}</td>
                        <td><button className="button-30" >Reject</button><button className="button-30" onClick={()=> {SetStatusApproved(congerequest.id)}}>Accept</button></td>

                        </tr>
                    ))}
                    </thead>
                </table>
            </section></>
          
        )




}