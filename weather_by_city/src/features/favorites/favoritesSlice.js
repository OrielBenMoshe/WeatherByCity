import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "weather",
    initialState: [
        { locationKey: 215854, name: "Tel Aviv" }
    ],
    reducer: {
        favoriteAdded(state, action) {
            state.push(action.payload)
        }
    },
  
});

export const selectAllFavorites = (state) => state.favorites;

export const { favoriteAdded } = favoritesSlice.actions;

export default favoritesSlice.reducer;

