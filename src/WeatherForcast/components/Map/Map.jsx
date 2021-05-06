import React, { useState, useEffect } from "react";
import "./Map.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  CircleMarker,
  Popup,
} from "react-leaflet";
import { getWeatherData } from "../../API";
const Map = ({ lat, lon, units }) => {
  let [coords, setCoords] = useState([]);
  let [pop, setPop] = useState();
  let [icon, setIcon] = useState();
  let [temp, setTemp] = useState();
  useEffect(() => {
    setCoords([lat, lon]);
    let fetchPop = async () => {
      const data = await getWeatherData(lat, lon, units);
      setPop(await data.current.clouds);
      setIcon(await data.current.weather[0].icon);
      setTemp(await data.current.temp);
    };
    fetchPop();
  }, [lon, lat, units]);

  let CenterMap = () => {
    let map = useMap();
    map.flyTo(coords, 10);
    return null;
  };
  let grayOptions = { color: "gray" };
  return (
    <div className="map">
      <MapContainer
        className="leaflet-container"
        center={coords.lat ? coords : [lat, lon]}
        zoom={5}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker center={coords} pathOptions={grayOptions} radius={pop}>
          <Popup>
            Clouds: {pop}
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt=""
            />
            <span>
              Temprature: {temp}
              <sup>o</sup>
              {units === "metric" ? "C" : "F"}
            </span>
          </Popup>
        </CircleMarker>
        <CenterMap />
      </MapContainer>
    </div>
  );
};

export default Map;
