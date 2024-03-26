import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
function Queries() {
  const [queries, setQueries] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/queries", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        setQueries(data);
      });
    });
  });
  return (
    <div style={{ marginTop: 50, padding: 10 }}>
      <h1>Queries</h1>
      {queries.map((query) => (
        <div 
          className="querycont flex"
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <a><b>Name:</b> {query.contactPersonName}</a>
            <i
              style={{ cursor: "pointer", color: "#1976D2" }}
              class="fa-solid fa-trash"
              onClick={() => {
                fetch(`http://localhost:3000/delquery/${query.pid}`,{
                  method:"DELETE",
                  headers:{
                    "content-type":"application/json",
                    authorization:"bearer "+localStorage.getItem("token"),
                  },
                }).then((res)=>{
                  res.json().then((data)=>{
                    setQueries(data);
                    window.location="/queries"
                  })
                })
              }}
            ></i>
          </p>
          <p><b>Phn.No:</b> {query.contactPersonNumber}</p>
          <p><b>Message:</b> {query.contactPersonMessage}</p>
          <p style={{ display: "flex", gap: 20, margin: "10px 0px" }}>
            <Button variant="contained" style={{ marginLeft: "10px" }}>
              <a
                style={{ cursor: "pointer", color: "whitesmoke" }}
                onClick={() => {
                  navigate(`/property/${query.pid}`);
                }}
              >
                View Property
              </a>
            </Button>
            <Button variant="contained">
              <a
                style={{ color: "whitesmoke", textDecoration: "none" }}
                href="tel:8882192787"
              >
                Contact
              </a>
            </Button>
          </p>
        </div>
      ))}
    </div>
  );
}
export default Queries;
