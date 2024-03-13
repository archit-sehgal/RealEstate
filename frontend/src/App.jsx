import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/properties", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {properties.map((p) => (
        <div>
          <p>id:{p.pid}</p>
          <p>owner:{p.userid}</p>
          <p>purpose:{p.purpose}</p>
          <p>type:{p.ptype}</p>
          <p>description:{p.pdesc}</p>
          <p>price:{p.pprice}</p>
          <p>location:{p.plocation}</p>
          <p>images:{p.pimages}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
