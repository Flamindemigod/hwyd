import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setMood, unsetMood } from "../features/moodData"
import { DataObjectOutlined } from '@mui/icons-material';

const Day = ({ date, firstDay }) => {
  const dispatch = useDispatch();
  const moods = useSelector((state) => state.mood.value);
  const [cellColor, setCellColor] = useState("bg-white");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  useEffect(() => {
    switch (moods.DateStorage[date.toDateString()]) {
      case "terrible":
        setCellColor("bg-purple-900 text-white");
        break;
      case "bad":
        setCellColor("bg-purple-500");
        break;
      case "ok":
        setCellColor("bg-neutral-300");
        break;
      case "good":
        setCellColor("bg-green-500");
        break;
      case "great":
        setCellColor("bg-green-900 text-white");
        break;
      default:
        setCellColor("bg-white");
    }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{gridColumn: firstDay}} className={`w-14 h-14 sm:w-20 sm:h-20 border-black border-solid border-2 flex justify-center items-center ${cellColor}`} onClick={handleClick}>
        {date.getDate()}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: { display: "flex" },
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(unsetMood(date));
            setCellColor("bg-white");
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-white'></div>
          <em>None</em>
        </MenuItem>
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(setMood({ date: date, mood: "terrible" }));
            setCellColor("bg-purple-900 text-white");
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-purple-900'></div>
          Terrible
        </MenuItem>
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(setMood({ date: date, mood: "bad" }));
            setCellColor("bg-purple-500");
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-purple-500'></div>
          Bad
        </MenuItem>
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(setMood({ date: date, mood: "ok" }));
            setCellColor("bg-neutral-300");
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-neutral-300'></div>
          Ok
        </MenuItem>
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(setMood({ date: date, mood: "good" }));
            setCellColor("bg-green-500");
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-green-500'></div>
          Good
        </MenuItem>
        <MenuItem
          sx={{ paddingInline: "0.5rem", display: "flex", flexDirection: "column", width: "5rem" }}
          onClick={() => {
            handleClose();
            dispatch(setMood({ date: date, mood: "great" }));
            setCellColor("bg-green-900 text-white");
          }}>
          <div className='rounded-full w-4 h-4 border-solid border-neutral-600 border-2 bg-green-900'></div>
          Great
        </MenuItem>
      </Menu>
    </>

  )
}

export default Day