import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import Form from "./pages/Form";
import Login from "./pages/Login";

function App() {
  return (
    
    
    
    <Router>
      
      <Route path="/registration" exact render={(props) => <Registration />} />
      <Route path="/Form" exact render={(props) => <Form />} />
      <Route path="/" exact render={(props) => <Login />} />
    </Router>
  )
}

export default App;
