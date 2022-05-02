import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useSearchParams } from 'react-router-dom';

import DayCard from '../HomePage/DayCard';
import FavToggleBtn from './FavToggleBtn';
import ErrModal from '../ErrModal';

import { useDispatch, useSelector } from 'react-redux';
import { getWeather } from '../../features/weather/weatherSlice';
import { getForecast } from '../../features/forecast/forecastSlice';

export default function HomePage() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const queries = Object.fromEntries([...searchParams]);
    const { weather } = useSelector((state) => state);
    const { forecast } = useSelector((state) => state);
    const [currentWeather, setCurrentWeather] = useState();
    const [forecastData, setForecastData] = useState();
    const [location, setLocation] = useState();
    const [isError, setIsError] = useState(false);

    const editForecastData = (forecastArr) => {
        const newArr = forecastArr.map((day) => {
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let date = new Date(day.Date);
            let dayName = days[date.getDay()]; 
            date = [date.getDate(), date.getMonth()].join('.');
            let max = day.Temperature.Maximum.Value;
            let min = day.Temperature.Minimum.Value;
            let iconNum = day.Day.Icon;
            return { date, dayName, max, min, iconNum }
        });
        return newArr;
    }

    useEffect(() => {
        console.log("queries:", queries);
        queries.locKey 
            ? setLocation(queries)
            : setLocation({ locKey: "215854", locName: "Tel-Aviv" });
    }, [])

    useEffect(() => {
        location && dispatch(getWeather(location.locKey));
        location && dispatch(getForecast(location.locKey));
    }, [location])
    
    useEffect(() => {
        // console.log("weather:",weather);
        weather && weather.data && 
            setCurrentWeather(weather.data[0]);
        weather.isSuccess ? setIsError(false) : setIsError(true);
    }, [weather])
    
    useEffect(() => {
        // console.log("forecast:", forecast);
        // console.log("forecast:", forecast.data);
        forecast && forecast.data && 
            setForecastData( editForecastData(forecast.data.DailyForecasts) );
    }, [forecast])

    return (
        <div className="HomePage">
            <h1>Home</h1>
            <Paper className='paper' elevation={10} sx={{ padding: '42px' }} >
                <header>
                    {location && <h2 className="city-name">{location.locName}</h2>}
                    <FavToggleBtn location={location}/>
                </header>
                <div className="current-weather-container">
                    <div className="details">
                        <h3>{"Now"}</h3>
                        <div className="temperature"> {currentWeather && currentWeather.Temperature.Metric.Value}˚</div> 
                        <h3 className='weather-text'>{currentWeather && currentWeather.WeatherText}</h3>
                    </div>
                    <div className="weather-logo">
                        {currentWeather && <img src={`https://www.accuweather.com/images/weathericons/${currentWeather.WeatherIcon}.svg`} alt="" />}
                    </div>
                </div>
                <div className="forecast-container">
                    {forecastData && forecastData.map((data, index) => (
                            <DayCard key={index} data={data}/> 
                    ))}
                </div>
            </Paper>
            {isError && <ErrModal />}
        </div>
    );
}