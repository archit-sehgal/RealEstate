import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function Usersignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const navigate = useNavigate();
  return (
    <div className="addpropcont flex">
      <div className="addproperty flex">
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Create a username"
          type="text"
          placeholder="Create here"
          name="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Create a strong password"
          type="password"
          placeholder="Create here"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Enter your Phone Number"
          type="Number"
          placeholder="Enter here"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Enter your email id"
          variant="outlined"
          type="email"
          placeholder="Enter here"
          name="userEmail"
          value={userEmail}
          onChange={(e) => setuserEmail(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={() => {
            fetch("http://localhost:3000/signup", {
              method: "POST",
              body: JSON.stringify({
                username: username,
                password: password,
                phoneNumber: phoneNumber,
                userEmail: userEmail,
              }),
              headers: {
                "content-type": "application/json",
              },
            }).then((res) => {
              res.json().then((data) => {
                if (data.token) {
                  alert("user signed up!");
                  navigate("/")
                } else {
                  alert("error signing up");
                  navigate("/")
                }
              });
            });
          }}
        >
          signup
        </Button>
      </div>
    </div>
  );
}

export default Usersignup;
