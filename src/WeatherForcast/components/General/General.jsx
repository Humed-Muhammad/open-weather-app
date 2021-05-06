import React, { useState, useEffect } from "react";
import styles from "./General.module.css";
import { getWeatherData } from "../../API";
import { Icon } from "semantic-ui-react";
import { motion } from "framer-motion";

let parentVa = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 0.3,
      staggerChildren: 0.5,
    },
  },
};
let chil = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
};

const General = ({ lon, lat, units, name, sys }) => {
  let [time, setTime] = useState();
  let [temp, setTemp] = useState();
  let [icon, setIcon] = useState();
  let [feels, setFeels] = useState();
  let [desc, setDesc] = useState();
  let [rain, setRain] = useState();
  let [speed, setSpeed] = useState();
  let [pressure, setPressure] = useState();
  let [humidity, setHumidity] = useState();
  let [dp, setDp] = useState();
  let [visiblity, setVisiblity] = useState();
  useEffect(() => {
    let date = new Date();
    let fetchData = async () => {
      let data = await getWeatherData(lat, lon, units);
      try {
        setTemp(await data.current.temp);
        setFeels(await data.current.feels_like);
        setDesc(await data.current.weather[0].description);
        setSpeed(await data.current.wind_speed);
        setPressure(await data.current.pressure);
        setHumidity(await data.current.humidity);
        setDp(await data.current.dew_point);
        setVisiblity(await data.current.visibility);
        setIcon(await data.current.weather[0].icon);
        setRain(await data.current.rain["1h"]);
        console.log(await data.current);
      } catch (TypeError) {
        console.log("there is error");
      }
    };
    fetchData();
    setTime(new Date(date.getTime()).toDateString());
  }, [lon, lat, units]);

  return (
    <motion.div
      variants={parentVa}
      initial="hidden"
      animate="visible"
      className={styles.generalCont}
    >
      <div className={styles.leftCont}>
        <div className={styles.dateNameCont}>
          <motion.p variants={chil} className={styles.time}>
            {temp && <span>{time}</span>}
          </motion.p>
          <motion.h2 variants={chil} className={styles.name}>
            {name} {name && ","} <span className={styles.sys}>{sys}</span>{" "}
          </motion.h2>
        </div>
        <div className={styles.tempCont}>
          <motion.h2 variants={chil} className={styles.temp}>
            <img
              width="80px"
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt=""
            />
            {temp}
            {temp && (
              <span>
                <sup>o</sup>
                {units === "metric" ? "C" : "F"}
              </span>
            )}
          </motion.h2>
          {feels && (
            <motion.p variants={chil} className={styles.desc}>
              Feels Like {feels} <sup>o</sup>
              {units === "metric" ? "C" : "F"}. {desc}
            </motion.p>
          )}
          <div className={styles.additionalDesc}>
            <motion.p variants={chil} className={styles.cont}>
              <span>
                {rain && <Icon name="rain" />}
                {rain && rain}
                {rain && <span>mm</span>}
              </span>
              <span>
                {speed && <Icon name="arrow right" />}
                {speed}
                {speed && <span>{units === "metric" ? "m/s" : "mph"}</span>}
              </span>
              <span>
                {pressure && <Icon name="arrow circle up" />}
                {pressure}
                {pressure && <span>hPa</span>}
              </span>
            </motion.p>
            <motion.p variants={chil} className={styles.cont}>
              <span>
                {humidity && "Humidity: "}
                {humidity}
                {humidity && <span>%</span>}
              </span>
              <span>
                {dp && "Dew point: "}
                {dp}
                {dp && (
                  <span>
                    <sup>o</sup>
                    {units === "metric" ? "C" : "F"}
                  </span>
                )}
              </span>
            </motion.p>
            <motion.p variants={chil} className={styles.cont}>
              <span>
                {visiblity && "Visibility: "}
                {visiblity}
                {visiblity && <span>km</span>}
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default General;
