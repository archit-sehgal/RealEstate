import { useState, useEffect } from "react";

function Properties() {
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
    <div className="allproperties flex">
      {properties.map((p) => (
        <div className="singleproperty flex">
          <div className="singpropimg">
            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="!property photo!" />
          </div>
          <div className="singpropdesc flex">
            <p>Id-{p.pid}</p>
            <p>{p.ptype} for {p.purpose} in {p.plocation}.</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Properties;
