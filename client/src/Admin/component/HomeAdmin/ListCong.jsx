import React, { useState } from "react";

import Axios from "axios";
import './home.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Home from "./Home";
import swal from 'sweetalert';

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
      swal({
        title: "Are you sure?",
        text: "Accept This Request",
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Request Has Been Approved", {
            icon: "success",
          });
        } else {
          swal("Action has been Canceled", {
            icon: "error",
          })
        }
      });
    }

    const SetStatusDeclined = (id) => {
      swal({
        title: "Are you sure?",
        text: "Decline This Request",
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          Axios.put("http://localhost:3001/Admin/StatusDeclined",{
            id: id
          }).then((response) =>{
            console.log(response);
          })
          swal("Request Has Been Declined", {
            icon: "success",
          });
        } else {
          swal("Action has been Canceled", {
            icon: "error",
          })
        }
      });
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
        <tr>  <th>Action</th>
              <th>username</th>
              <th>TypeConge</th>
              <th>RequestesS</th>
              <th>StartDate</th>
               <th>EndDate</th>
               <th>Status</th>

        </tr>
      </thead>
      <tbody>

      {ListData.map(congerequest => (
                        <tr key={congerequest.id}>
                                                  <td><Button variant="danger" onClick={()=> {SetStatusDeclined(congerequest.id)}}>Declined</Button><Button variant="success" onClick={()=> {SetStatusApproved(congerequest.id)}}>Accept</Button></td>
                        <td>{congerequest.username}</td>
                        <td>{congerequest.TypeConge}</td>
                        <td>{congerequest.Requests}</td>
                        <td>{congerequest.StartDate}</td>
                        <td>{congerequest.EndDate}</td>
                        <td>{congerequest.Status}</td>
                        </tr>
                    ))}

      </tbody>
    </Table>
            </>
        )




}