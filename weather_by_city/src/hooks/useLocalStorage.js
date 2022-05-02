import { useEffect } from "react";
import { getWeather } from "../features/weather/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useLocalStorage(key, item, action) {
  /** Gets three arguments: key, item
   * and Action, that manipulates on local storage.
   */
  useEffect(() => {
      let arr = [];
      switch (action) {
        case "add":
          let arr = [];
          if (localStorage.getItem(key)) {
            const prevFav = JSON.parse(localStorage.getItem(key));
            arr = [...prevFav, item];
          }
          localStorage.setItem(key, JSON.stringify(arr));
          break;
    
        case "remove":
          if (localStorage.getItem("favoritesLocations")) {
            const favArr = JSON.parse(localStorage.getItem(key));
            const filteredArr = favArr.filter((favItem) => favItem.key != item);
            localStorage.setItem(key, JSON.stringify(filteredArr));
          }
          break;
      }
  }, [])
  
}
