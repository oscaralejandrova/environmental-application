import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import axios from "axios";
import Loader from "./components/Loader";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoadding, setIsLoadding] = useState(true);

  const success = (info) => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const APIKEY = "106cf2081c5bc65ed96656049d50c1f5";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`;

      axios.get(url)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = ((9 / 5) * celsius + 32).toFixed(1);
          setTemp({
            celsius,
            fahrenheit,
          });
        })
        .catch((err) => console.log(err))
        .finally(()=>setIsLoadding(false))
    }
  }, [coords]);

  return (
    <div className="app">

      {
       isLoadding 
       ? <Loader /> 
       : (<WeatherCard 
       weather={weather} 
       temp={temp} />
       )
      }

    </div>
  );
}

export default App;
