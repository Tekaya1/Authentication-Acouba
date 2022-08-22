import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Registration from "./User/Register/Registration";
import Form from "./User/Form/Form";
import Login from "./User/Login/Login";
import ADLogin from "./Admin/component/LoginAdmin/ADLogin"
import Home from "./Admin/component/HomeAdmin/Home"
import ListCong from "./Admin/component/HomeAdmin/ListCong"




function App() {
  return (
    <Router>
      <Route path="/registration" exact render={(props) => <Registration />} />
      <Route path="/Form" exact render={(props) => <Form />} />
      <Route path="/Admin/ADLogin" exact render={(props) => <ADLogin />} />
      <Route path="/Admin/ListCong" exact render={(props) => <ListCong />} />
      <Route path="/Admin/Home" exact render={(props) => <Home />} />
      <Route path="/" exact render={(props) => <Login />} />
    </Router>
  )
}

export default App;
