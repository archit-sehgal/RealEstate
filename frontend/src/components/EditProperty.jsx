import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
function EditProperty() {
  const [purpose, setpurpose] = useState("");
  const [ptype, setptype] = useState("");
  const [pdesc, setpdesc] = useState("");
  const [pprice, setpprice] = useState("");
  const [plocation, setplocation] = useState("");
  const [pimages, setpimages] = useState([]);
  const navigate = useNavigate();
  const { pid } = useParams();
  const [property, setProperty] = useState({});

  //handlesubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("pimages:", pimages);
    const formData = new FormData();
    formData.append("purpose", purpose);
    formData.append("ptype", ptype);
    formData.append("pdesc", pdesc);
    formData.append("pprice", pprice);
    formData.append("plocation", plocation);

    const imagesArray = Array.from(pimages);

    imagesArray.forEach((image, index) => {
      formData.append("pimages", image);
    });

    fetch(`http://localhost:3000/edit/${pid}`, {
      method: "POST",
      body: formData,
      headers: {
        authorization: "bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        navigate("/myproperties");
      });
    });
  };
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
  }, [pid]);
  return (
    <div className="flex editpropertiespage">
      <div className="singleproperty flex">
        {Object.keys(property).length > 0 ? (
          <>
            <div className="singpropimg">
              {property.pimages.map((image, index) => (
                <img
                  key={`${property.pid}-${index}`}
                  src={`http://localhost:3000/uploads/${image}`}
                  alt={`Image ${index}`}
                  onClick={() => {
                    navigate(`/property/${property.pid}`);
                  }}
                />
              ))}
            </div>
            <div className="singpropdesc flex">
              <p>Id-{property.pid}</p>
              <p>
                {property.ptype} for {property.purpose} in {property.plocation}.
              </p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="flex addpropcont">
        <form onSubmit={handleSubmit} className="addproperty flex">
          <label>
            Purpose:
            <select
              required
              value={purpose}
              onChange={(e) => setpurpose(e.target.value)}
            >
              <option value="">Select Purpose</option>
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
            </select>
          </label>
          <label>
            Property Type:
            <select
              required
              value={ptype}
              onChange={(e) => setptype(e.target.value)}
            >
              <option value="">Select Property Type</option>
              <option value="House">House</option>
              <option value="Land">Land</option>
              <option value="Factory">Factory</option>
              <option value="Shop">Shop</option>
              <option value="Showroom">Showroom</option>
              <option value="Industry">Industry</option>
              <option value="Hotel">Hotel</option>
            </select>
          </label>
          <TextField
            id="outlined-basic"
            label="Enter Property Description"
            variant="outlined"
            type="text"
            placeholder="Enter here"
            name="pdesc"
            value={pdesc}
            onChange={(e) => setpdesc(e.target.value)}
            required
          />
          <TextField
            id="outlined-basic"
            label="Enter expected price"
            variant="outlined"
            type="number"
            placeholder="Enter here"
            name="pprice"
            value={pprice}
            onChange={(e) => setpprice(e.target.value)}
            required
          />
          <TextField
            id="outlined-basic"
            label="Enter property location"
            variant="outlined"
            type="text"
            placeholder="Enter here"
            name="plocation"
            value={plocation}
            onChange={(e) => setplocation(e.target.value)}
            required
          />
          <input
            type="file"
            name="images"
            onChange={(e) => setpimages(e.target.files ?? [])}
            required
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProperty;
