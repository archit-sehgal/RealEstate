import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Addproperty() {
  const [purpose, setpurpose] = useState("");
  const [ptype, setptype] = useState("");
  const [pdesc, setpdesc] = useState("");
  const [pprice, setpprice] = useState("");
  const [plocation, setplocation] = useState("");
  const [pimages, setpimages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/listproperty", {
      method: "POST",
      body: JSON.stringify({
        purpose: purpose,
        ptype: ptype,
        pdesc: pdesc,
        pprice: pprice,
        plocation: plocation,
        pimages: pimages,
      }),
      headers: {
        "content-type":"application/json",
        authorization:"bearer "+localStorage.getItem("token")
      },
    }).then((res)=>{
      res.json().then((data)=>{
        console.log(data);
        window.location="/properties"
      })
    })
  };
  if(localStorage.getItem("token")){
  return (
    <div className="flex addpropcont">
      <form onSubmit={handleSubmit} className="addproperty flex">
        <label>
          Purpose:
          <select value={purpose} onChange={(e) => setpurpose(e.target.value)}>
            <option value="">Select Purpose</option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
        </label>
        <label>
          Property Type:
          <select value={ptype} onChange={(e) => setptype(e.target.value)}>
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
        <TextField id="outlined-basic" label="Outlined" variant="outlined" 
          type="text"
          placeholder="Enter property description"
          name="pdesc"
          value={pdesc}
          onChange={(e) => setpdesc(e.target.value)}
        />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" 
          type="number"
          placeholder="Enter expected price"
          name="pprice"
          value={pprice}
          onChange={(e) => setpprice(e.target.value)}
        />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" 
          type="text"
          placeholder="Enter property location"
          name="plocation"
          value={plocation}
          onChange={(e) => setplocation(e.target.value)}
        />
        <TextField
          type="file"
          placeholder="Enter property location"
          name="plocation"
          multiple
          id="plocation"
          value={pimages}
          onChange={(e) => setpimages(e.target.value)}
        />
        <Button type="submit"variant="contained">Submit</Button>
      </form>
    </div>
  );}else{
    return(
      <div>
        <h1>Kindly login first!!!</h1>
      </div>
    )
  }
}
export default Addproperty;
