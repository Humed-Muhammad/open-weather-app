import React, { useEffect, useState } from "react";
import { getWeatherData } from "../../API";
import { Line } from "react-chartjs-2";
import "./Hourly.css";

const Hourly = ({ name, lat, lon, units }) => {
  let [desc, setDesc] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      let data = await getWeatherData(lat, lon, units);
      setDesc(await data.hourly);
    };
    fetchData();
  }, [name, units]);
  let LineChart = (
    <Line
      className="bar-chart"
      data={{
        labels: desc.map((item, id) => id),
        datasets: [
          {
            data: desc.map((item) => item.temp),
            label: "Temprature",
            backgroundColor: "rgba(253, 80, 0,0.2)",
            borderColor: "rgb(253, 80, 0)",
            fill: true,
          },
          {
            data: desc.map((item) => (item.rain ? item.rain["1h"] : 0.01)),
            label: "Rain",
            backgroundColor: "rgba(0, 152, 253, 0.479)",
            borderColor: "rgb(0, 152, 253)",
            fill: true,
          },
        ],
      }}
    />
  );

  return (
    <div className="hourly-cont">
      <h2>Hourly Forcast</h2>
      {LineChart}
    </div>
  );
};

export default Hourly;
