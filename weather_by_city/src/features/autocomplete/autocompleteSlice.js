import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import data from "../../res_autocomplete.json";


export const getAutocomplete = createAsyncThunk(
  "autocomlete/getData",
  async (arg, { rejectWithValue }) => {
    try {
        console.log('getAutocomplete');
      const url = process.env.REACT_APP_AUTOCOMLETE;
      const apiKey = process.env.REACT_APP_APIKEY;
      const { data } = await axios.get(`${url}?apikey=${apiKey}&q=${arg}`);
      console.log("data:", data);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: [],
  isSuccess: false,
  message: "",
  loading: false,
};

const autocompleteSlice = createSlice({
  name: "autocomplete",
  initialState,
  reducer: {},
  extraReducers: {
      [getAutocomplete.pending]: (state, { payload }) => {
          state.loading = true;
      },
      [getAutocomplete.fulfilled]: (state, { payload }) => {
          state.loading = true;
          state.data = payload;
          state.isSuccess = true;
      },
      [getAutocomplete.rejected]: (state, { payload }) => {
          state.message = payload;
          state.loading = false;
          state.isSuccess = false;
      },
  },
});

export default autocompleteSlice.reducer;
