import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import data from "../../res_forecast.json";


export const getForecast = createAsyncThunk(
  "forecast/getData",
  async (locationKey, { rejectWithValue }) => {
    try {
      const url = process.env.REACT_APP_FORECAST;
      const apiKey = process.env.REACT_APP_APIKEY;
      const { data } = await axios.get(`${url}/${locationKey}?apikey=${apiKey}&metric=true`);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: "",
  isSuccess: false,
  message: "",
  loading: false,
};

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducer: { },
  extraReducers: {
      [getForecast.pending]: (state, { payload }) => {
          state.loading = true;
      },
      [getForecast.fulfilled]: (state, { payload }) => {
          state.loading = true;
          state.data = payload;
          state.isSuccess = true;
      },
      [getForecast.rejected]: (state, { payload }) => {
          state.message = payload;
          state.loading = false;
          state.isSuccess = false;
      },
  },
});

export default forecastSlice.reducer;
