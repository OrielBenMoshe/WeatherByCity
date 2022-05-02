import { useEffect } from "react";
import { getWeather } from '../features/weather/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function useLocationWeather(locationKey) {
  const dispatch = useDispatch();
  const { weather } = useSelector((state) => state);
  
  useEffect(() => {
    dispatch(getWeather(locationKey));
  }, [])
    
  return weather;
  
};
