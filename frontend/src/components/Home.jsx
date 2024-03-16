import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate=useNavigate();

  return (
    <div className="homecomp flex">
      <div className="homeheader flex">
        <h1>RealEstate WebApp</h1>
        <span >Buy, Sell, Rent Properties</span>
        <Button style={{margin:"10px 0"}} variant="contained" onClick={()=>{
          navigate("/signup")
        }}>signup to explore properties</Button>
        <p style={{marginTop:"10px"}}>Already a user?<Button onClick={()=>{
          navigate("/login")
        }} style={{marginInline:"10px",fontSize:".7rem"}} variant="contained">Login</Button></p>
        <p style={{marginTop:"10px"}}>View as guest!<Button onClick={()=>{
          navigate("/properties")
        }} style={{marginInline:"10px",fontSize:".7rem"}} variant="contained">view</Button></p>
      </div>
    </div>
  );
}
export default Home;
