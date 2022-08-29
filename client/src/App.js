import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import {  Route, Switch, BrowserRouter } 
        from 'react-router-dom'
import "./App.css";
import Registration from "./User/Register/Registration";
import Form from "./User/Form/Form";
import Login from "./User/Login/Login";
import ADLogin from "./Admin/component/LoginAdmin/ADLogin"
import ListCong from "./Admin/component/HomeAdmin/ListCong"
import PageNotFound from './Error/PageNotFound';
import Home from './User/Dashbored/Dash';
import CheckConge from './User/Dashbored/Check';
import ResetPaasword from './User/ForgetPassword/ForgetPassword';



function App() {
  return (
    // <Router>
    //   <Route path="/registration" exact render={(props) => <Registration />} />
    //   <Route path="/Form" exact render={(props) => <Form />} />
    //   <Route path="/Admin/ADLogin" exact render={(props) => <ADLogin />} />
    //   <Route path="/Admin/ListCong" exact render={(props) => <ListCong />} />
    //   <Route path="/Admin/Home" exact render={(props) => <Home />} />
    //   <Route path="/" exact render={(props) => <Login />} />
    //   <Route path="*" exact render={(props) => <PageNotFound />} />
     
    // </Router>

    <BrowserRouter>
    <Switch>
      <Route exact path='/registration' component={Registration} />
      <Route exact path='/Form' component={Form} />
      <Route exact path='/Admin' component={ADLogin} />
      <Route exact path='/Admin/ListCong' component={ListCong} />
      <Route exact path='/Home' component={Home} />
      <Route exact path='/ResetPaasword' component={ResetPaasword} />
      <Route exact path='/CheckConge' component={CheckConge} /> 
      <Route exact path='/' component={Login} /> 
      <Route path="*" component={PageNotFound} />
    </Switch>
  </BrowserRouter>
  )
}

export default App;
