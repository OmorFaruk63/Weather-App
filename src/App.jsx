
import { useEffect, useState } from "react";
import "./App.css"
import axios from "axios";
const App = () => {

const [cityName, setCityName]=useState("dhaka")
  const apiKey= "10a6b6eeec762b3c82f70bfc4a14dc6b";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`

  const [weatherData, setWeatherData] = useState('');
  const [error, setError] = useState('');
  const [reload, setReload] = useState('');
  const [loading, setLoading] = useState(true);
  const [istrue, setIstrue] = useState(true);

  const handleSearch = () => {
    setReload(reload +1)
    };

    useEffect(() => {
      async function getData() {
        await axios.get(url)
        .then(res=> {
          setLoading(false)
          setWeatherData(res.data)})
        .catch(err=>{
          setLoading(false)
          setError(err)})
      }
          getData()
    }, [reload])

if (loading) {
  return <h1>Loading...</h1>
}

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="Search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

        {error.message ? <h1>{error.message}</h1>  :<div className="weather-info">
          <h2>{weatherData.name}, <strong>{weatherData?.sys?.country}</strong></h2>
          <p>Temperature: {weatherData?.main?.temp}°C</p>
          <p>Condition: {weatherData?.weather[0]?.description} </p>
        </div>}
          <button onClick={()=>setIstrue(!istrue)}>{istrue ?  "Show Details": " Close Details"}</button>
          {!istrue && <div className="details">
            <p>Humidity : {weatherData?.main?.humidity}</p>
            <p>Pressure : {weatherData?.main?.pressure}</p>
            <p>Pressure : {weatherData?.main?.temp_max}</p>
            <p>Temp : {weatherData?.main?.temp_min}</p>
            <p>Temp : {weatherData?.wind?.deg}</p>
            <p>Temp : {weatherData?.wind?.speed}</p>
          </div>}
    </div>
  );
};

export default App;
