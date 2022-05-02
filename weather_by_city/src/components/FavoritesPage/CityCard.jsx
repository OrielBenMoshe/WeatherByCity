import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import useLocationWeather from '../../hooks/useLocationWeather';

export default function CityCard(props) {
  console.log("props.location:", props.location);
  const data = useLocationWeather(props.location.locKey);
  const [weather, setWeather] = useState()
  
  const removeCard = (e) => {
    props.remove(props.location.key)
  }

  useEffect(() => {
    if (data.data) {
      console.log("data:",data);
      setWeather(data.data[0])
    }
  }, [data])

  return (
    <Box sx={{ minWidth: 275 }} className="CityCard" >
      <Card elevation={1}>
        <CardContent>
          <a href="#" className="remove-btn" onClick={(e) => removeCard(e)} >
            <CloseRoundedIcon />
          </a>
          <header>
            <h3 className="city-name">{props.location.locName}</h3>
            <div className="weather-logo">
              {weather && <img src={`https://www.accuweather.com/images/weathericons/${weather.WeatherIcon}.svg`} alt="" />}
            </div>
          </header>
          <div className="temperature">
            <span className="max">{weather && weather.Temperature.Metric.Value}˚</span>
            {/* <span className="min">{" /16˚"}</span> */}
          </div>
        </CardContent>
        <CardActions disableSpacing={true}>
          <Link to={`/home/?locKey=${props.location.locKey}&locName=${props.location.locName}`}>
            <Button variant="contained">Check Out</Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
