import React, { useEffect, useState } from 'react';
import CityCard from './CityCard';

export default function FavoritesPage() {
  const [favoritesArr, setFavoritesArr] = useState();

  const removeCard = (locationKey) => {
    const prevFav = JSON.parse(localStorage.getItem("favoritesLocations"));
    const filteredArr = prevFav.filter((item) => (item.key != locationKey));
    localStorage.setItem("favoritesLocations", JSON.stringify(filteredArr));
    setFavoritesArr(filteredArr);
  }

  useEffect(() => {
    if (localStorage.getItem("favoritesLocations")) {
      const arr = JSON.parse(localStorage.getItem("favoritesLocations"));
      setFavoritesArr(arr);
    }
  }, [])


  return (
    <div className="FavoritesPage">
      <h1>Favorites</h1>
      <div className="cities-container">
        {
          favoritesArr && favoritesArr.map((location, index) => (
             <CityCard key={index} location={location} remove={removeCard} />
          ))
        }
      </div>
    </div>
  );
}