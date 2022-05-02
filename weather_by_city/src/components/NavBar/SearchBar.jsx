import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAutocomplete } from "../../features/autocomplete/autocompleteSlice";

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const { autocomplete } = useSelector((state) => state);
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    // console.log("inputValue:", inputValue);
    if (inputValue.length === 3) {
      dispatch(getAutocomplete(inputValue));
    } 
  }, [inputValue]);
  
  useEffect(() => {
    console.log("autocomplete:", autocomplete);
    if (autocomplete.data) {
      const data = autocomplete.data;
      const editedData = data.map((item, key) => {
        return {
          label: item.LocalizedName,
          locKey: item.Key
        }
      });
      setList(editedData);
    }
  }, [autocomplete]);
  
  useEffect(() => {
    // console.log("list:", list);
  }, [list]);
  
  
  return (
    <Search className="SearchBar">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Autocomplete
        disablePortal
        // filterOptions={(x) => x}
        autoComplete={true}
        loading={true}
        id="combo-box-demo"
        onChange={(event, newValue) => {
          console.log("newValue:", newValue);
          setValue(newValue);
          navigate(`/Home?locKey=${newValue.locKey}&locName=${newValue.label}`, { replace: true })
          setValue("");
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={list}
        sx={{ width: 300 }}
        renderInput={
          (params) => <TextField {...params} label="LOCATION" className="search-field" />
        }
      />
    </Search>
  );
}
