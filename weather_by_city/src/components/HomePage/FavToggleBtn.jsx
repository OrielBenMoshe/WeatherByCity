import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ToggleButton from '@mui/material/ToggleButton';

export default function FavToggleBtn(props) {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (localStorage.getItem("favoritesLocations") && props.location) {
      const favArr = JSON.parse(localStorage.getItem("favoritesLocations"));
      favArr.find((item) => (item.locKey == props.location.locKey))
      ? setSelected(true)
      : setSelected(false);
    } 
    // else setSelected(false);
  }, [props.location])
  
  useEffect(() => {
    console.log("selected:", selected);
    if (selected) {
      if (localStorage.getItem("favoritesLocations")) {
        const prevFav = JSON.parse(localStorage.getItem("favoritesLocations"));
        if ( !prevFav.find((item) => (item.locKey == props.location.locKey)) ) {
          localStorage.setItem("favoritesLocations", JSON.stringify([...prevFav, props.location]));
        }
      } else {
        localStorage.setItem("favoritesLocations", JSON.stringify([props.location]));
      }
    } else if (localStorage.getItem("favoritesLocations") && props.location) {
      console.log("else");
      const prevFav = JSON.parse(localStorage.getItem("favoritesLocations"));
      const filteredArr = prevFav.filter((item) => (item.locKey !== props.location.locKey));
      localStorage.setItem("favoritesLocations", JSON.stringify(filteredArr));
    }
  }, [selected])

  return (
    <ToggleButton
      id={props.location && props.location.locKey}
      value="check"
      size="small"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <FavoriteBorderIcon />
    </ToggleButton>
  );
}
