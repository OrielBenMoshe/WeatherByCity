import { configureStore } from "@reduxjs/toolkit";
import autocompleteReducer from '../features/autocomplete/autocompleteSlice';
import weatherReducer from '../features/weather/weatherSlice';
import forecastReducer from "../features/forecast/forecastSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    forecast: forecastReducer,
    autocomplete: autocompleteReducer,
  },
});

export default store;
