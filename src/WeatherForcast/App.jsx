import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import General from "./components/General/General.jsx";
import { getGeolocation } from "./API";

import "./App.css";
import Map from "./components/Map/Map.jsx";
import Hourly from "./components/Hourly/Hourly.jsx";
import Daily from "./components/Daily/Daily.jsx";
import "leaflet/dist/leaflet.css";

const App = () => {
  let [lon, setLon] = useState("");
  let [lat, setLat] = useState("");
  let [name, setName] = useState("");
  let [sys, setSys] = useState("");
  let [cityName, setCityName] = useState("bati");
  let [units, setUnits] = useState("metric");

  useEffect(() => {
    let fetchData = async () => {
      let data = await getGeolocation(cityName);
      setLon(await data.coord.lon);
      setLat(await data.coord.lat);
      setName(await data.name);
      setSys(await data.sys.country);
    };
    fetchData();
  }, [cityName]);
  return (
    <div className="all-cont">
      <NavBar units={units} setUnits={setUnits} setCityName={setCityName} />
      <div className="top-cont">
        <General name={name} sys={sys} units={units} lat={lat} lon={lon} />
        <Map lat={lat} lon={lon} units={units} cityName={cityName} />
      </div>
      <div className="bottom-cont">
        <Hourly lat={lat} lon={lon} name={name} units={units} />
        <Daily lat={lat} lon={lon} name={name} units={units} />
      </div>
    </div>
  );
};

export default App;
