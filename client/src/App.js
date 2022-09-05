import React from "react";
import {  Route, Switch, BrowserRouter } 
        from 'react-router-dom'
import "./App.css";
import Registration from "./User/Register/Registration";
import Update from "./User/UpdateProfile/Update";
import UpdateRequest from "./User/UpdateRequest/UpdateRequest";
import Form from "./User/Form/Form";
import Login from "./User/Login/Login";
import ADLogin from "./Admin/component/LoginAdmin/ADLogin"
import ListCong from "./Admin/component/HomeAdmin/ListCong"
import PageNotFound from './Error/PageNotFound';
import Home from './User/Dashbored/Dash';
import CheckConge from './User/Dashbored/Check';
import ResetPaasword from './User/ForgetPassword/ForgetPassword';
import Verify from './User/ForgetPassword/Verify';

import Finish from './User/ForgetPassword/Finish';



function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/registration' component={Registration} />
      <Route exact path='/Update' component={Update} />
      <Route exact path='/Form' component={Form} />
      <Route exact path='/Admin' component={ADLogin} />
      <Route exact path='/Admin/ListCong' component={ListCong} />
      <Route exact path='/Home' component={Home} />
      <Route exact path='/ResetPassword' component={ResetPaasword} />
      <Route exact path='/Verify' component={Verify} />

      <Route exact path='/Finish' component={Finish} /> 
      <Route exact path='/CheckConge' component={CheckConge} /> 
      <Route exact path='/UpdateRequest/:id' component={UpdateRequest} /> 
      <Route exact path='/' component={Login} /> 
      <Route path="*" component={PageNotFound} />
    </Switch>
  </BrowserRouter>
  )
}

export default App;
