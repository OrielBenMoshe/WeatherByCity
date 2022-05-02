import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import data from "../../res_weather.json";

export const getWeather = createAsyncThunk(
  "weather/getData",
  async (locationKey, { rejectWithValue }) => {
    try {
      console.log('getWeather');
      console.log("locationKey:", locationKey);
      const url = process.env.REACT_APP_WEATHER;
      const apiKey = process.env.REACT_APP_APIKEY;
      
      const { data } = await axios.get(`${url}/${locationKey}?apikey=${apiKey}&metric=true`);
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data);
      return error;
    }
  }
);

const initialState = {
  data: [],
  isSuccess: false,
  message: "",
  loading: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducer: {},
  extraReducers: {
      [getWeather.pending]: (state, { payload }) => {
          state.loading = true;
      },
      [getWeather.fulfilled]: (state, { payload }) => {
          state.loading = true;
          state.data = payload;
          state.isSuccess = true;
      },
      [getWeather.rejected]: (state, { payload }) => {
          state.message = payload;
          state.loading = false;
          state.isSuccess = false;
      },
  },
});

export default weatherSlice.reducer;
