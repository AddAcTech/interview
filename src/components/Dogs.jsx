import { useState, useEffect } from "react";
function Dogs() {
  const [dogs, setDogs] = useState("");
  const [dogArray, setDogArray] = useState("");
  // const [dogsId, setDogsId] = useState(null);

  //First dog fetch WORKING
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/search",
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const newData = await response.json();
        setDogs(newData);
        //setDogsId(newData.resultIds);
        console.log("Fetched object");
        console.log(dogs ? dogs.resultIds : "error with dogs array");
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    //Funcition for object response
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
      const dogObject = await responseDog.json();
      setDogArray(dogObject);
      console.log(dogObject);
    };
    getDog();
  }, [dogs]);

  return (
    <div>
      {dogArray.map((singleDog) => (
        <div key={singleDog.id}>
          <img src={singleDog.img} alt="" />
          <p>Name: {singleDog.name}</p>
          <p>Age: {singleDog.age}</p>
          <p>Breed: {singleDog.breed}</p>
          <p>Zip code: {singleDog.zip_code}</p>
        </div>
      ))}
    </div>
  );
}

export default Dogs;
