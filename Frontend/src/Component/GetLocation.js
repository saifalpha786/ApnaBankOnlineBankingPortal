import axios from 'axios';
import { useState, useEffect } from 'react';
import { WeatherViewer } from './WeatherViewer';



export const GetLocation = () =>{

    const [cityData, setCityData] = useState(null);

  useEffect(() => {
    // Fetch the user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityByCoordinates(latitude, longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchCityByCoordinates = (latitude, longitude) => {
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=TpIsreAxt2SYfzbApugrzeGCJIpCoAlj&q=${latitude},${longitude}`
      )
      .then((res) => {
        setCityData(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="wrapper">
      {cityData && (
        <div>
          <WeatherViewer cityData={cityData} />
        </div>
      )}
    </div>
  );


}