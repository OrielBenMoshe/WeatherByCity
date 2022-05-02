import { configureStore } from "@reduxjs/toolkit";
import autocompleteReducer from '../features/autocomplete/autocompleteSlice';
import weatherReducer from '../features/weather/weatherSlice';
import forecastReducer from "../features/forecast/forecastSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    forecast: forecastReducer,
    favorites: favoritesReducer,
    autocomplete: autocompleteReducer,
  },
});

export default store;
