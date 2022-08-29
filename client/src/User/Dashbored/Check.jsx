import React, { useState } from "react";
import Axios from "axios";
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';

export default function CheckConge() {
  const [ListData, setListData] = useState([]);
  const fetchListUSer= () => {
    Axios.post('http://localhost:3001/ListConge', {
    })
    .then((response) => {
     if(response.data.length==0) {
      swal({
        title: "Error",
        text: "No Conges Has been Saved",
        icon: "error",
        button: 'Ok',
      }).then(function() {
        window.location = "/Home";
    });    
     } else {
      return response.data
     }
      
    })
    .then(data => {
        setListData(data)

    })
  }

  //tracking function fetchemail
  useState(() => {
    fetchListUSer()
  }, [])
  
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

    const DeleteCong = (id) => {
      Axios.delete("http://localhost:3001/DELETE",{
            id:id
          }).then((response) =>{
            console.log(response);
          })
      // swal({
      //   title: "Are you sure?",
      //   text: "Decline This Request",
      //   icon: "info",
      //   buttons: true,
      //   dangerMode: true,
      // })
      // .then((willDelete) => {
      //   if (willDelete) {
          
      //     swal("Request Has Been Declined", {
      //       icon: "success",
      //     });
      //   } else {
      //     swal("Action has been Canceled", {
      //       icon: "error",
      //     })
      //   }
      // });
    }

        return (
            <>
    
      <table class="table table-primary table-secondary table-bordered table-striped table-hover" >
      <thead class="table-borderless">
        
        <tr>  
              <th>Action</th>
              <th>username</th>
              <th>Name</th>
              <th>SurName</th>
              <th>TypeConge</th>
              <th>Requestes</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>Status</th>
              <th>Comment</th>
              <th>RequestTime</th>
                   

        </tr>
      </thead>
      <tbody class="table-borderless">
      {ListData.map(congerequest => (
        
        <><tr key={congerequest.id}>
          <td class="table-info table-hover"><Button variant="danger" onClick={() => {DeleteCong(congerequest.id);} }>Decline</Button></td>
          <td class="table-info table-hover">{congerequest.username}</td>
          <td class="table-info table-hover">{congerequest.Name}</td>
          <td class="table-info table-hover">{congerequest.SurName}</td>
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
        <button type="button"  class="btn btn-primary"  required id="ADLOG"><a href="/Home">Back</a></button>  
        <button type="button"  class="btn btn-primary"  required id="ADLOG" onClick={logout}>LogOut</button>
        
     
            </>
        )
}