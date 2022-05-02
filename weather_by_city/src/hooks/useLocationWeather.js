import { useEffect } from "react";
import { getWeather } from '../features/weather/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function useLocationWeather(locationKey) {
  const dispatch = useDispatch();
  const { weather } = useSelector((state) => state);
  
  useEffect(() => {
    dispatch(getWeather(locationKey));
  }, [])
  
  useEffect(() => {
    weather.data[0] && console.log("useLocationWeather:",  weather.data[0].Temperature.Metric );
  }, [weather])
    
  return weather;
  
};
