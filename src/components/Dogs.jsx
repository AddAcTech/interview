import React, { useState, useEffect } from "react";
function Dogs() {
  const [dogs, setDogs] = useState(null);
  const [dogsId, setDogsId] = useState(null);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/search",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const newData = await response.json();
        setDogs(newData);
        setDogsId(newData.resultIds);
        console.log("Fetched object");
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getDog = async () => {
    const responseDog = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dogs.resultIds),
      }
    );
  };
  getDog();
  /* if (dogs) {
    return (
      <div>
        {<p>{dogs.resultIds}</p>}
      </div>
    );
  } else {
    return null;
  } */
}

export default Dogs;
