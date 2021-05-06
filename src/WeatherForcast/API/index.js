import axios from "axios";

const { REACT_APP_API_KEY } = process.env;

export let getGeolocation = async (cityName) => {
  let primeryUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${REACT_APP_API_KEY}`;
  let {
    data: { coord, sys, name },
  } = await axios.get(primeryUrl1);
  return { coord, sys, name };
};

export let getWeatherData = async (lat, lon, units) => {
  let secondaryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${REACT_APP_API_KEY}`;

  let {
    data: { current, daily, hourly },
  } = await axios.get(secondaryUrl);
  return { current, daily, hourly };
};
