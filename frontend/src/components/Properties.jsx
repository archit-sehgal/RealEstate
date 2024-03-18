import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Properties() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
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
            {p.pimages.map((image, index) => (
              <img
                key={`${p.pid}-${index}`}
                src={`http://localhost:3000/uploads/${image}`}
                alt={`Image ${index}`}
               onClick={()=>{
                navigate(`/property/${p.pid}`)
               }}/>
            ))}
          </div>
          <div className="singpropdesc flex">
            <p>Id-{p.pid}</p>
            <p>
              {p.ptype} for {p.purpose} in {p.plocation}.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Properties;
