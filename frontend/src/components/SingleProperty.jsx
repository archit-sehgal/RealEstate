import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

function SingleProperty() {
  const { pid } = useParams();
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();
  const [clickedbtn, setClickedbtn] = useState(false);
  const [contactPersonName, setcontactPersonName] = useState("");
  const [contactPersonNumber, setcontactPersonNumber] = useState("");
  const [contactPersonMessage, setcontactPersonMessage] = useState("");
  const[submit,setSubmit]=useState("Submit");

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
      {property ? (
        <div className="sp-img-desc flex">
          <Button
            className="sp-to-explore-btn"
            variant="contained"
            onClick={() => {
              navigate("/properties");
            }}
          >
            <i class="fa-solid fa-arrow-left"></i> Back
          </Button>
          <div className="sp-img">
            <img src={`http://localhost:3000/uploads/${property.pimages}`} />
          </div>
          <div className="sp-desc flex">
            <h1>
              <i>
                {property.ptype} for {property.purpose} in {property.plocation}
              </i>
            </h1>
            <h3>
              Price: <i class="fa-solid fa-indian-rupee-sign"></i>
              {property.pprice}
            </h3>
            <span>id: {property.pid}</span>
            <span>Description: {property.pdesc}</span>
            <p>
              Owner: <i>{property.userid}</i>
            </p>
            <Button
              variant="contained"
              onClick={() => {
                setClickedbtn(true);
              }}
            >
              CONTACT OWNER
            </Button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {clickedbtn && (
        <div className="contactdiv flex">
          <div className="contactform flex">
            <Button
              variant="contained"
              style={{ position: "absolute", left: 10, top: 10 }}
              onClick={() => {
                setClickedbtn(false);
              }}
            >
              <i style={{marginRight:5}} class="fa-solid fa-circle-xmark"></i>Back
            </Button>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Write your full name"
              type="text"
              placeholder="Enter here"
              name="contactPersonName"
              value={contactPersonName}
              onChange={(e) => {
                setcontactPersonName(e.target.value);
              }}
              required
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Enter your Phone Number"
              type="number"
              placeholder="Enter here"
              name="contactPersonNumber"
              value={contactPersonNumber}
              onChange={(e) => {
                setcontactPersonNumber(e.target.value);
              }}
              required
            />
            <TextField
              id="outlined-multiline-static"
              label="Write your message"
              name="contactPersonMessage"
              multiline
              rows={4}
              value={contactPersonMessage}
              onChange={(e) => {
                setcontactPersonMessage(e.target.value);
              }}
              required
            />
            <span>
              <Checkbox {...label} color="success" />
              you agree to share these details and be contacted by the owner of
              the property.
            </span>
            {submit === "Submit" ? (
  <Button
    variant="contained"
    onClick={() => {
      setSubmit(<i className="fa-solid fa-spinner formloading"></i>);
      setTimeout(() => {
        fetch("http://localhost:3000/sendqueries", {
          method: "POST",
          body: JSON.stringify({
            contactPersonName: contactPersonName,
            contactPersonNumber: contactPersonNumber,
            contactPersonMessage: contactPersonMessage,
            ownerid: property.userid,
            pid: property.pid
          }),
          headers: {
            "content-type": "application/json"
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setSubmit(<i className="fa-solid fa-square-check formsubmitted"></i>);
            window.location = `/property/${pid}`;
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert("an error occurred!")
            window.location = `/property/${pid}`;
          });
      }, 1000);
    }}
  >
    {submit}
  </Button>
) : (
  <p
    onClick={() => {
      setSubmit(<i className="fa-solid fa-spinner"></i>);
      setTimeout(() => {
        fetch("http://localhost:3000/sendqueries", {
          method: "POST",
          body: JSON.stringify({
            contactPersonName: contactPersonName,
            contactPersonNumber: contactPersonNumber,
            contactPersonMessage: contactPersonMessage,
            userid: property.userid,
            pid: property.pid
          }),
          headers: {
            "content-type": "application/json"
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setSubmit(<i className="fa-solid fa-square-check"></i>);
            window.location = `/property/${pid}`;
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            // Handle error, maybe show an error message to the user
          });
      }, 1000);
    }}
  >
    {submit}
  </p>
)}

            
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProperty;
