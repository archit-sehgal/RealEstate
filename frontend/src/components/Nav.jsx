import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  useEffect(() => {
    setKey(localStorage.getItem("token"));
  });
  setInterval(() => {
    setKey(localStorage.getItem("token"));
  }, 1000);
  if(!key){
  return (
    <div className="nav flex">
      <Link className="links" to={"/"}><i class="fa-solid fa-house"></i></Link>
      <Link className="links" to={"/signup"}>Signup</Link>
      <Link className="links" to={"/login"}>Login</Link>
      <Link className="links" to={"/properties"}>Explore</Link>
      <Link className="links" to={"/listproperty"}>Post Your Property</Link>
    </div>
  );}
  else{
    return (
      <div className="nav flex">
        <Link className="links" to={"/properties"}>Explore</Link>
        <Link className="links" to={"/listproperty"}>Post Your Property</Link>
        <Link className="links" onClick={()=>{
          localStorage.removeItem("token");
          window.location="/listproperty"
        }}>Logout</Link>
      </div>
    );
  }
}

export default Nav;
