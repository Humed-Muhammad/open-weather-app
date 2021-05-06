import React, { useState, useEffect } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import styles from "./NavBar.module.css";

const NavBar = ({ setCityName, setUnits, units }) => {
  let [city, setCity] = useState("bati");
  let btn = (
    <Button
      onClick={() => setCityName(city)}
      style={{ width: "20%" }}
      content="Search"
      secondary
    />
  );
  return (
    <div className={styles.nav}>
      <Input
        onChange={(e) => setCity(e.target.value)}
        className={styles.input}
        labelPosition="right"
        label={btn}
        placeholder="Search city"
      />
      <div className={styles.leftCont}>
        <svg
          data-v-2814ae29=""
          viewBox="0 0 1000 1000"
          enable-background="new 0 0 1000 1000"
          className={styles.icon}
        >
          <path
            fill="#48484a"
            d="M551.4,990.8c-1.4,0-2.8-0.1-4.3-0.3c-13.5-1.9-24.2-12.6-26.1-26.1L477,522.2L36.4,478.9c-13.6-1.9-24.2-12.5-26.1-26.1c-1.9-13.6,5.4-26.7,17.9-32.3L946.9,11.8c11.6-5.1,25.1-2.6,34.1,6.3c9,9,11.5,22.5,6.3,34.2l-408,920.3C574.4,983.8,563.4,990.8,551.4,990.8L551.4,990.8z M125.5,428.5l367.2,52.6c13.6,1.9,24.2,12.6,26.1,26.1l51.9,366.5L922.2,77L125.5,428.5z"
          />
        </svg>
        <Button.Group style={{ width: "60%" }}>
          <Button
            color={units === "metric" && "teal"}
            onClick={() => setUnits("metric")}
            size="small"
            className={styles.btn}
          >
            Metric: °C, m/s
          </Button>
          <Button
            color={units === "imperial" && "teal"}
            onClick={() => setUnits("imperial")}
            size="small"
            className={styles.btn}
          >
            Imperial: °F, mph
          </Button>
        </Button.Group>
      </div>
    </div>
  );
};

export default NavBar;
