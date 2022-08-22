import React, { useEffect, useReducer, useState } from "react";
import {useHistory} from 'react-router-dom'
import Axios from "axios";
import './home.css'
import Cookies from "js-cookie";
import swal from 'sweetalert';
import Home from "./Home"
import  "./Table.css"


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



        return (
            <><Home />
            <section class="home-section">
                <h1>Hello</h1>

                <table border={2} class="fl-table">
                    <thead>
                    <tr>
                        <th>username</th>
                        <th>Email</th>
                        <th>TypeConge</th>
                        <th>Requests</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Action</th>
                    </tr>
                    
                    {ListData.map(congerequest => (
                        <tr >
                        <td key={congerequest.id}>{congerequest.username}</td>
                        <td key={congerequest.id}>{congerequest.Email}</td>
                        <td key={congerequest.id}>{congerequest.TypeConge}</td>
                        <td key={congerequest.id}>{congerequest.Requests}</td>
                        <td key={congerequest.id}>{congerequest.StartDate}</td>
                        <td key={congerequest.id}>{congerequest.EndDate}</td>
                        <td><button class="button-30" >Reject</button><button class="button-30">Accept</button></td>

                        </tr>
                    ))}
                    </thead>
                </table>
            </section></>
          
        )




}