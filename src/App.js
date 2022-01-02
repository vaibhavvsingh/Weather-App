import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import icon from "./img/icon4.png";

function App() {
  const initialState = {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [
      {
        id: 0,
        main: "-",
        description: "-",
        icon: "-",
      },
    ],
    base: "-",
    main: {
      temp: 273,
      pressure: 0,
      humidity: 0,
      temp_min: 0,
      temp_max: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
    },
    clouds: {
      all: 0,
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      message: 0,
      country: "-",
      sunrise: 0,
      sunset: 0,
    },
    id: 0,
    name: "-",
    cod: 0,
  };

  const [data, setData] = useState(initialState);
  const [input, setInput] = useState("Mumbai");

  const changeInput = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const handleSubmit = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=96982d7c797a69adbd36ac29484b1855`
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line
  }, []);

  return (
    // https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=96982d7c797a69adbd36ac29484b1855
    <div className="container">
      <div className="app">
        <div className="left item">
          <div>Temperature : {Math.round(data.main.temp - 273)} dec C</div>
          <div>Humidity : {data.main.humidity} %</div>
          <div>Pressure : {data.main.pressure} hPa</div>
          <div>Wind Speed : {data.wind.speed} m/s</div>
        </div>
        <div className="right item">
          <div className="icon">
            <img src={icon} alt="" />
          </div>
          <div>{data.name}</div>
          <div className="inputs">
            <input
              type="text"
              className="textbox"
              value={input}
              onChange={changeInput}
              onKeyDown={handleKeyDown}
            />
            <input
              type="button"
              value="Submit"
              className="btn"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
