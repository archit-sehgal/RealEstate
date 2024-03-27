import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
function Userlogin() {
  return <Login />;
}

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  return (
    <div className="loginback flex">
      <div className="addpropcont flex" style={{backgroundColor:" rgba(250, 250, 250, 0.5)",backdropFilter:" blur(5px)"}}>
        <div className="addproperty flex">
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Enter your username"
            type="text"
            placeholder="Enter here"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Enter your password"
            type="password"
            placeholder="Enter here"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              fetch("http://localhost:3000/login", {
                method: "POST",
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
                headers: {
                  "content-type": "application/json",
                },
              }).then((res) => {
                res.json().then((data) => {
                  if (data.token) {
                    localStorage.setItem("token", data.token);
                    alert("logged in");
                    navigate("/properties");
                  } else {
                    alert("error logging in");
                    navigate("/login");
                  }
                });
              });
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Userlogin;
