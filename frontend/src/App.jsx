import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Properties from "./components/Properties";
import Userlogin from "./components/Userlogin";
import Usersignup from "./components/Usersignup";
import Addproperty from "./components/AddProperty";
import Nav from "./components/Nav";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="flex">
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/properties" element={<Properties />}></Route>
          <Route path="/signup" element={<Usersignup />}></Route>
          <Route path="/login" element={<Userlogin />}></Route>
          <Route path="/listproperty" element={<Addproperty />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
