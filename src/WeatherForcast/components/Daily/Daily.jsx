import React, { useState, useEffect } from "react";
import { getWeatherData } from "../../API";
import "./Daily.css";

const Daily = ({ lat, lon, units, name }) => {
  let [detail, setDetail] = useState(false);
  let [desc, setDesc] = useState([]);
  let [state, setState] = useState({ activeIndex: 10 });
  useEffect(() => {
    let fetchData = async () => {
      let data = await getWeatherData(lat, lon, units);
      setDesc(await data.daily);
    };
    fetchData();
  }, [lat, lon]);
  console.log(desc);

  return (
    <div className="daily">
      <h2>8 Day Forcasts</h2>
      {desc.map((item, id) => (
        <p key={id} className="acordion">
          <span>
            Day 0{new Date(item.dt).getDay() + id} {id === 0 ? "(Today)" : ""}
          </span>
          <img
            width="50px"
            key={id}
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt=""
          />
          <p className="desc">{item.weather[0].description}</p>
        </p>
      ))}
    </div>
  );
};

export default Daily;
