import React, { useState } from "react";
import Axios from "axios";
import Button from 'react-bootstrap/Button';
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
        input:"hello",
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          let CommentAD = prompt("Admin, Please enter your comment :");
          Axios.put("http://localhost:3001/Admin/StatusApproved",{
            id: id, 
            Comment:CommentAD
          }).then((response) =>{
            console.log(response);
          })
          swal("Request Has Been Approved", {            icon: "success",
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
          let CommentAD = prompt("Admin, Please enter your comment :");
          Axios.put("http://localhost:3001/Admin/StatusDeclined",{
            id: id,
            Comment:CommentAD
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
  
    useState(() => {
      if(localStorage.getItem("token")==null) {
        window.location.href = "/"
      }
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

        return (
            <>
    
      <table class="table table-primary table-secondary table-bordered table-striped table-hover" >
      <thead class="table-borderless">
        
        <tr>  <th class="table-borderless">Action</th>
              
              <th>username</th>
              <th>Name</th>
              <th>SurName</th>
              <th>TypeConge</th>
              <th>Requestes</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>Status</th>
              <th>Comment</th>
              <th>Time</th>      

        </tr>
      </thead>
      <tbody class="table-borderless">
      {ListData.map(congerequest => (
        
                        <><tr key={congerequest.id}>
          <td class="table-info"><Button variant="danger" onClick={() => { SetStatusDeclined(congerequest.id); } }>Decline</Button><Button variant="success" onClick={() => { SetStatusApproved(congerequest.id); } }>Accept</Button></td>
          <td class="table-info table-hover">{congerequest.username}</td>
          <td class="table-info table-hover">Name</td>
          <td class="table-info table-hover">SurName</td>
          <td class="table-info table-hover">{congerequest.TypeConge}</td>
          <td class="table-info table-hover">{congerequest.Requests}</td>
          <td class="table-info table-hover">{congerequest.StartDate}</td>
          <td class="table-info table-hover">{congerequest.EndDate}</td>
          <td class="table-danger">{congerequest.Status}</td>
          <td class="table-info">{congerequest.Comment}</td>
          <td class="table-info">{congerequest.RequestTime}</td>
        </tr>
          </>
                    ))}
                    
      </tbody>
    </table>   
                        
     <button type="button"  class="btn btn-primary" placeholder="Enter your Email" required id="ADLOG" onClick={logout}>LogOut</button>
     
            </>
        )
}