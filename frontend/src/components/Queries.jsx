import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
function Queries() {
  const [queries, setQueries] = useState([]);
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // If token is not available, redirect to login
        navigate("/login");
        return;
      }

      setKey(token);

      try {
        const response = await fetch("http://localhost:3000/queries", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "bearer " + token,
          },
        });
        const data = await response.json();
        setQueries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(() => {
      setKey(localStorage.getItem("token"));
      fetchData();
    }, 2000);
    return () => clearInterval(interval);
  }, [navigate]);

  if (key) {
    return (
      <div style={{ marginTop: 50, padding: 10 }} className="queriesmain">
        <h1>Queries</h1>
        {queries.map((query) => (
          <div className="querycont flex">
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <a>
                <b>Name:</b> {query.contactPersonName}
              </a>
              <i
                style={{ cursor: "pointer", color: "#1976D2" }}
                class="fa-solid fa-trash"
                onClick={() => {
                  fetch(`http://localhost:3000/delquery/${query.pid}`, {
                    method: "DELETE",
                    headers: {
                      "content-type": "application/json",
                      authorization: "bearer " + localStorage.getItem("token"),
                    },
                  }).then((res) => {
                    res.json().then((data) => {
                      setQueries(data);
                      window.location = "/queries";
                    });
                  });
                }}
              ></i>
            </p>
            <p>
              <b>Phn.No:</b> {query.contactPersonNumber}
            </p>
            <p>
              <b>Message:</b> {query.contactPersonMessage}
            </p>
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
  } else {
    return (
      <div className="addpropmain flex">
        <div className="addpropcont">
          <h1>Kindly login first!!!</h1>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
        </div>
      </div>
    );
  }
}
export default Queries;
