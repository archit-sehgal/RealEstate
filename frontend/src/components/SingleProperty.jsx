import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
function SingleProperty() {
  const { pid } = useParams();
  const[property,setProperty]=useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/property/${pid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="singlproppage flex">
      <div>
      {property ? (
        <>
          <div>{property.pid}</div>
          <div>{property.ptype}</div>
          <div>{property.purpose}</div>
          <div>{property.pdesc}</div>
          <div>{property.plocation}</div>
          <div>{property.pprice}</div>
          <div>{property.userid}</div>
          <div><img src={`http://localhost:3000/uploads/${property.pimages}`} alt="" /></div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
}

export default SingleProperty;
