import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ToggleButton from '@mui/material/ToggleButton';

export default function FavToggleBtn(props) {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (localStorage.getItem("favoritesLocations") && props.location) {
      const favArr = JSON.parse(localStorage.getItem("favoritesLocations"));
      favArr.find((item) => (item.key == props.location.locKey))
      ? setSelected(true)
      : setSelected(false);
    } else setSelected(false);
  }, [])
  
  useEffect(() => {
    if (selected) {
      let arr = [];

      if (localStorage.getItem("favoritesLocations")) {
        const prevFav = JSON.parse(localStorage.getItem("favoritesLocations"));
        arr = [...prevFav, props.location];
      }
      localStorage.setItem("favoritesLocations", JSON.stringify(arr));

    } else if (localStorage.getItem("favoritesLocations") && props.location) {
      const prevFav = JSON.parse(localStorage.getItem("favoritesLocations"));
      const filteredArr = prevFav.filter((item) => (item.key !== props.location.logKey));
      localStorage.setItem("favoritesLocations", JSON.stringify(filteredArr));
    }
  }, [selected])

  return (
    <ToggleButton
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
