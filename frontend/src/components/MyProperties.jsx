import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function MyProperties() {
  const navigate = useNavigate();
  const [myprop, Setmyprop] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/myproperties", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Setmyprop(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if(myprop.length>=1){
    return (
      <div className="allproperties myproperties flex">
        {myprop.map((p) => (
          <div className="singleproperty flex">
            <div className="singpropimg">
              {p.pimages.map((image, index) => (
                <img
                  key={`${p.pid}-${index}`}
                  src={`http://localhost:3000/uploads/${image}`}
                  alt={`Image ${index}`}
                  onClick={() => {
                    navigate(`/property/${p.pid}`);
                  }}
                />
              ))}
            </div>
            <div className="singpropdesc flex">
              <p>Id-{p.pid}</p>
              <p>
                {p.ptype} for {p.purpose} in {p.plocation}.
              </p>
              <i
                style={{ cursor: "pointer", fontSize: "1rem" }}
                class="fa-solid fa-pen-to-square"
                onClick={() => {
                  navigate(`/edit/${p.pid}`);
                }}
              ></i>
              <i
                style={{ cursor: "pointer", fontSize: "1rem", marginInline: 20 }}
                class="fa-solid fa-trash"
                onClick={() => {
                  fetch(`http://localhost:3000/del/${p.pid}`,{
                    method:"DELETE",
                    headers:{
                      "content-type":"application/json",
                      authorization:"bearer "+localStorage.getItem("token")
                    }
                  }).then((res) => res.json())
                  .then((data) => {
                    Setmyprop(data);
                    window.location="/myproperties"
                  })
                  .catch((error) => {
                    console.error("Error fetching data:", error);
                  });
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    );
  }
  else{
  return (
    <div className="addpropmain flex">
        <div className="addpropcont" style={{maxWidth:"300px"}}>
          <h1 style={{color:"lightGreen",letterSpacing:".1rem",wordSpacing:".3rem"}}>No Properties Found!</h1>
        </div>
      </div>
  )};
}
export default MyProperties;
