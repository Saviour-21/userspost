import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import { getCall } from "../../Apicall";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [countryData, setCountryData] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(null);
  isPausedRef.current = isPaused;
  const navigate = useNavigate();

  const formateTime = () => {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes
        .toString()
        .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  }
  const getCountryData = async () => {
    try {
      const res = await getCall('https://worldtimeapi.org/api/timezone');
      setCountryData(res);
      setCountryTime(res[0]);
      return res;
    } catch (err) {
      console.error('Error fetching country data:', err);
    }
  };

  const setCountryTime = async (timezone) => {
    if(intervalId){
        clearInterval(intervalId);
        setIntervalId(null);
    }
    setIsPaused(false);
    setTime({hours: 0, minutes: 0, seconds: 0});
    try {
      const res = await getCall(`https://worldtimeapi.org/api/timezone/${timezone}`);
      const { datetime } = res;
      const [year, month, day, hour, minute, second] = datetime.split(/[-T:.+]/).map(Number);
      const newTime = { hours: hour, minutes: minute, seconds: second };
      setTime(newTime);
      startClock(newTime);
    } catch (err) {
      console.error('Error fetching country time:', err);
    }
  };

  const startClock = () => {
    const newIntervalId = setInterval(() => {
      setTime((prevTime) => {
        const { hours, minutes, seconds } = prevTime;
        let newSeconds = seconds + 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds === 60) {
          newSeconds = 0;
          newMinutes += 1;
        }
        if (newMinutes === 60) {
          newMinutes = 0;
          newHours += 1;
        }
        if (newHours === 24) {
          newHours = 0;
        }

        const newTime = { hours: newHours, minutes: newMinutes, seconds: newSeconds };
        return newTime;
      });
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const toggleStartPause = () => {
    setIsPaused((prev) => !prev);
    if (!isPausedRef.current) {
      if(intervalId){
        clearInterval(intervalId);
        setIntervalId(null);
      }
    } else {
      startClock(time);
    }
  };

  useEffect(() => {
    getCountryData();
  }, []);

  return (
    <div className={styles.navWrapper}>
      <button onClick={handleBack}>Back</button>
      <div className={styles.counterWrapper}>
        <select
          id="countryDropdown"
          onChange={(event) => setCountryTime(event.target.value)}
        >
          {countryData.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div id="clock">
          {formateTime()}
        </div>
        <button onClick={() => toggleStartPause()}>{!isPausedRef.current ? "Pause" : "Start"}</button>
      </div>
    </div>
  );
};

export default Navbar;
